import Link from "next/link";
import { formatPrice } from "@/lib/categories";
import { AddToCartButton } from "./AddToCartButton";

export type ProductCardData = {
  id: string;
  slug: string;
  name: string;
  price: number;
  imageUrl: string;
};

export function ProductCard({ product }: { product: ProductCardData }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm transition hover:shadow-md">
      <Link href={`/product/${product.slug}`} className="block overflow-hidden bg-violet-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link href={`/product/${product.slug}`} className="font-medium leading-snug hover:text-violet-700">
          {product.name}
        </Link>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span className="text-lg font-bold text-violet-900">{formatPrice(product.price)}</span>
        </div>
        <AddToCartButton
          productId={product.id}
          slug={product.slug}
          name={product.name}
          price={product.price}
          imageUrl={product.imageUrl}
        />
      </div>
    </div>
  );
}
