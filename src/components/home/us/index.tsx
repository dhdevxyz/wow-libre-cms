import React from "react";
import "./style.css"; // Asegúrate de tener tus estilos CSS configurados correctamente

const Us = () => {
  return (
    <section className="pt-10">
      <div className="contenedor  bg-gradient-to-r from-transparent via-blue-950 to-blue-950 mx-auto px-4 ">
        <div className="flex flex-wrap items-center ">
          <div className="w-full md:w-1/2 relative">
            <div className="bg-paper-image bg-no-repeat bg-cover bg-center h-80 rounded-lg overflow-hidden">
              <div className="text-white text-center absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                <p className="text-xl title-wow ">Comunidad de Wow Libre</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 text-white text-center md:text-left p-20">
            <h2 className="text-5xl font-bold mb-8">
              Wow <span className="text-blue-500">Libre</span>
              <br />
              Empoderando a la Comunidad de Jugadores
            </h2>
            <p className="text-gray-200 leading-relaxed mt-5 text-justify">
              En el mundo digital de World of Warcraft, los datos generados por
              la comunidad son un tesoro invaluable. En WoW Libre, transformamos
              esta riqueza en un recurso accesible, permitiendo que otros
              servidores se integren y compartan información. Somos un puente
              abierto para el intercambio de datos, impulsando la colaboración y
              mejorando la experiencia de juego. En Azeroth, el verdadero poder
              reside en la comunidad y su capacidad para compartir y expandir el
              conocimiento. ¡Únete a nosotros y sé parte de esta aventura
              colectiva!
            </p>
            <button className="buttom text-white py-3 px-7 rounded-lg hover:bg-blue-600 mt-5">
              Integrarme
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Us;
