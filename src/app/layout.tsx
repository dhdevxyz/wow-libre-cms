import ClientFooter from "@/components/controllers/footerVisibility";
import I18Next from "@/context/I8nProviders";
import UserProvider from "@/context/UserContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";
import "./normalize.css";
import { webProps } from "@/constants/configs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: webProps.serverName,
  description:
    "Administrative web platform with advanced tools to optimize management and enhance your community's experience.",
  openGraph: {
    title: webProps.serverName,
    description:
      "Administrative web platform with advanced tools to optimize management and enhance your community's experience.",
    images: [
      {
        url: "https://static.wixstatic.com/media/5dd8a0_cc65edad0cce497c924b91d4d298ac33~mv2.png",
        width: 1200,
        height: 630,
        alt: "WowLibre Plataform",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: webProps.serverName,
    description:
      "Administrative web platform with advanced tools to optimize management and enhance your community's experience.",
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
