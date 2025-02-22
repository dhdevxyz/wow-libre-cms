import React from "react";

interface ServerInformationVdpProps {
  isSubscribed: boolean;
}

const ServerInformationVdp: React.FC<ServerInformationVdpProps> = ({
  isSubscribed,
}) => {
  return (
    <section className="group mt-10 overflow-hidden bg-[url(https://static.wixstatic.com/media/5dd8a0_0879e8262cf045588dfccde2c80e3578~mv2.webp)] bg-cover bg-top bg-no-repeat transition-all duration-500 hover:bg-[url(https://static.wixstatic.com/media/5dd8a0_ba9fa6d86b08441dac7e9fa20171d560~mv2.webp)]">
      <div className="bg-black/50 p-8 md:p-12 lg:px-16 lg:py-24">
        <div className="contenedor">
          <div className="text-center ltr:sm:text-left rtl:sm:text-right">
            {isSubscribed ? (
              <>
                <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">
                  ¡Tu suscripción está activa!
                </h2>
                <p className="hidden text-gray-300  md:mt-6 md:block md:text-2xl md:leading-relaxed drop-shadow-md">
                  Disfruta de acceso exclusivo a contenido premium, beneficios
                  especiales y experiencias únicas diseñadas solo para miembros.
                </p>
                <p className="hidden  text-gray-300  md:mt-4 md:block md:text-2xl md:leading-relaxed drop-shadow-md">
                  Explora todas las ventajas que tienes disponibles y sácale el
                  máximo provecho a tu suscripción.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">
                  Únete y desbloquea beneficios exclusivos
                </h2>
                <p className="hidden text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed">
                  Obtén acceso anticipado a contenido exclusivo, descuentos
                  especiales y una experiencia sin límites. ¡Hazte miembro hoy y
                  lleva tu experiencia al siguiente nivel!
                </p>

                <div className="mt-5 sm:mt-16">
                  <a
                    href="/subscriptions"
                    className="text-2xl inline-block rounded-full bg-indigo-600 px-12 py-3 font-medium text-white transition hover:bg-indigo-700 focus:ring-3 focus:ring-yellow-400 focus:outline-hidden"
                  >
                    Suscribirme ahora
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServerInformationVdp;
