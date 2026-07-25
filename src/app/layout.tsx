import type { Metadata } from "next";
import { Fraunces, Inter, Lora } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-ui",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lyrics",
});

export const metadata: Metadata = {
  title: "Hinário",
  description: "Hinário digital da igreja",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${fraunces.variable} ${inter.variable} ${lora.variable} font-ui bg-paper text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
