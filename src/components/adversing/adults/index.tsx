import React, { useEffect } from "react";

const AdultsBanner: React.FC = () => {
  useEffect(() => {
    // Crear el elemento <script>
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "//pl25277902.profitablecpmrate.com/97/02/96/97029699da65a4b529bcc6d39cce9ceb.js";
    script.async = true;

    // Añadirlo al final del <body>
    document.body.appendChild(script);

    // Limpiar el script cuando el componente se desmonte
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div></div>;
};

export default AdultsBanner;
