"use client";

import "./style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ServersPromos } from "@/model/model";
import { serversPromotions } from "@/api/home";
import { useTranslation } from "react-i18next";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import LoadingSpinner from "@/components/utilities/loading-spinner";
import { useUserContext } from "@/context/UserContext";
import Link from "next/link";

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
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: services.length < 1 ? services.length : 2,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: services.length < 2 ? services.length : 2,
          slidesToScroll: 1,
          infinite: false,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: services.length < 1 ? services.length : 1,
          slidesToScroll: 1,
          infinite: false,
        },
      },
    ],
  };

  return (
    <div className="contenedor pt-5 pb-15">
      <div className="slider-introduction">
        <h2 className="slider-introduction-title title-server">
          {t("home-servers.title")}
        </h2>
        <p className="slider-introduction-description text-lg md:text-xl lg:text-1xl xl:text-2xl">
          {t("home-servers.description")}
        </p>
        <a
          className="slider-introduction-other text-lg md:text-xl lg:text-1xl xl:text-2xl hover:text-gray-300"
          href="/comunity/servers"
        >
          {t("home-servers.btn-information")}
        </a>
      </div>
      {isLoading && (
        <div className="contenedor flex items-center justify-center mt-20">
          <LoadingSpinner />
        </div>
      )}
      {services.length === 0 && !isLoading ? (
        <div className="text-lg md:text-xl lg:text-2xl xl:text-2xl text-white mb-20 flex flex-col items-center">
          <img
            src="https://bnetcmsus-a.akamaihd.net/cms/blog_header/sd/SDKC28FNI82S1696978734260.png"
            alt="Espada épica"
            className="w-40 h-40 md:w-80 md:h-80 mb-6 select-none rounded-full transition-transform duration-500 ease-in-out transform hover:rotate-180"
          />

          <div className="text-center text-2xl font-serif">
            ⚔️
            <span className="text-neon_green">
              ¡Nuestros expertos están en acción!
            </span>
            ⚔️
            <br />
            Actualmente no hay servicios disponibles. <br />
            Pero no te preocupes, nuestros valientes profesionales están
            perfeccionando
            <br /> sus habilidades para ofrecerte las mejores experiencias. 🛡️
            <br />
          </div>
        </div>
      ) : (
        <Slider {...settings}>
          {services.map((service) => (
            <div key={service.id} className="slider cursor-pointer ">
              <div className="cards-slider ">
                <div className="slider-content ">
                  <p className="slider-title text-lg md:text-xl lg:text-2xl xl:text-3xl">
                    {service.name}
                  </p>
                  <p className="slider-subtitle text-lg md:text-xl lg:text-1xl xl:text-2xl">
                    {service.sub_title}
                  </p>
                </div>
                <div className="slider-image">
                  <img
                    src={service.logo}
                    draggable="false"
                    className="w-full h-full object-cover"
                    style={{
                      borderRadius: "10%",
                      width: "80%",
                      height: "90%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="slider-text mb-2">
                  <p className="slider-description font-bold text-3xl md:text-xl lg:text-2xl xl:text-2xl">
                    PROMOCIONES
                  </p>
                  <p className="slider-description text-xl md:text-xl lg:text-xl xl:text-xl">
                    {service.description.length > 50
                      ? `${service.description.substring(0, 50)}...`
                      : service.description}
                  </p>
                  <div className="slider-rating">
                    {Array.from({ length: Math.floor(3) }, (_, index) => (
                      <span key={index} className="star-icon">
                        &#9733;
                      </span>
                    ))}
                    {Array.from({ length: 1 - Math.floor(-1) }, (_, index) => (
                      <span key={index} className="star-icon">
                        &#9734;
                      </span>
                    ))}
                  </div>
                  <div className="slider-contract">
                    {user.logged_in ? (
                      <Link href="/register/username" target="_blank" passHref>
                        <button className="contract-button">
                          Crear cuenta
                        </button>
                      </Link>
                    ) : (
                      <Link href="/register" passHref>
                        <button className="contract-button">Registrarme</button>
                      </Link>
                    )}
                  </div>
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
