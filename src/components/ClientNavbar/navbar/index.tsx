"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar/navbar";

const ClientNavbar = () => {
  const pathname = usePathname();
  const pathsWithoutNavbar = ["/login", "/register"];

  const isPathExcluded =
    pathsWithoutNavbar.includes(pathname) ||
    pathsWithoutNavbar.some((path) => pathname.startsWith(path));

  return !isPathExcluded ? <Navbar /> : null;
};

export default ClientNavbar;
