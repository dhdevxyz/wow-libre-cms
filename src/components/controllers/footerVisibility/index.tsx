"use client";

import Footer from "@/components/footer";
import { usePathname } from "next/navigation";

const ClientFooter = () => {
  const pathname = usePathname();
  const pathsWithoutNavbar = [
    "/login",
    "/register",
    "/congrats",
    "/servers/dashboard",
  ];

  const isPathExcluded =
    pathsWithoutNavbar.includes(pathname) ||
    pathsWithoutNavbar.some((path) => pathname.startsWith(path));

  return !isPathExcluded ? <Footer /> : null;
};

export default ClientFooter;
