"use client";

import { useState } from "react";
import { useCart } from "./CartContext";

type Props = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  imageUrl: string;
};

export function AddToCartButton({ productId, slug, name, price, imageUrl }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem({ productId, slug, name, price, imageUrl });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <button
      onClick={handleClick}
      className="w-full rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700 active:scale-95"
    >
      {added ? "Добавлено ✓" : "В корзину"}
    </button>
  );
}
