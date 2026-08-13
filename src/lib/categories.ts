export const CATEGORIES = [
  { slug: "lamps", name: "Светильники", emoji: "💡" },
  { slug: "toys", name: "Игрушки", emoji: "🧸" },
  { slug: "stationery", name: "Канцтовары", emoji: "✏️" },
  { slug: "anime", name: "Аниме-товары", emoji: "🎌" },
  { slug: "gadgets", name: "Необычная техника", emoji: "🛸" },
  { slug: "phone-accessories", name: "Аксессуары для телефонов", emoji: "📱" },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export function getCategoryName(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(price);
}
