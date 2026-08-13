import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isAdminAuthed } from "@/lib/adminAuth";
import { formatPrice } from "@/lib/categories";

export default async function AdminOrdersPage() {
  if (!(await isAdminAuthed())) {
    redirect("/admin");
  }

  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-violet-950">Заказы ({orders.length})</h1>
        <Link href="/admin/products" className="text-sm font-medium text-violet-700 hover:underline">
          К товарам
        </Link>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {orders.length === 0 && <p className="text-zinc-500">Заказов пока нет.</p>}
        {orders.map((order) => (
          <div key={order.id} className="rounded-xl border border-violet-100 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-mono text-xs text-zinc-400">{order.id}</p>
                <p className="font-medium">
                  {order.customerName} · {order.customerEmail} · {order.phone}
                </p>
                <p className="text-sm text-zinc-500">{order.address}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  order.status === "paid"
                    ? "bg-green-100 text-green-700"
                    : order.status === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-amber-100 text-amber-700"
                }`}
              >
                {order.status}
              </span>
            </div>
            <ul className="mt-3 flex flex-col gap-1 text-sm text-zinc-600">
              {order.items.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex justify-between border-t border-violet-100 pt-2 text-sm font-bold text-violet-950">
              <span>Итого</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
