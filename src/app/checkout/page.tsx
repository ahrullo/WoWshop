"use client";

import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { formatPrice } from "@/lib/categories";
import { createOrderAction } from "./actions";

export default function CheckoutPage() {
  const { items, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-violet-950">Корзина пуста</h1>
        <p className="mt-2 text-zinc-500">Добавьте товары перед оформлением заказа.</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700"
        >
          В каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-violet-950">Оформление заказа</h1>

      <div className="mt-6 rounded-xl border border-violet-100 p-4">
        <h2 className="font-semibold text-violet-900">Ваш заказ</h2>
        <ul className="mt-3 flex flex-col gap-1 text-sm text-zinc-600">
          {items.map((item) => (
            <li key={item.productId} className="flex justify-between">
              <span>
                {item.name} × {item.qty}
              </span>
              <span>{formatPrice(item.price * item.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between border-t border-violet-100 pt-3 font-bold text-violet-950">
          <span>Итого</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      <form action={createOrderAction} className="mt-8 flex flex-col gap-4">
        <input type="hidden" name="cartJson" value={JSON.stringify(items)} />

        <label className="flex flex-col gap-1 text-sm font-medium text-zinc-700">
          Имя и фамилия
          <input
            type="text"
            name="customerName"
            required
            className="rounded-lg border border-violet-200 px-3 py-2 outline-none focus:border-violet-500"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-zinc-700">
          Email
          <input
            type="email"
            name="customerEmail"
            required
            className="rounded-lg border border-violet-200 px-3 py-2 outline-none focus:border-violet-500"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-zinc-700">
          Телефон
          <input
            type="tel"
            name="phone"
            required
            className="rounded-lg border border-violet-200 px-3 py-2 outline-none focus:border-violet-500"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-zinc-700">
          Адрес доставки
          <textarea
            name="address"
            required
            rows={3}
            className="rounded-lg border border-violet-200 px-3 py-2 outline-none focus:border-violet-500"
          />
        </label>

        <button
          type="submit"
          className="mt-2 rounded-full bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700"
        >
          Перейти к оплате
        </button>
      </form>
    </div>
  );
}
