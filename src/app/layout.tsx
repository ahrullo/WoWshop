import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://wowshop.vercel.app";
const siteTitle = "WoWshop — необычные товары";
const siteDescription =
  "Светильники, игрушки, канцтовары, аниме-мерч, необычная техника и аксессуары для телефонов.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: { default: siteTitle, template: "%s — WoWshop" },
  description: siteDescription,
  keywords: [
    "wowshop",
    "необычные товары",
    "подарки",
    "светильники",
    "аниме мерч",
    "гаджеты",
    "интернет-магазин",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: baseUrl,
    siteName: "WoWshop",
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
  alternates: { canonical: "/" },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "OnlineStore",
  name: "WoWshop",
  url: baseUrl,
  description: siteDescription,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-zinc-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
