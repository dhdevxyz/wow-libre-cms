import ClientFooter from "@/components/controllers/footerVisibility";
import { webProps } from "@/constants/configs";
import I18Next from "@/context/I8nProviders";
import UserProvider from "@/context/UserContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";
import "./normalize.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: webProps.serverName,
  description:
    "EntropiuX is the first private server for The War Within — get ahead of the game and explore Azeroth like never before.",
  openGraph: {
    title: webProps.serverName,
    description:
      "EntropiuX is the first private server for The War Within — get ahead of the game and explore Azeroth like never before.",
    images: [
      {
        url: "https://static.wixstatic.com/media/5dd8a0_b4a3d979f15148ad8819296bc2781816~mv2.jpg",
        width: 1200,
        height: 630,
        alt: "EntropiuX Plataform",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: webProps.serverName,
    description:
      "EntropiuX is the first private server for The War Within — get ahead of the game and explore Azeroth like never before.",
    creator: "@entropiux",
    images: [
      "https://static.wixstatic.com/media/5dd8a0_b4a3d979f15148ad8819296bc2781816~mv2.jpg",
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
