import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/adminAuth";
import { loginAction } from "./actions";

export default async function AdminLoginPage() {
  if (await isAdminAuthed()) {
    redirect("/admin/products");
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-20">
      <h1 className="text-2xl font-bold text-violet-950">Вход в админку</h1>
      <form action={loginAction} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm font-medium text-zinc-700">
          Пароль
          <input
            type="password"
            name="password"
            required
            className="rounded-lg border border-violet-200 px-3 py-2 outline-none focus:border-violet-500"
          />
        </label>
        <button
          type="submit"
          className="rounded-full bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700"
        >
          Войти
        </button>
      </form>
    </div>
  );
}
