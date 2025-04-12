"use client";
import React from "react";

import { useTranslation } from "react-i18next";

const InfoIntegrate = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-midnight">
      <div className="gap-16 items-center py-12 px-6 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-20 lg:px-8 contenedor ">
        <div className="font-light sm:text-lg text-gray-500 ">
          <h2 className="mb-6 text-5xl font-extrabold text-white tracking-tight leading-tight">
            {t("info-integrate.title")}
          </h2>
          <p className="mb-6 text-xl md:text-2xl leading-relaxed text-gray-400">
            {t("info-integrate.short-description")}
          </p>
          <p className="mb-6 text-xl md:text-2xl leading-relaxed text-gray-400">
            {t("info-integrate.detailed-description")}
          </p>
          <p className="text-xl md:text-2xl leading-relaxed text-gray-400">
            {t("info-integrate.summary")}
          </p>
          <div className="mt-8">
            <a
              href="/integrations"
              className="inline-block px-8 py-3 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition duration-300"
            >
              {t("info-integrate.btn.text")}
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 mt-8">
          <img
            className="w-full rounded-lg shadow-lg"
            src="https://static.wixstatic.com/media/5dd8a0_282f56c21a6945d698d83a95105bd468~mv2.png"
            alt="DecorationImg"
          />
          <img
            className="mt-4 w-full lg:mt-10 rounded-2xl shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
            src="https://static.wixstatic.com/media/5dd8a0_e3ce347ac0924809b6b2ac1f58c9519c~mv2.webp"
            alt="AppWowLibre"
          />
        </div>
      </div>
    </section>
  );
};

export default InfoIntegrate;
