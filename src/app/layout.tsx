import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteConfig } from "@/lib/config";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Revalidate all pages every hour (ISR)
export const revalidate = 3600;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "МАСТЕРТРАФ – Ремонт и изработка на трансформатори и заваръчна техника | София",
    template: "%s | МАСТЕРТРАФ",
  },
  description:
    "Ремонт на трансформатори и заваръчна техника в София. Проектиране и изработка по поръчка на спотери, телоподаващи устройства, стартерно-зарядни устройства. 24 месеца гаранция.",
  keywords: [
    "заваръчна техника",
    "спотер",
    "трансформатор",
    "ремонт на заваръчни апарати",
    "телоподаващо устройство",
    "стартерно-зарядно устройство",
    "електрожен",
    "София",
    "България",
    "МАСТЕРТРАФ",
  ],
  authors: [{ name: "МАСТЕРТРАФ ЕООД" }],
  creator: "МАСТЕРТРАФ",
  icons: {
    icon: [
      { url: "/logo.ico", sizes: "any" },
      { url: "/fav-icon.ico", type: "image/png", sizes: "192x192" },
      { url: "/fav-icon.ico", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/logo.ico",
    apple: "/fav-icon.ico",
  },
  openGraph: {
    type: "website",
    locale: "bg_BG",
    url: siteConfig.url,
    siteName: "МАСТЕРТРАФ",
    title: "МАСТЕРТРАФ – Ремонт и изработка на трансформатори и заваръчна техника",
    description:
      "Ремонт на трансформатори и заваръчна техника в София. Проектиране и изработка по поръчка. 24 месеца гаранция.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "МАСТЕРТРАФ – Заваръчна техника",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "МАСТЕРТРАФ – Заваръчна техника",
    description: "Ремонт и изработка по поръчка на трансформатори и заваръчна техника в София.",
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "bg-BG": siteConfig.url,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex min-h-screen flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
