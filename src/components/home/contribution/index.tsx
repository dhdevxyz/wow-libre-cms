"use client";
import React from "react";
import { useTranslation } from "react-i18next";

const ContributionsHome = () => {
  const { t } = useTranslation();

  return (
    <section
      className="rounded-3xl
 contenedor overflow-hidden bg-gradient-to-br from-[#0b1218] via-[#1b2735] to-[#4a789f] sm:grid sm:grid-cols-2 sm:items-center mt-20 mb-20"
    >
      <div className=" p-8 md:p-12 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            {t("home-who-we-are.title")}
          </h2>

          <p className="hidden text-gray-300 md:mt-4 md:block text-2xl">
            {t("home-who-we-are.description")}
          </p>

          <div className="mt-4 md:mt-8">
            <a
              href="/contributions"
              className="inline-block px-8 py-3 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition duration-300"
            >
              {t("home-who-we-are.btn-text")}
            </a>
          </div>
        </div>
      </div>

      <img
        alt="home-who-we-are"
        src="https://static.wixstatic.com/media/5dd8a0_8ad3d49e4b7744cdb7ae1cecfd42f011~mv2.webp"
        className="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-ss-[30px] md:h-[calc(100%_-_4rem)] md:rounded-ss-[60px]"
      />
    </section>
  );
};

export default ContributionsHome;
