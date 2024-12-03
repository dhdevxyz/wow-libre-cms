"use client";
import { useEffect, useRef } from "react";

export default function Banner(): JSX.Element {
  const banner = useRef<HTMLDivElement>(null);

  // Configuración de atOptions
  const atOptions = {
    key: "0530109dad333db4795819fa124f830d",
    format: "iframe",
    height: 90,
    width: 728,
    params: {},
  };

  useEffect(() => {
    if (banner.current && !banner.current.firstChild) {
      // Crear y configurar el script de configuración de atOptions
      const conf = document.createElement("script");
      conf.type = "text/javascript";
      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;

      // Crear y configurar el script de carga del iframe
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `//www.highperformanceformat.com/${atOptions.key}/invoke.js`;

      // Agregar los scripts al div de banner
      banner.current.appendChild(conf);
      banner.current.appendChild(script);
    }
  }, [banner]);

  return (
    <div
      className="contenedor mx-2 my-5 border border-gray-200 justify-center items-center text-white text-center"
      ref={banner}
    ></div>
  );
}
