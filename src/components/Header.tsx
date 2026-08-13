"use client";

import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { useCart } from "./CartContext";

export function Header() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-violet-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-2xl font-black tracking-tight">
          <span className="bg-gradient-to-br from-violet-600 to-pink-500 bg-clip-text text-transparent">
            WoWshop
          </span>
          <span aria-hidden>✨</span>
        </Link>

        <Link
          href="/cart"
          className="relative flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
        >
          🛒 Корзина
          {count > 0 && (
            <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-pink-500 text-xs font-bold text-white">
              {count}
            </span>
          )}
        </Link>
      </div>

      <nav className="mx-auto max-w-6xl overflow-x-auto px-4 pb-3">
        <ul className="flex gap-2 whitespace-nowrap text-sm font-medium">
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/catalog/${c.slug}`}
                className="flex items-center gap-1 rounded-full border border-violet-200 px-3 py-1.5 text-violet-900 transition hover:border-violet-400 hover:bg-violet-50"
              >
                <span aria-hidden>{c.emoji}</span>
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
