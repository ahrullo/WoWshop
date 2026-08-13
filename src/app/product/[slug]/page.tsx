import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { formatPrice, getCategoryName } from "@/lib/categories";
import { AddToCartButton } from "@/components/AddToCartButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.imageUrl],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });

  if (!product) {
    notFound();
  }

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.imageUrl,
    offers: {
      "@type": "Offer",
      priceCurrency: "RUB",
      price: product.price,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <nav className="mb-6 text-sm text-zinc-500">
        <Link href="/" className="hover:text-violet-700">
          Главная
        </Link>{" "}
        /{" "}
        <Link href={`/catalog/${product.category}`} className="hover:text-violet-700">
          {getCategoryName(product.category)}
        </Link>
      </nav>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-violet-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.imageUrl} alt={product.name} className="aspect-square w-full object-cover" />
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-violet-950">{product.name}</h1>
          <p className="mt-4 text-lg font-bold text-violet-900">{formatPrice(product.price)}</p>
          <p className="mt-4 leading-relaxed text-zinc-600">{product.description}</p>

          <div className="mt-8 max-w-xs">
            <AddToCartButton
              productId={product.id}
              slug={product.slug}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
