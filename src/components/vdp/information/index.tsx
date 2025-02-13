import React from "react";

const ServerInformationVdp = () => {
  return (
    <section className="group mt-10 overflow-hidden bg-[url(https://static.wixstatic.com/media/5dd8a0_7c16cbefaf674142bfb387447e78678d~mv2.jpg)] bg-cover bg-top bg-no-repeat transition-all duration-500 hover:bg-[url(https://wallpapers.com/images/hd/wow-thrall-looking-at-horizon-blet0bw6z6gel93g.jpg)]">
      <div className="bg-black/50 p-8 md:p-12 lg:px-16 lg:py-24">
        <div className="contenedor">
          <div className="text-center ltr:sm:text-left rtl:sm:text-right">
            <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">
              Suscripcion mensual
            </h2>

            <p className="hidden text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed">
              Adquiere una suscripcion mensual y gana beneficios especiales
            </p>

            <div className="mt-5 sm:mt-16">
              <a
                href="/subscriptions"
                className="text-2xl inline-block rounded-full bg-indigo-600 px-12 py-3 font-medium text-white transition hover:bg-indigo-700 focus:ring-3 focus:ring-yellow-400 focus:outline-hidden"
              >
                Registrarme
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServerInformationVdp;
