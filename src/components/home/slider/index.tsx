"use client";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { serversPromotions } from "@/api/home";
import { ServersPromos } from "@/model/model";
import { useTranslation } from "react-i18next";

import LoadingSpinner from "@/components/utilities/loading-spinner";
import { useUserContext } from "@/context/UserContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import Slider from "react-slick";

const SliderHome = () => {
  const [services, setPartners] = useState<ServersPromos[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { user } = useUserContext();

  useEffect(() => {
    const fetchPartners = async () => {
      setIsLoading(true);
      try {
        const data = await serversPromotions(user.language);
        setPartners(data);
      } catch (error) {
        console.error("Error fetching partners:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartners();
  }, [user.language]);

  const settings = {
    dots: false,
    infinite: services.length > 4, // Allow infinite scroll only if there are enough items
    arrows: true,
    speed: 500,
    slidesToShow: Math.min(4, services.length), // Show fewer slides if there are fewer items
    slidesToScroll: Math.min(4, services.length), // Scroll fewer slides if there are fewer items
    autoplay: false,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(4, services.length),
          slidesToScroll: Math.min(1, services.length),
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(2, services.length),
          slidesToScroll: Math.min(1, services.length),
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.min(1, services.length),
          slidesToScroll: Math.min(1, services.length),
        },
      },
    ],
  };

  return (
    <div className="contenedor py-10 px-4">
      <div className="slider-introduction text-center mb-10">
        <h2 className="text-4xl font-bold text-yellow-400">
          {t("home-servers.title")}
        </h2>
        <p className="text-lg text-gray-300 mt-4">
          {t("home-servers.description")}
        </p>
        <a
          href="/comunity/servers"
          className="text-lg text-yellow-300 mt-2 hover:text-yellow-200 underline"
        >
          {t("home-servers.btn-information")}
        </a>
      </div>

      {isLoading ? (
        <div className="flex justify-center mt-20">
          <LoadingSpinner />
        </div>
      ) : services.length === 0 ? (
        <div className="flex flex-col items-center text-white text-center mt-20">
          <img
            src="https://bnetcmsus-a.akamaihd.net/cms/blog_header/sd/SDKC28FNI82S1696978734260.png"
            alt="Espada épica"
            className="w-32 h-32 md:w-60 md:h-60 mb-6 select-none rounded-full transition-transform duration-500 ease-in-out transform hover:rotate-180"
          />
          <p className="text-2xl font-serif">
            ⚔️{" "}
            <span className="text-green-400">
              ¡Nuestros expertos están en acción!
            </span>{" "}
            ⚔️
          </p>
          <p className="text-lg mt-4">
            Actualmente no hay servicios disponibles, pero nuestros valientes
            profesionales están perfeccionando sus habilidades para ofrecerte
            las mejores experiencias. 🛡️
          </p>
        </div>
      ) : (
        <Slider {...settings}>
          {services.map((service) => (
            <div key={service.id} className="slider cursor-pointer">
              <div className="cards-slider bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-xl rounded-xl border border-gray-700 p-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
                <div className="slider-content text-center">
                  <p className="text-2xl font-semibold text-gray-100 mb-2">
                    {service.name}
                  </p>
                  <p className="text-lg text-yellow-300 italic">
                    {service.sub_title}
                  </p>
                </div>
                <div className="slider-image flex justify-center items-center my-6">
                  <img
                    src={service.logo}
                    alt="Logo"
                    draggable="false"
                    className="w-40 h-40 md:w-52 md:h-52 object-cover rounded-full border-4 border-gray-600 shadow-md transition-transform transform hover:scale-110"
                  />
                </div>
                <div className="slider-text mb-4 text-center">
                  <p className="text-gray-300 text-md leading-relaxed">
                    {service.description.length > 50
                      ? `${service.description.substring(0, 50)}...`
                      : service.description}
                  </p>
                  <div className="flex justify-center mt-4 text-yellow-400">
                    {Array.from({ length: 3 }, (_, index) => (
                      <span key={index} className="text-2xl">
                        &#9733;
                      </span>
                    ))}
                    {Array.from({ length: 1 - Math.floor(-1) }, (_, index) => (
                      <span key={index} className="text-2xl">
                        &#9734;
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-center mt-6">
                  {user.logged_in ? (
                    <Link href="/register/username" target="_blank" passHref>
                      <button className="contract-button bg-gradient-to-r from-blue-600 to-blue-400 text-white py-2 px-6 rounded-full shadow-lg hover:from-blue-500 hover:to-blue-300 transition duration-300">
                        Crear cuenta
                      </button>
                    </Link>
                  ) : (
                    <Link href="/register" passHref>
                      <button className="contract-button bg-gradient-to-r from-blue-600 to-blue-400 text-white py-2 px-6 rounded-full shadow-lg hover:from-blue-500 hover:to-blue-300 transition duration-300">
                        Registrarme
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default SliderHome;
