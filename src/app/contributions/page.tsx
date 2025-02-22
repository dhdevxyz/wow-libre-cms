"use client";
import AdultsBanner from "@/components/adversing/adults";
import SingleCard from "@/components/contributions/card";
import NavbarAuthenticated from "@/components/navbar-authenticated";
import Link from "next/link";

const Contributions = () => {
  return (
    <div>
      <div className="contenedor">
        <NavbarAuthenticated />
      </div>

      <div
        className="text-white mb-20 mt-14"
        style={{
          background: "linear-gradient(to right, #2b2b2b, #4f4f4f, #a6a6a6)",
        }}
      >
        <div className="contenedor mx-auto px-6 py-12 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col justify-between max-w-2xl w-full">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-7">
                  ¡Explora Aplicaciones Gratis Hechas para tu Servidor y la
                  Comunidad de WoW!
                </h2>
                <p className="text-lg lg:text-2xl mb-4 break-words">
                  Descubre herramientas exclusivas de código abierto, diseñadas
                  para potenciar tu servidor de World of Warcraft. ¡Todo gratis
                  y al alcance de tu mano!
                </p>
                <div className="pt-8">
                  <p className="text-lg lg:text-4xl pt-2 mb-5 font-semibold">
                    ¡Aplicaciones que Transformarán tu Experiencia WoW!
                  </p>
                  <p className="text-lg lg:text-2xl mb-6 break-words">
                    Desde herramientas para administrar tu servidor hasta
                    soluciones para mejorar la jugabilidad. Encuentra
                    aplicaciones de la comunidad, creadas con pasión y
                    dedicación, totalmente gratuitas.
                  </p>
                </div>
              </div>
              <div className="mt-10">
                <Link
                  href="/register"
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold mb-4"
                >
                  Comunidad
                </Link>

                <p className="text-lg pt-4 break-words">
                  ¡Únete a la Revolución del Código Abierto!
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:gap-8">
              <div className="relative h-[450px] w-[280px] select-none">
                <img
                  src="https://static.wixstatic.com/media/5dd8a0_959a823b0b8048c0946db80638ec5291~mv2.webp"
                  alt="TrinityCore"
                  className="object-cover rounded-xl w-full h-full transition duration-300 hover:opacity-75"
                />
              </div>
              <div className="relative h-[450px] w-[280px] select-none">
                <img
                  src="https://user-images.githubusercontent.com/75517/109369101-80236780-789b-11eb-900c-bcc17a3cf13c.png"
                  alt="AzerothCore"
                  className="object-cover rounded-xl w-full h-full transition duration-300 hover:opacity-75"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="contenedor  pb-10 pt-20 lg:pb-20 lg:pt-[120px]">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <SingleCard
              image="https://static.wixstatic.com/media/5dd8a0_ee6badb1babc44caae9116919c469636~mv2.webp"
              CardTitle="Gestión y Conectividad en un Solo Lugar"
              titleHref="https://github.com/ManuChitiva/wow-libre-client"
              btnHref="https://github.com/ManuChitiva/wow-libre-client"
              CardDescription="Registra jugadores, administra tu servidor y conecta con WowLibre sin complicaciones. ¡Todo lo que necesitas en una sola plataforma!"
              Button="Ver Detalles"
            />
            <SingleCard
              image="https://static.wixstatic.com/media/5dd8a0_4cb670015f3d4b61838a98aa22aa6d98~mv2.jpg"
              CardTitle="Aplicación Móvil - Gestión de Jugadores"
              CardDescription="Administra las cuentas y estadísticas de tus jugadores desde cualquier lugar con nuestra intuitiva app móvil."
              Button="En desarrollo"
            />
            <SingleCard
              image="https://static.wixstatic.com/media/5dd8a0_8c5b7a3a15014ad599ca7a0d6d6dfa35~mv2.jpg"
              CardTitle="Launcher Personalizado"
              CardDescription="Facilita a tus jugadores el acceso al servidor y gestiona actualizaciones con nuestro launcher diseñado para tu juego."
              Button="En desarrollo"
            />
          </div>
        </div>
      </section>
      <AdultsBanner />
    </div>
  );
};

export default Contributions;
