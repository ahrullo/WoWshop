import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isAdminAuthed } from "@/lib/adminAuth";
import { CATEGORIES } from "@/lib/categories";
import { updateProductAction } from "../../actions";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAdminAuthed())) {
    redirect("/admin");
  }

  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold text-violet-950">Редактировать товар</h1>

      <form action={updateProductAction} className="mt-6 grid gap-3 sm:grid-cols-2">
        <input type="hidden" name="id" value={product.id} />

        <label className="flex flex-col gap-1 text-sm sm:col-span-2">
          Название
          <input
            name="name"
            defaultValue={product.name}
            required
            className="rounded-lg border border-violet-200 px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Цена (₽)
          <input
            name="price"
            type="number"
            min={1}
            defaultValue={product.price}
            required
            className="rounded-lg border border-violet-200 px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Остаток
          <input
            name="stock"
            type="number"
            defaultValue={product.stock}
            className="rounded-lg border border-violet-200 px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm sm:col-span-2">
          Описание
          <textarea
            name="description"
            defaultValue={product.description}
            required
            rows={3}
            className="rounded-lg border border-violet-200 px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Категория
          <select
            name="category"
            defaultValue={product.category}
            required
            className="rounded-lg border border-violet-200 px-3 py-2"
          >
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input name="featured" type="checkbox" defaultChecked={product.featured} />
          Показывать в «Хитах продаж»
        </label>
        <label className="flex flex-col gap-1 text-sm sm:col-span-2">
          URL картинки
          <input
            name="imageUrl"
            defaultValue={product.imageUrl}
            required
            className="rounded-lg border border-violet-200 px-3 py-2"
          />
        </label>

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="rounded-full bg-violet-600 px-6 py-2 font-semibold text-white hover:bg-violet-700"
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
}
