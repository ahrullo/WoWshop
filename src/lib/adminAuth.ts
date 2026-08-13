import { createHash } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "wowshop_admin";

function expectedToken(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return createHash("sha256").update(password).digest("hex");
}

export async function isAdminAuthed(): Promise<boolean> {
  const expected = expectedToken();
  if (!expected) return false;
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value === expected;
}

export async function setAdminCookie() {
  const expected = expectedToken();
  if (!expected) throw new Error("ADMIN_PASSWORD is not set");
  const store = await cookies();
  store.set(COOKIE_NAME, expected, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminCookie() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
