import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "配送安裝費試算｜易鑫實業行 2026",
  description: "同一地址混搭多種家電，快速合計配送、跨區、樓層與冷氣安裝費用。",
  metadataBase: new URL("https://wgapp.pages.dev"),
  openGraph: {
    title: "同址混搭，一次合計｜配送安裝費試算",
    description: "同一地址混搭多種家電，快速合計配送、跨區、樓層與冷氣安裝費用。",
    images: [{ url: "/og-v3.png", width: 1200, height: 630 }],
    locale: "zh_TW",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "同址混搭，一次合計｜配送安裝費試算",
    description: "同一地址混搭多種家電，快速合計配送、跨區、樓層與冷氣安裝費用。",
    images: ["/og-v3.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
