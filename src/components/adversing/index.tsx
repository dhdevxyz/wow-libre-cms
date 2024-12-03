"use client";
import { useEffect, useRef } from "react";

export default function Banner(): JSX.Element {
  const banner = useRef<HTMLDivElement>(null);

  const atOptions = {
    key: "0530109dad333db4795819fa124f830d",
    format: "iframe",
    height: 90,
    width: 728,
    params: {},
  };

  useEffect(() => {
    if (banner.current && !banner.current.firstChild) {
      const conf = document.createElement("script");
      conf.type = "text/javascript";
      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `//www.highperformanceformat.com/${atOptions.key}/invoke.js`;

      banner.current.appendChild(conf);
      banner.current.appendChild(script);
    }
  }, []);

  return (
    <div
      className="contenedor mx-2 my-5 border border-gray-200 justify-center items-center text-white text-center"
      ref={banner}
      style={{
        maxWidth: "100%",
        overflow: "hidden", // Evita desbordamientos
      }}
    ></div>
  );
}
