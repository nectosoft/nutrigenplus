import type { Metadata } from "next";
import { Playfair_Display, Inter_Tight } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
});

const inter = Inter_Tight({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "NutriGen+ | Science meets Luxury Collagen",
  description: "Experience the pinnacle of wellness with NutriGen+ Pure Gold Collagen. Science-backed, luxury-infused health supplements.",
};

import { TranslationProvider } from "@/context/translation-context";
import { CartProvider } from "@/context/cart-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-white text-charcoal`}
      >
        <TranslationProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
