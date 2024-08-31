"use client";
import React, { useEffect } from "react";

const WowheadTooltip: React.FC = () => {
  useEffect(() => {
    const configScript = document.createElement("script");
    configScript.innerHTML = `
      const whTooltips = {
        colorLinks: true,
        iconizeLinks: true,
        renameLinks: true,
        hideDelay: 2,
      };
    `;

    const scriptElement = document.createElement("script");
    scriptElement.src = "https://wow.zamimg.com/js/tooltips.js";
    scriptElement.async = true;

    document.body.appendChild(scriptElement);

    return () => {
      document.body.removeChild(scriptElement);
    };
  }, []);

  return null;
};

export default WowheadTooltip;
