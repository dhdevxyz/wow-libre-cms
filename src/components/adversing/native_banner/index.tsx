"use client";
import { useEffect } from "react";

const NativeBanners = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//pl25802611.effectiveratecpm.com/c43ccebe4913c87112676f7545982eac/invoke.js";
    script.async = true;
    script.dataset.cfasync = "false";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      id="container-c43ccebe4913c87112676f7545982eac"
      className="contenedor"
    ></div>
  );
};

export default NativeBanners;
