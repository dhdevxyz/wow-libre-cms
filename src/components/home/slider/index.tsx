"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";
import { ProfesionsServices } from "@/model/model";
import { ProfessionsServicesApi } from "@/api/home";

const SliderHome = () => {
  const [services, setPartners] = useState<ProfesionsServices[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPartners = async () => {
      setIsLoading(true);
      try {
        const data = await ProfessionsServicesApi(page, 6);
        setPartners(data);
      } catch (error) {
        console.error("Error fetching partners:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartners();
  }, [page]);

  const handleAfterChange = (currentIndex: number) => {
    if (currentIndex + 4 >= services.length && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const slidesToShow = services.length < 4 ? services.length : 4;

  const settings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    afterChange: handleAfterChange,
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
    <div className="contenedor">
      <div className="slider-introduction">
        <h2 className="slider-introduction-title title-server">
          Servicios de guerra!
        </h2>
        <p className="slider-introduction-description text-lg md:text-xl lg:text-1xl xl:text-2xl">
          ¿Buscas mejorar tu equipo, conseguir los mejores objetos o potenciar
          tus habilidades en World of Warcraft? ¡Estás en el lugar correcto!
          Nuestros jugadores profesionales están listos para ofrecerte sus
          servicios de profesiones.
        </p>
        <a
          className="slider-introduction-other text-lg md:text-xl lg:text-1xl xl:text-2xl hover:text-gray-300"
          href="#"
        >
          Conoce otros guerreros!
        </a>
      </div>

      {services.length === 0 && !isLoading ? (
        <div className="no-partners-message text-lg md:text-xl lg:text-2xl xl:text-2xl text-white mb-20 ">
          No se encontraron servicios disponibles. ¡Vuelve pronto para ver las
          nuevas ofertas de nuestros guerreros!
        </div>
      ) : (
        <Slider {...settings}>
          {services.map((service) => (
            <div key={service.id} className="slider cursor-pointer ">
              <div className="cards-slider ">
                <div className="slider-content ">
                  <p className="slider-title text-lg md:text-xl lg:text-2xl xl:text-3xl">
                    {service.character_name}
                  </p>
                  <p className="slider-subtitle text-lg md:text-xl lg:text-1xl xl:text-2xl">
                    {service.name}
                  </p>
                </div>
                <div className="slider-image">
                  <img
                    src={service.logo}
                    draggable="false"
                    className="w-full h-full object-cover"
                    style={{
                      borderRadius: "50%",
                      width: "50%",
                      height: "90%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="slider-text">
                  <p className="slider-description font-bold text-3xl md:text-xl lg:text-2xl xl:text-2xl">
                    Adquirir servicios
                  </p>
                  <p className="slider-description text-2xl md:text-xl lg:text-2xl xl:text-2xl">
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
                  <div className="slider-contract ">
                    <button className="contract-button">Contactar</button>
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
