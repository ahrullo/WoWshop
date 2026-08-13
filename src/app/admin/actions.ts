"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { CATEGORIES } from "@/lib/categories";
import { isAdminAuthed, setAdminCookie, clearAdminCookie } from "@/lib/adminAuth";

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    throw new Error("Неверный пароль");
  }
  await setAdminCookie();
  redirect("/admin/products");
}

export async function logoutAction() {
  await clearAdminCookie();
  redirect("/admin");
}

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-zа-яё0-9\s-]/gi, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

export async function createProductAction(formData: FormData) {
  if (!(await isAdminAuthed())) throw new Error("Unauthorized");

  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const price = Number(formData.get("price"));
  const category = String(formData.get("category") ?? "");
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  const stock = Number(formData.get("stock") ?? 100);
  const featured = formData.get("featured") === "on";

  if (!name || !description || !price || !CATEGORIES.some((c) => c.slug === category) || !imageUrl) {
    throw new Error("Заполните все поля корректно");
  }

  await prisma.product.create({
    data: {
      name,
      slug: `${slugify(name)}-${Date.now().toString(36)}`,
      description,
      price,
      category,
      imageUrl,
      stock,
      featured,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath(`/catalog/${category}`);
}

export async function updateProductAction(formData: FormData) {
  if (!(await isAdminAuthed())) throw new Error("Unauthorized");

  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const price = Number(formData.get("price"));
  const category = String(formData.get("category") ?? "");
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  const stock = Number(formData.get("stock") ?? 100);
  const featured = formData.get("featured") === "on";

  if (!id || !name || !description || !price || !CATEGORIES.some((c) => c.slug === category) || !imageUrl) {
    throw new Error("Заполните все поля корректно");
  }

  await prisma.product.update({
    where: { id },
    data: { name, description, price, category, imageUrl, stock, featured },
  });

  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath(`/catalog/${category}`);
  redirect("/admin/products");
}

export async function deleteProductAction(formData: FormData) {
  if (!(await isAdminAuthed())) throw new Error("Unauthorized");

  const id = String(formData.get("id") ?? "");
  const product = await prisma.product.delete({ where: { id } });

  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath(`/catalog/${product.category}`);
}
