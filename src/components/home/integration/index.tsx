"use client";
import React from "react";

import { useTranslation } from "react-i18next";

const ServerFeatures = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-midnight mt-10 mb-16 rounded-xl  ">
      <div className="gap-16 items-center py-12 px-6 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-20 lg:px-8 contenedor ">
        <div className="font-light sm:text-lg text-gray-500 ">
          <h2 className="mb-6 text-5xl font-extrabold text-white tracking-tight leading-tight title-server">
            {t("features-server.title")}
          </h2>
          <p className="mb-6 text-xl md:text-2xl leading-relaxed text-gray-400">
            {t("features-server.short-description")}
          </p>
          <p className="mb-6 text-xl md:text-2xl leading-relaxed text-gray-400">
            {t("features-server.detailed-description")}
          </p>
          <p className="text-xl md:text-2xl leading-relaxed text-gray-400">
            {t("features-server.summary")}
          </p>
          <div className="mt-8">
            <a
              href="/integrations"
              className="inline-block px-8 py-3 text-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-lg transition duration-300"
            >
              {t("features-server.btn.text")}
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 md:mt-0 mt-20  ">
          <img
            src="https://static.wixstatic.com/media/5dd8a0_49558bb47b38464d88658e647a185e7f~mv2.png"
            alt="features"
            className="shadow shadow-teal-300 w-500% h-500 object-cover mx-auto rounded-full"
          />
        </div>
      </div>
    </section>
  );
};

export default ServerFeatures;
