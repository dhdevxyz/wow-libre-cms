import React, { useState } from "react";

const slides = [
  {
    image:
      "https://static.wixstatic.com/media/5dd8a0_3dc87ed818024d4aa533b06fb8da4207~mv2.webp",
    text: "Cambia de facción o personaliza tu guerrero tantas veces como quieras. ¡Hazlo a tu manera!",
  },
  {
    image:
      "https://static.wixstatic.com/media/5dd8a0_6bf5a01df5a8485a947ad6a425aefe50~mv2.webp",
    text: "Traje Murlock: ¡Conviértete en un Murlock y sorprende a tus amigos!",
  },
  {
    image:
      "https://static.wixstatic.com/media/5dd8a0_2919e1c275c941e0b89bdcde701b15c0~mv2.webp",
    text: "Tu asistente Vip para tu aventura!",
  },
];

interface PremiumBenefitsProps {
  t: (key: string, options?: any) => string;
}

const PremiumBenefitsCarrousel: React.FC<PremiumBenefitsProps> = ({ t }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Título y descripción */}
      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
        {t("subscription.benefits-vip.title")}
      </h2>
      <div className="text-gray-300 rounded-lg text-xl mb-4">
        {t("subscription.benefits-vip.description")}
      </div>

      {/* Contenedor del carrusel */}
      <div className="relative w-full">
        <div className="relative h-56 sm:h-72 md:h-96 lg:h-[400px] xl:h-[350px] overflow-hidden rounded-lg">
          <img
            src={slides[currentIndex].image}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            alt={`Imagen ${currentIndex + 1}`}
          />

          <div className="absolute bottom-4 left-4 bg-black/60 text-gray-200 text-lg sm:text-2xl font-bold px-4 py-2 rounded-lg">
            {slides[currentIndex].text}
          </div>
        </div>

        {/* Botón Anterior */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-3 sm:left-4 z-30 transform -translate-y-1/2 bg-black/50 text-white p-3 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center hover:bg-black/70"
        >
          ❮
        </button>

        {/* Botón Siguiente */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-3 sm:right-4 z-30 transform -translate-y-1/2 bg-black/50 text-white p-3 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center hover:bg-black/70"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default PremiumBenefitsCarrousel;
