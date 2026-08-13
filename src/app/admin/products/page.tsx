import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isAdminAuthed } from "@/lib/adminAuth";
import { CATEGORIES, formatPrice, getCategoryName } from "@/lib/categories";
import { createProductAction, deleteProductAction, logoutAction } from "../actions";

export default async function AdminProductsPage() {
  if (!(await isAdminAuthed())) {
    redirect("/admin");
  }

  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-violet-950">Товары ({products.length})</h1>
        <div className="flex gap-3 text-sm">
          <Link href="/admin/orders" className="font-medium text-violet-700 hover:underline">
            Заказы
          </Link>
          <form action={logoutAction}>
            <button className="font-medium text-zinc-500 hover:text-red-500">Выйти</button>
          </form>
        </div>
      </div>

      <details className="mt-6 rounded-xl border border-violet-100 p-4">
        <summary className="cursor-pointer font-semibold text-violet-900">Добавить товар</summary>
        <form action={createProductAction} className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm">
            Название
            <input name="name" required className="rounded-lg border border-violet-200 px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Цена (₽)
            <input
              name="price"
              type="number"
              min={1}
              required
              className="rounded-lg border border-violet-200 px-3 py-2"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm sm:col-span-2">
            Описание
            <textarea name="description" required rows={2} className="rounded-lg border border-violet-200 px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Категория
            <select name="category" required className="rounded-lg border border-violet-200 px-3 py-2">
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Остаток
            <input name="stock" type="number" defaultValue={100} className="rounded-lg border border-violet-200 px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm sm:col-span-2">
            URL картинки
            <input name="imageUrl" required className="rounded-lg border border-violet-200 px-3 py-2" />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input name="featured" type="checkbox" />
            Показывать в «Хитах продаж»
          </label>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-full bg-violet-600 px-6 py-2 font-semibold text-white hover:bg-violet-700"
            >
              Создать
            </button>
          </div>
        </form>
      </details>

      <div className="mt-8 flex flex-col gap-3">
        {products.map((p) => (
          <div key={p.id} className="flex items-center gap-4 rounded-xl border border-violet-100 p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.imageUrl} alt={p.name} className="h-14 w-14 rounded-lg object-cover" />
            <div className="flex-1">
              <p className="font-medium">{p.name}</p>
              <p className="text-sm text-zinc-500">
                {getCategoryName(p.category)} · {formatPrice(p.price)} · остаток {p.stock}
                {p.featured ? " · хит" : ""}
              </p>
            </div>
            <Link href={`/admin/products/${p.id}`} className="text-sm font-medium text-violet-700 hover:underline">
              Редактировать
            </Link>
            <form action={deleteProductAction}>
              <input type="hidden" name="id" value={p.id} />
              <button className="text-sm font-medium text-zinc-400 hover:text-red-500">Удалить</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
