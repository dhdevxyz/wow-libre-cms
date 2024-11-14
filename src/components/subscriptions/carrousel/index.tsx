"use client";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useRouter } from "next/navigation";

const MultiCarouselSubs = () => {
  const router = useRouter();

  const items = [
    {
      id: 1,
      image: "http://imgfz.com/i/ol6RNZi.png",
      title: "Wow Replica",
    },
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 4,
    },
  };

  const handleSelectItem = (id: number) => {
    router.push(`/store/${id}`);
  };

  return (
    <div className="rounded-[1%] mt-8">
      <div>
        <h3 className="text-start title-server text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-2">
          Servidores asociados
        </h3>
      </div>
      <Carousel
        className="m-0 max-h-[50rem] max-w-[1200rem] pt-4 select-none"
        responsive={responsive}
        draggable={false}
        showDots={true} // Mostrar puntos de navegación
      >
        {items.map((item) => (
          <div
            className="relative flex flex-col rounded-xl overflow-hidden max-w-auto pl-8"
            key={item.id}
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="h-[22rem] w-full object-cover"
              />
              {/* Nombre sobre la imagen */}
              <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/75 to-transparent">
                <p className="text-white text-lg font-bold">{item.title}</p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
      <div>
        <p className="text-start text-white text-xl md:text-2xl lg:text-3xl xl:text-2xl mt-10 font-light">
          Migra tus personajes a los diferentes servidores asociados y
          garantizaremos tus personajes sin perdida.
        </p>
      </div>
    </div>
  );
};

export default MultiCarouselSubs;
