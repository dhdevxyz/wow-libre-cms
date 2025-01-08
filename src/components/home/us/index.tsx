"use client";
import { useTranslation } from "react-i18next";
import "./style.css";

const Us = () => {
  const { t } = useTranslation();

  return (
    <section className="p-16 bg-gradient-to-b">
      <div className="container mx-auto px-4 space-y-16">
        {/* Título Centrado */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white">
            {t("home-us.realm")} -{" "}
            <span className="text-blue-500">{t("home-us.experience")}</span>
          </h1>
          <p className="text-xl text-gray-300 mt-4">{t("home-us.sub-title")}</p>
        </div>

        {/* Primera Sección */}
        <div className="flex flex-wrap items-center">
          {/* Imagen */}
          <div className="w-full md:w-1/2 relative mb-8 md:mb-0">
            <div className="bg-paper-image bg-no-repeat bg-cover bg-center h-80 rounded-xl shadow-lg overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-2xl font-semibold px-6 text-center">
                  {t("home-us.realms.primary.title")}
                </p>
              </div>
            </div>
          </div>

          {/* Texto */}
          <div className="w-full md:w-1/2 text-white text-center md:text-left px-4">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Wow <span className="text-blue-500">Libre</span>
              <br />
              {t("home-us.realms.primary.sub-title")}
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg mb-8">
              {t("home-us.realms.primary.description")}
            </p>
            <a
              href="https://chat.whatsapp.com/KpvQJSOAujI4DlYjweWDxW"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:bg-gradient-to-r hover:from-gray-600 hover:via-gray-700 hover:to-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-600 focus:ring-opacity-50 transition duration-300 ease-in-out">
                {t("home-us.realms.primary.btn-txt")}
              </button>
            </a>
          </div>
        </div>

        {/* Segunda Sección */}
        <div className="flex flex-wrap items-center">
          {/* Imagen */}
          <div className="w-full md:w-1/2 relative mb-8 md:mb-0">
            <div className="bg-paper-image-second-realm bg-no-repeat bg-cover bg-center h-80 rounded-xl shadow-lg overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-2xl font-semibold px-6 text-center">
                  {t("home-us.realms.secondary.title")}
                </p>
              </div>
            </div>
          </div>

          {/* Texto */}
          <div className="w-full md:w-1/2 text-white text-center md:text-left px-4">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Wow <span className="text-blue-500">Libre</span>
              <br />
              {t("home-us.realms.secondary.sub-title")}
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg mb-8">
              {t("home-us.realms.secondary.description")}
            </p>
            <a
              href="https://chat.whatsapp.com/KpvQJSOAujI4DlYjweWDxW"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:bg-gradient-to-r hover:from-gray-600 hover:via-gray-700 hover:to-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-600 focus:ring-opacity-50 transition duration-300 ease-in-out">
                {t("home-us.realms.secondary.btn-txt")}
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Us;
