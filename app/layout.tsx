import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "家電配送安裝費試算",
  description: "家電配送安裝費用試算工具，快速計算運費、樓層費與冷氣/壁掛施工加項費用。",
  metadataBase: new URL("https://wgapp.pages.dev"),
  openGraph: {
    title: "家電配送安裝費試算",
    description: "家電配送安裝費用試算工具，快速計算運費、樓層費與冷氣/壁掛施工加項費用。",
    images: [{ url: "/og-v4.png", width: 1200, height: 630 }],
    locale: "zh_TW",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "家電配送安裝費試算",
    description: "家電配送安裝費用試算工具，快速計算運費、樓層費與冷氣/壁掛施工加項費用。",
    images: ["/og-v4.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
