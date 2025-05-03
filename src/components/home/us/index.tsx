"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./style.css";
import { UserContext, useUserContext } from "@/context/UserContext";
import { getExperiences } from "@/api/home";
import { ExperiencesHome } from "@/model/model";
import LoadingSpinner from "@/components/utilities/loading-spinner";

const ServerExperience = () => {
  const { t } = useTranslation();
  const { user } = useUserContext();
  const [experiences, setExperiences] = useState<ExperiencesHome[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (realmlist: string, index: number) => {
    navigator.clipboard.writeText(realmlist).then(() => {
      setCopiedIndex(index);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getExperiences(user.language);
        setExperiences(response);
      } catch (error: any) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="contenedor flex items-center justify-center mt-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return null;
  }

  return (
    <section className="p-16 bg-gradient-to-b  rounded-xl  mb-12">
      <div className="container mx-auto px-4 space-y-16">
        {/* Título Centrado */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white">
            {t("home-us.realm")} -{" "}
            <span className="text-indigo-500">{t("home-us.experience")}</span>
          </h1>
          <p className="text-xl text-gray-300 mt-4">{t("home-us.sub-title")}</p>
        </div>

        {/* Contenedor Desplazable */}
        <div className="flex flex-col space-y-16 max-h-[80vh] overflow-y-auto scrollbar-hide">
          {experiences.map((realm, index) => (
            <div
              key={index}
              className="flex flex-wrap items-center mb-8 rounded-xl"
            >
              {/* Imagen */}
              <div className="w-full md:w-1/2 relative mb-8 md:mb-0">
                <div
                  className="bg-no-repeat bg-cover bg-center h-80 rounded-xl shadow-lg overflow-hidden group"
                  style={{
                    backgroundImage: `url(${realm.background_image})`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-2xl font-semibold px-6 text-center">
                      {t(realm.disclaimer)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Texto */}
              <div className="w-full md:w-1/2 text-white text-center md:text-left px-4 mb-1">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  {t(realm.title)}{" "}
                  <span className="text-indigo-500 pb-2">
                    {t(realm.title_disclaimer)}
                  </span>
                  <br />
                </h2>
                <p className="text-gray-300 leading-relaxed text-3x mb-8">
                  {t(realm.subtitle)}
                </p>
                <p className="text-gray-300 leading-relaxed text-lg mb-8">
                  {t(realm.description)}
                </p>

                {/* Botón de "Realmlist" */}
                <div className="flex justify-center md:justify-start space-x-4">
                  <a
                    href={realm.redirect}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:bg-gradient-to-r hover:from-gray-600 hover:via-gray-700 hover:to-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-600 focus:ring-opacity-50 transition duration-300 ease-in-out">
                      {t(realm.button_primary_text)}
                    </button>
                  </a>

                  {/* Botón para copiar el realmlist */}
                  <button
                    className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-600 focus:ring-opacity-50 transition duration-300 ease-in-out"
                    onClick={() => handleCopy(realm.realmlist, index)}
                  >
                    {copiedIndex === index ? "Copied!" : "Copy Realmlist"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServerExperience;
