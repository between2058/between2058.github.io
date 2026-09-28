import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono, LXGW_WenKai_TC, Noto_Sans_TC, Shippori_Mincho_B1 } from "next/font/google";
import { dictionaries, isLocale, locales } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import "../globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const notoSans = Noto_Sans_TC({
  weight: ["400", "500"],
  variable: "--font-noto-sans-tc",
  display: "swap",
  preload: false,
});
const wenkai = LXGW_WenKai_TC({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-lxgw",
  display: "swap",
  preload: false,
});
const mincho = Shippori_Mincho_B1({
  weight: ["500", "700", "800"],
  subsets: ["latin"],
  variable: "--font-shippori",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://between2058.vercel.app";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export const viewport: Viewport = {
  themeColor: "#0b1624",
  colorScheme: "dark",
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = dictionaries[lang];
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t.meta.title, template: `%s · ${t.meta.title}` },
    description: t.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { "zh-TW": "/zh", en: "/en" },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `/${lang}`,
      siteName: "between2058",
      locale: lang === "zh" ? "zh_TW" : "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = dictionaries[lang];

  return (
    <html
      lang={lang === "zh" ? "zh-Hant-TW" : "en"}
      className={`${geist.variable} ${geistMono.variable} ${notoSans.variable} ${wenkai.variable} ${mincho.variable}`}
      suppressHydrationWarning
    >
      <body className="relative min-h-dvh overflow-x-hidden">
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-ink-2 focus:px-4 focus:py-2 focus:text-foam"
        >
          {lang === "zh" ? "跳到主要內容" : "Skip to content"}
        </a>
        <Header lang={lang} t={t} />
        <main id="main" className="relative z-10">
          {children}
        </main>
        <Footer t={t} />
        <Reveal />
      </body>
    </html>
  );
}
