import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CATEGORIES } from "@/lib/categories";
import { ProductCard } from "@/components/ProductCard";

export default async function Home() {
  const featured = await prisma.product.findMany({
    where: { featured: true },
    take: 8,
  });

  return (
    <div>
      <section className="bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:py-24">
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            Необычные штуки, которые хочется купить
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-violet-100">
            Светильники, игрушки, канцтовары, аниме-мерч, гаджеты и аксессуары для телефона — всё,
            что делает жизнь чуточку веселее.
          </p>
          <Link
            href="#categories"
            className="mt-8 inline-block rounded-full bg-white px-6 py-3 font-semibold text-violet-700 transition hover:bg-violet-50"
          >
            Смотреть каталог
          </Link>
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-violet-950">Категории</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/catalog/${c.slug}`}
              className="flex flex-col items-center gap-2 rounded-2xl border border-violet-100 bg-violet-50/60 p-5 text-center transition hover:border-violet-300 hover:bg-violet-100"
            >
              <span className="text-3xl" aria-hidden>
                {c.emoji}
              </span>
              <span className="text-sm font-medium text-violet-900">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <h2 className="text-2xl font-bold text-violet-950">Хиты продаж</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
