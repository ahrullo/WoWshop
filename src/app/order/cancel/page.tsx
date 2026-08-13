import Link from "next/link";

export default function OrderCancelPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <div className="text-5xl">😕</div>
      <h1 className="mt-4 text-3xl font-bold text-violet-950">Оплата отменена</h1>
      <p className="mt-2 text-zinc-500">
        Вы отменили оплату. Товары остались в вашей корзине — можно попробовать снова.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          href="/cart"
          className="rounded-full bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700"
        >
          Вернуться в корзину
        </Link>
        <Link
          href="/"
          className="rounded-full border border-violet-200 px-6 py-3 font-semibold text-violet-700 hover:bg-violet-50"
        >
          В каталог
        </Link>
      </div>
    </div>
  );
}
