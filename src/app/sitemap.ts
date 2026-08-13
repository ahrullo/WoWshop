import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { CATEGORIES } from "@/lib/categories";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://wowshop.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await prisma.product.findMany({
    select: { slug: true, createdAt: true },
  });

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    ...CATEGORIES.map((c) => ({
      url: `${baseUrl}/catalog/${c.slug}`,
      lastModified: new Date(),
      priority: 0.8,
    })),
    ...products.map((p) => ({
      url: `${baseUrl}/product/${p.slug}`,
      lastModified: p.createdAt,
      priority: 0.6,
    })),
  ];
}
