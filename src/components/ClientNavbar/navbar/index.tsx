"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar/navbar";

const ClientNavbar = () => {
  const pathname = usePathname();
  const pathsWithoutNavbar = ["/login"];

  return !pathsWithoutNavbar.includes(pathname) ? <Navbar /> : null;
};

export default ClientNavbar;
