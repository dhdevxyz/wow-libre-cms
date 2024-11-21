"use client";
import { useTranslation } from "react-i18next";
import "./style.css";

const Us = () => {
  const { t } = useTranslation();

  return (
    <section className="pt-10">
      <div className="contenedor  bg-gradient-to-r from-transparent via-blue-950 to-blue-950 mx-auto px-4 ">
        <div className="flex flex-wrap items-center ">
          <div className="w-full md:w-1/2 relative">
            <div className="bg-paper-image bg-no-repeat bg-cover bg-center h-80 rounded-lg overflow-hidden">
              <div className="text-white text-center absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                <p className="text-xl title-wow ">{t("home-us.title")}</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 text-white text-center md:text-left p-20">
            <h2 className="text-5xl font-bold mb-8">
              Wow <span className="text-blue-500">Libre</span>
              <br />
              {t("home-us.sub-title")}
            </h2>
            <p className="text-gray-200 leading-relaxed mt-5 ">
              {t("home-us.description")}
            </p>
            <a href="https://discord.gg/gPgNaXF87p" target="_blank">
              <button className="buttom text-white py-3 px-7 rounded-lg hover:bg-blue-600 mt-5">
                {t("home-us.btn-txt")}
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Us;
