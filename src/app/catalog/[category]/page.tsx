import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CATEGORIES, getCategoryName } from "@/lib/categories";
import { ProductCard } from "@/components/ProductCard";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!CATEGORIES.some((c) => c.slug === category)) return {};
  const name = getCategoryName(category);

  return {
    title: name,
    description: `${name} в WoWshop — необычные и приятные мелочи с доставкой.`,
    alternates: { canonical: `/catalog/${category}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  if (!CATEGORIES.some((c) => c.slug === category)) {
    notFound();
  }

  const products = await prisma.product.findMany({
    where: { category },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-violet-950">{getCategoryName(category)}</h1>
      <p className="mt-1 text-zinc-500">{products.length} товаров</p>

      {products.length === 0 ? (
        <p className="mt-10 text-zinc-500">В этой категории пока нет товаров.</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
