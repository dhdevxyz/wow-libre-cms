import { Character } from "@/model/model";
import React, { MouseEventHandler, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./style.css";

const professions = [
  {
    id: 1,
    level: "450",
    profession: "Herrero",
    description:
      "La ingeniería en World of Warcraft permite a los jugadores crear y usar una variedad de artilugios y dispositivos mecánicos.",
    rating: 4.5,
    background_image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwdxq6OZzzDPVa6vhUELv4PfTb4ZYEax3ngA&s", // Ruta a la imagen de fondo
  },
  {
    id: 2,
    level: "200",
    profession: "Encantador",
    description:
      "Los encantadores en World of Warcraft son capaces de aplicar poderosos encantamientos a equipo y armas.",
    rating: 4.2,
    background_image:
      "https://www.guiaswow.com/wp-content/uploads/2010/05/00398835_n1.jpg", // Ruta a la imagen de fondo
  },
];

interface ProfessionsProps {
  character: Character;
  token: string;
  account_id: string;
}
interface ArrowProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
const Professions: React.FC<ProfessionsProps> = ({
  character,
  token,
  account_id,
}) => {
  const [partners] = useState(professions);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 2, // Número de slides a deslizar
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // Número de slides a deslizar
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // Número de slides a deslizar
    },
  };

  return (
    <div className="professions-carousel-container">
      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        showDots={false}
        arrows={true}
        infinite={true}
        autoPlay={false}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="carousel-slide"
        containerClass="carousel-container"
        renderButtonGroupOutside={true}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
      >
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="carousel-slide select-none cursor-pointer"
          >
            <div className="bg-slate-800 shadow-md p-6 rounded-lg">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 md:mr-6">
                  <img
                    src={partner.background_image}
                    alt={partner.profession}
                    className="rounded-lg h-64 object-cover"
                  />
                </div>
                <div className="md:w-1/2">
                  <p className="text-gray-300 text-lg font-bold mb-2">
                    {partner.profession}
                  </p>
                  <p className="text-gray-300 mb-4"> Level: {partner.level}</p>
                  <div className="text-gray-300 text-lg mb-4">
                    {partner.description.length > 300
                      ? `${partner.description.substring(0, 300)}...`
                      : partner.description}
                  </div>
                  <div className="flex items-center mb-4">
                    {Array.from(
                      { length: Math.floor(partner.rating) },
                      (_, index) => (
                        <span key={index} className="text-yellow-400 text-xl">
                          &#9733;
                        </span>
                      )
                    )}
                    {Array.from(
                      { length: 5 - Math.floor(partner.rating) },
                      (_, index) => (
                        <span key={index} className="text-gray-400 text-xl">
                          &#9733;
                        </span>
                      )
                    )}
                  </div>
                  <div className="flex flex-col">
                    <button className="bg-blue-500  text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none">
                      Publico
                    </button>
                    <button className="bg-blue-500 mt-2 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none">
                      Editar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

const CustomLeftArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="custom-arrow custom-arrow-left"
      aria-label="Previous Slide"
    >
      &#8592;
    </button>
  );
};

const CustomRightArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="custom-arrow custom-arrow-right"
      aria-label="Next Slide"
    >
      &#8594;
    </button>
  );
};

export default Professions;
