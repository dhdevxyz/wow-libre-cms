import React from "react";

const IntegrationsGallery = () => {
  return (
    <div className="bg-midnight contenedor  py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-4 flex items-center justify-between gap-8 sm:mb-8 md:mb-12">
          <div className="flex items-center gap-12">
            <h2 className="text-2xl font-bold lg:text-3xl text-white">
              Galeria
            </h2>

            <p className="hidden max-w-screen-sm  text-gray-300 md:block">
              Explora nuestra galería de integraciones y descubre cómo puedes
              llevar tu proyecto al siguiente nivel. Desde monitoreo hasta
              desarrollo, tenemos todo lo que necesitas para hacer crecer tu
              negocio.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">
          <a
            href="#"
            className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80"
          >
            <img
              src="https://docs.newrelic.com/images/mobile_screenshot-full_summary-gif.gif"
              loading="lazy"
              alt="Photo by Minh Pham"
              className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

            <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
              Monitoreo
            </span>
          </a>

          <a
            href="#"
            className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80"
          >
            <img
              src="https://static.wixstatic.com/media/5dd8a0_921b234b7dc5426183a933e2097f0a6d~mv2.gif"
              loading="lazy"
              alt="Photo by Magicle"
              className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

            <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
              Web
            </span>
          </a>

          <a
            href="#"
            className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80"
          >
            <img
              src="https://static.wixstatic.com/media/5dd8a0_bc821d1d33ad4ee28d53683317da4f31~mv2.png"
              loading="lazy"
              alt="Photo by Martin Sanchez"
              className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

            <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
              Dev
            </span>
          </a>

          <a
            href="#"
            className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80"
          >
            <img
              src="https://static.wixstatic.com/media/5dd8a0_71236328003145c5a461053567a36a07~mv2.jpg"
              loading="lazy"
              alt="Photo by Lorenzo Herrera"
              className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

            <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
              App Mobile
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsGallery;
