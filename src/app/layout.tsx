import type { Metadata } from "next";

import { Poppins } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";

import { ptBR } from "@clerk/localizations";

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Travelers",
  description: "Travelers Web Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="en">
        <body className={font.className}>
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
