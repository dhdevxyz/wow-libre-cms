import React from "react";

const IntegrationsHeader = () => {
  return (
    <section className="bg-midnight text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-1/2 lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Lleva tu proyecto
            <span className="sm:block">al siguiente nivel</span>
          </h1>
          <p className="mx-auto max-w-xl sm:text-xl/relaxed">
            Únete a nuestra plataforma y accede a herramientas avanzadas que
            potenciarán tu desarrollo. Optimiza tu infraestructura, mejora la
            experiencia de juego y crea un ecosistema innovador con nuestras
            soluciones.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded-sm border border-blue-600 bg-blue-600 px-12 py-3 text-lg font-medium text-white hover:bg-transparent hover:text-white focus:ring-3 focus:outline-hidden sm:w-auto"
              href="#community"
            >
              Integrarme
            </a>

            <a
              className="block w-full rounded-sm border border-blue-600 px-12 py-3 text-lg font-medium text-white hover:bg-blue-600 focus:ring-3 focus:outline-hidden sm:w-auto"
              href="https://github.com/ManuChitiva/wow-libre-client"
            >
              Proyecto cliente
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsHeader;
