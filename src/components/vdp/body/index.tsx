import React from "react";

const VdpBody = ({ serverData }: { serverData: { [key: string]: string } }) => {
  return (
    <section className="contenedor relative pt-12 text-white mb-10">
      <div className="items-center flex flex-wrap">
        <div className="w-full md:w-8/12 ml-auto mr-auto px-4 flex justify-center">
          <img
            alt="Company Growth"
            className="w-full h-auto max-w-8xl rounded-md shadow-lg scale-95 hover:scale-105 blur-sm hover:blur-0 opacity-80 hover:opacity-100 transition-all duration-500 ease-in-out"
            src="https://static.wixstatic.com/media/5dd8a0_7ea55edcc8c24956b1539606494f8e6a~mv2.jpg"
          />
        </div>
        <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
          <div className="md:pr-12">
            <div className="text-yellow-400 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-yellow-600 mt-8">
              <i className="fas fa-rocket text-xl"></i>
            </div>
            <h3 className="text-3xl font-semibold text-yellow-400">
              ¡Explora el Mundo de Azeroth!
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-gray-300">
              ¡Prepárate para una aventura épica! Descubre los secretos,
              desafíos y tesoros que te esperan en nuestro servidor de World of
              Warcraft. Forja tu destino, únete a batallas legendarias y
              demuestra tu poder. ⚔️🔥 ¡El viaje comienza ahora! 🚀
            </p>

            {/* Renderizando dinámicamente los datos del servidor */}
            <ul className="list-none mt-6">
              {Object.entries(serverData).map(([key, value], index) => (
                <li key={index} className="py-2">
                  <div className="flex items-center">
                    <div>
                      <span className="text-xs font-semibold inline-block py-2 px-2 uppercase rounded-full text-yellow-400 bg-yellow-600 mr-3">
                        <i className="fas fa-check-circle"></i>
                      </span>
                    </div>
                    <div>
                      <h4 className="text-gray-300 text-lg">
                        {key}: <span className="text-yellow-400">{value}</span>
                      </h4>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VdpBody;
