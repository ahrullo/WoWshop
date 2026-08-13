"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import type { CartItem } from "@/components/CartContext";

export async function createOrderAction(formData: FormData) {
  const customerName = String(formData.get("customerName") ?? "").trim();
  const customerEmail = String(formData.get("customerEmail") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const cartJson = String(formData.get("cartJson") ?? "[]");

  let items: CartItem[] = [];
  try {
    items = JSON.parse(cartJson);
  } catch {
    items = [];
  }

  if (!customerName || !customerEmail || !address || !phone || items.length === 0) {
    throw new Error("Заполните все поля — корзина не должна быть пустой.");
  }

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const order = await prisma.order.create({
    data: {
      customerName,
      customerEmail,
      address,
      phone,
      total,
      items: {
        create: items.map((i) => ({
          productId: i.productId,
          name: i.name,
          price: i.price,
          quantity: i.qty,
        })),
      },
    },
  });

  const stripe = getStripe();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  if (stripe) {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: items.map((i) => ({
        price_data: {
          currency: "rub",
          product_data: { name: i.name },
          unit_amount: i.price * 100,
        },
        quantity: i.qty,
      })),
      customer_email: customerEmail,
      success_url: `${baseUrl}/order/success?orderId=${order.id}`,
      cancel_url: `${baseUrl}/order/cancel?orderId=${order.id}`,
      metadata: { orderId: order.id },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    redirect(session.url!);
  }

  redirect(`/order/success?orderId=${order.id}&demo=1`);
}
