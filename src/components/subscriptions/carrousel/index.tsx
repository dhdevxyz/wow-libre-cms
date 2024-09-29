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
      image:
        "https://lh3.googleusercontent.com/p/AF1QipMQDfZnkDpTRVfIZybnD_P_LYKOZXddp05JVEU=s680-w680-h510",
      title: "Dinosaurio Durotar",
    },
    {
      id: 2,
      image:
        "https://scontent.fvvc1-1.fna.fbcdn.net/v/t39.30808-6/323931143_933929320931576_4669352864118796396_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGAz0HsYd3hcmi8cli1Qjz56-DX2w2EKxzr4NfbDYQrHDCe8JE9AkXXs9zt14lBmtSrHm9FBoESmAA-nCKSGTa1&_nc_ohc=QnNqHP58X2QQ7kNvgE1trFW&_nc_ht=scontent.fvvc1-1.fna&oh=00_AYBIHJZCeNNtSa7SwGfBe4KqEsFJBXJqLVCrhXbtgeIzKw&oe=66FA906A",
      title: "Komodo",
    },
    {
      id: 3,
      image:
        "https://scontent.fvvc1-1.fna.fbcdn.net/v/t39.30808-6/292633890_726810068592100_755955628419423819_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGXKGi5O22UEggJmy0e7AOPBhi1O5MirscGGLU7kyKux8ZssZJM2RceZbFQC9RVtvE8Lu7WG3RMHCsH1pk-hjAV&_nc_ohc=C-JofG9TU2EQ7kNvgHsBZNF&_nc_ht=scontent.fvvc1-1.fna&oh=00_AYCg_rJa0oJiQaDYViQ6qOoIGqtlqbayo35UX6wOYawsCg&oe=66FA7D87",
      title: "Escoba",
    },
    {
      id: 4,
      image:
        "https://scontent.fvvc1-1.fna.fbcdn.net/v/t1.6435-9/82343928_466278253970968_8566430739954925568_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=2285d6&_nc_eui2=AeGF3zO-4qsJl3aXTGbJ3yQTq01xk0YRDBWrTXGTRhEMFTDl6LOh5N1GU0xMpxhR_PQ20vT-FRhl2HSXnz5UVUOR&_nc_ohc=tF6RzjCjJacQ7kNvgHoldX-&_nc_ht=scontent.fvvc1-1.fna&_nc_gid=Ak9Hijr6WjJP1OaxUFTH309&oh=00_AYCtIF8VP0EEuKvOHeLEQGMZIPgnfVwXyiKwH5XtoO9WMg&oe=671C4172",
      title: "Perro Inframundo",
    },
    {
      id: 5,
      image:
        "https://scontent.fvvc1-1.fna.fbcdn.net/v/t39.30808-6/461078988_122103412394537177_5733868608717400257_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=KaE6gpoFvu8Q7kNvgGPiBlY&_nc_ht=scontent.fvvc1-1.fna&_nc_gid=ACxcDnYrpCSu0RR_yxbUddy&oh=00_AYAVKuCsgRb8BAq2l7b1_WNDqVINokUmSOKO7fYp9XjRCg&oe=66FA7A8C",
      title: "Ropa Gm",
    },
    {
      id: 6,
      image: "https://i.ibb.co/sVNbt0v/images.jpg",
      title: "Perro Inframundo",
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
        <p className="text-start text-white text-xl md:text-2xl lg:text-3xl xl:text-2xl mt-10">
          Migra tus personajes a los diferentes servidores asociados y
          garantizaremos tus personajes sin perdida.
        </p>
      </div>
    </div>
  );
};

export default MultiCarouselSubs;
