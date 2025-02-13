import React from "react";

const ServerEvents = () => {
  return (
    <section className="contenedor py-12 px-4">
      <h1 className="text-4xl font-bold text-white text-center mb-6">
        📅 Próximos Eventos
      </h1>
      <p className="text-lg text-white/80 text-center max-w-2xl mx-auto leading-relaxed">
        Descubre los eventos más emocionantes en el mundo del diseño, desarrollo
        y fotografía. ¡Conoce a los mejores en la industria!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Tarjeta 1 */}
        <a
          href="#"
          className="group relative block bg-black rounded-lg overflow-hidden shadow-lg"
        >
          <img
            alt="Evento de Desarrollo"
            src="https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-50"
          />
          <div className="relative p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-pink-400">
              🔥 Desarrollo Web
            </p>
            <p className="text-2xl font-bold text-white">
              Innovando con Tony Wayne
            </p>
            <div className="mt-32 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-y-0">
              <p className="text-white/90">
                Aprende sobre las últimas tendencias en desarrollo web con uno
                de los mejores expertos del sector.
              </p>
            </div>
          </div>
        </a>

        {/* Tarjeta 2 */}
        <a
          href="#"
          className="group relative block bg-black rounded-lg overflow-hidden shadow-lg"
        >
          <img
            alt="Evento de Diseño"
            src="https://images.unsplash.com/photo-1521747116042-5a810fda9664?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-50"
          />
          <div className="relative p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-green-400">
              🎨 Diseño Creativo
            </p>
            <p className="text-2xl font-bold text-white">
              Diseño y UX con Emma Stone
            </p>
            <div className="mt-32 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-y-0">
              <p className="text-white/90">
                Descubre técnicas avanzadas de diseño UI/UX y cómo mejorar la
                experiencia del usuario.
              </p>
            </div>
          </div>
        </a>

        {/* Tarjeta 3 */}
        <a
          href="#"
          className="group relative block bg-black rounded-lg overflow-hidden shadow-lg"
        >
          <img
            alt="Evento de Fotografía"
            src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-50"
          />
          <div className="relative p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-400">
              📸 Fotografía Profesional
            </p>
            <p className="text-2xl font-bold text-white">
              Masterclass con Michael Scott
            </p>
            <div className="mt-32 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-y-0">
              <p className="text-white/90">
                Aprende técnicas de fotografía profesional y captura imágenes
                impactantes con los mejores.
              </p>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
};

export default ServerEvents;
