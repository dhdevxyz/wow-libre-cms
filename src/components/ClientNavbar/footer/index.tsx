"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/footer";

const ClientFooter = () => {
  const pathname = usePathname();
  const pathsWithoutNavbar = ["/login"];

  return !pathsWithoutNavbar.includes(pathname) ? <Footer /> : null;
};

export default ClientFooter;
