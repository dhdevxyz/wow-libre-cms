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
