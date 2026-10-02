import type { Metadata } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import RunAssistant from "@/components/RunAssistant";
import "./globals.css";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Squad9 - Run. Move. Rave.",
  description: "A running community built around a good sweat and a better afterparty.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body">
        {children}
        <RunAssistant />
      </body>
    </html>
  );
}