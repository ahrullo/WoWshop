"use client";

import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { formatPrice } from "@/lib/categories";

export default function CartPage() {
  const { items, setQty, removeItem, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-violet-950">Корзина пуста</h1>
        <p className="mt-2 text-zinc-500">Загляните в каталог и найдите что-нибудь необычное.</p>
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
      <h1 className="text-2xl font-bold text-violet-950">Корзина</h1>

      <ul className="mt-6 flex flex-col gap-4">
        {items.map((item) => (
          <li
            key={item.productId}
            className="flex items-center gap-4 rounded-xl border border-violet-100 p-3"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.imageUrl}
              alt={item.name}
              className="h-20 w-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <Link href={`/product/${item.slug}`} className="font-medium hover:text-violet-700">
                {item.name}
              </Link>
              <p className="text-sm text-zinc-500">{formatPrice(item.price)}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setQty(item.productId, item.qty - 1)}
                className="h-8 w-8 rounded-full border border-violet-200 text-violet-700 hover:bg-violet-50"
                aria-label="Уменьшить количество"
              >
                −
              </button>
              <span className="w-6 text-center">{item.qty}</span>
              <button
                onClick={() => setQty(item.productId, item.qty + 1)}
                className="h-8 w-8 rounded-full border border-violet-200 text-violet-700 hover:bg-violet-50"
                aria-label="Увеличить количество"
              >
                +
              </button>
            </div>

            <p className="w-24 text-right font-semibold text-violet-900">
              {formatPrice(item.price * item.qty)}
            </p>

            <button
              onClick={() => removeItem(item.productId)}
              className="text-zinc-400 hover:text-red-500"
              aria-label="Удалить"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-between border-t border-violet-100 pt-6">
        <span className="text-lg font-bold text-violet-950">Итого: {formatPrice(total)}</span>
        <Link
          href="/checkout"
          className="rounded-full bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700"
        >
          Оформить заказ
        </Link>
      </div>
    </div>
  );
}
