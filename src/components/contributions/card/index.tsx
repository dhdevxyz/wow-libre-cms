import React from "react";

interface SingleCardProps {
  image: string;
  Button?: string;
  CardDescription: string;
  CardTitle: string;
  titleHref?: string;
  btnHref?: string;
}

const SingleCard: React.FC<SingleCardProps> = ({
  image,
  Button,
  CardDescription,
  CardTitle,
  titleHref,
  btnHref,
}) => {
  return (
    <div className="bg-gray-800 mb-10 overflow-hidden rounded-lg bg-dark-2 shadow-card duration-300 hover:shadow-3">
      {/* Imagen de la tarjeta con efectos */}
      <div className="h-80 w-full overflow-hidden group relative">
        <img
          src={image}
          alt={CardTitle}
          className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-75"
        />
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
        <h3>
          <a
            target="_blank"
            href={titleHref || "/#"}
            className="mb-4 block text-xl font-semibold text-white hover:text-primary sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
          >
            {CardTitle}
          </a>
        </h3>
        <div className="h-20">
          <p className="text-base leading-relaxed text-gray-300">
            {CardDescription}
          </p>
        </div>

        {/* Botón opcional */}
        {Button && (
          <a
            target="_blank"
            href={btnHref || "#"}
            className="inline-block rounded-full border text-gray-400 border-dark-3 px-7 py-2 text-base font-medium transition hover:border-primary hover:bg-primary hover:text-white"
          >
            {Button}
          </a>
        )}
      </div>
    </div>
  );
};

export default SingleCard;
