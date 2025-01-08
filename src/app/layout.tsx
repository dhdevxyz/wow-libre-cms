import ClientFooter from "@/components/client_navbar/footer";
import I18Next from "@/context/I8nProviders";
import UserProvider from "@/context/UserContext";
import WowheadTooltip from "@/utils/wowhead";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";
import "./normalize.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wow Libre",
  description: "Plataform Web",
  openGraph: {
    title: "Wow Libre",
    description: "Plataform Web",
    images: [
      {
        url: "https://static.wixstatic.com/media/5dd8a0_cc65edad0cce497c924b91d4d298ac33~mv2.png",
        width: 1200,
        height: 630,
        alt: "Wow Libre Platform Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wow Libre",
    description: "Plataform Web",
    images: [
      "https://static.wixstatic.com/media/5dd8a0_cc65edad0cce497c924b91d4d298ac33~mv2.png",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-midnight">
      <UserProvider>
        <I18Next>
          <body className={inter.className}>
            <WowheadTooltip />
            {children}
            <ClientFooter />
            <Analytics />
            <SpeedInsights />
          </body>
        </I18Next>
      </UserProvider>
    </html>
  );
}
