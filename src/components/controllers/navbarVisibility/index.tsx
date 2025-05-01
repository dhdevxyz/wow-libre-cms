"use client";

import Navbar from "@/components/home/navbar-home/navbar";
import { usePathname } from "next/navigation";

const ClientNavbar = () => {
  const pathname = usePathname();
  const pathsWithoutNavbar = ["/login", "/register", "/congrats", "/account"];

  const isPathExcluded =
    pathsWithoutNavbar.includes(pathname) ||
    pathsWithoutNavbar.some((path) => pathname.startsWith(path));

  return !isPathExcluded ? <Navbar /> : null;
};

export default ClientNavbar;
