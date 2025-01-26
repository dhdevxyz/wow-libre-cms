"use client";

import NavbarAuthenticated from "@/components/navbar-authenticated";
import VdpBody from "@/components/vdp/body";
import VdpNavbar from "@/components/vdp/header";
import React from "react";

const Vdp = () => {
  return (
    <section>
      <div className="contenedor">
        <NavbarAuthenticated />
      </div>
      <VdpNavbar />
      <VdpBody />
    </section>
  );
};

export default Vdp;
