import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "配送安裝費試算｜易鑫實業行 2026",
  description: "五甲店家電配送、跨區與冷氣安裝費用快速試算及完整價目查詢。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
