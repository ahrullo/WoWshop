import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/categories";
import { ClearCartOnMount } from "@/components/ClearCartOnMount";

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string; demo?: string }>;
}) {
  const { orderId, demo } = await searchParams;
  const order = orderId
    ? await prisma.order.findUnique({ where: { id: orderId }, include: { items: true } })
    : null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <ClearCartOnMount />
      <div className="text-5xl">🎉</div>
      <h1 className="mt-4 text-3xl font-bold text-violet-950">Заказ оформлен!</h1>

      {demo === "1" && (
        <p className="mx-auto mt-4 max-w-md rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Демо-режим: онлайн-оплата не подключена (нет ключей Stripe в <code>.env</code>), поэтому заказ
          сразу отмечен как оформленный без реальной оплаты.
        </p>
      )}

      {order && (
        <div className="mt-8 rounded-xl border border-violet-100 p-6 text-left">
          <p className="text-sm text-zinc-500">Номер заказа</p>
          <p className="font-mono text-sm text-violet-900">{order.id}</p>
          <ul className="mt-4 flex flex-col gap-1 text-sm text-zinc-600">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex justify-between border-t border-violet-100 pt-3 font-bold text-violet-950">
            <span>Итого</span>
            <span>{formatPrice(order.total)}</span>
          </div>
          <p className="mt-4 text-sm text-zinc-500">
            Статус: <span className="font-medium text-violet-900">{order.status}</span>
          </p>
        </div>
      )}

      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700"
      >
        Вернуться в каталог
      </Link>
    </div>
  );
}
