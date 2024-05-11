import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./normalize.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wow Libre",
  description: "Servidor de World Of Warcraft",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="bg-midnight">
      <body className={inter.className}>
        <div className="contenedor">
          <Navbar />
        </div>
        {children}
        <div className="contenedor">
          <Footer />
        </div>
      </body>
    </html>
  );
}
