"use client";
import NavbarAuthenticated from "@/components/navbar-authenticated";
import { useParams } from "next/navigation";
import React from "react";

const StoreDetail = () => {
  const { id } = useParams(); // Usar destructuración para obtener el id
  const selectedProduct = {
    id: 1,
    title: "Charming Courier",
    category: "Mounts",
    disclaimer:
      "Also available at no additional charge with 6 and 12-Month Subscriptions!",
    price: "COP103.800,00",
    description:
      "Neither snow, heat, nor gloom of night stays these charming couriers from the swift completion of their appointed rounds. Soar the skies of Azeroth in style with this Skyriding mount! Charming Courier is shared across all present and future WoW® Modern characters, and automatically scales to the fastest riding skill known by each character. If they aren’t high enough level to use a flying mount, Charming Courier is also a ground mount.",
    cards: [
      {
        id: 1,
        title: "Mascota Pezuñaplastante",
        description:
          "¡Disfruta de la hermosa compañía de esta mascota revoltosa! También puedes usar a la mascota Pezuñaplastante en duelos de mascotas, el minijuego rápido y divertidísimo de World of Warcraft.",
        imageUrl:
          "https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/blt75fab9609f98a3eb/649f0d9584167349a11260fc/WOW_KodoCrushhoof_Feature_Image_1_1920x1080.png?imwidth=456&imdensity=1",
      },
      {
        id: 2,
        title: "Montura Kodo de asedio acorazado",
        description:
          "A lomos de esta temible montura descomunal, nunca te faltará confianza. El Kodo de asedio acorazado es una montura terrestre que automáticamente se ajusta a la habilidad de montura más rápida que haya conseguido cada personaje..",
        imageUrl:
          "https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/blt1bfbb93c83ae46b4/649f0d96bfce2a5e4bbe20e8/WOW_KodoCrushhoof_Feature_Image_2_1920x1080.png?imwidth=456&imdensity=1",
      },
      {
        id: 3,
        title: "Se comparten entre los personajes",
        description:
          "La mascota Pezuñaplastante y la montura Kodo de asedio acorazado estarán listas para que las uses inmediatamente después de la compra. Cuando las actives, se aplicarán a los personajes actuales y futuros de World of Warcraft de una única cuenta de Blizzard en una región y aparecerán en la interfaz de la Colección de cada personaje (Shift+P).",
        imageUrl:
          "https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/blta4944e728b16edfc/649f0d967c1e8d63617b46e1/WOW_KodoCrushhoof_Feature_Image_3_1920x1080.png?imwidth=456&imdensity=1",
      },
    ],
  };
  return (
    <div>
      <div className="contenedor">
        <NavbarAuthenticated />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8 items-start mb-20">
            {/* Columna izquierda: Imagen Grande */}
            <div className="flex-shrink-0 md:w-2/3">
              <img
                src="https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/bltc11eb8267b854b16/668432688ec4a48f0c373586/WoW_OwlMountEvergreen_BnetShop_ProductAssetGallery_1920x1080.png?imwidth=1088&imdensity=1"
                alt={`Detalle ${id}`}
                className="w-full h-auto max-h-[500px] object-cover rounded-lg transition duration-300 hover:opacity-75"
              />
              <div className="mt-10">
                <h3 className="text-white text-5xl mb-5">
                  {selectedProduct.title}
                </h3>
                <p className="text-white text-2xl">
                  {selectedProduct.description}
                </p>
              </div>
            </div>

            {/* Columna derecha: Título, Subtítulo y Botón */}
            <div className="md:w-1/3 flex flex-col space-y-4">
              <h2 className="text-5xl font-bold text-white">
                {selectedProduct.title}
              </h2>
              <p className="text-gray-400 text-3xl pb-1 ">
                {selectedProduct.category}
              </p>
              <p className="text-gray-900 bg-yellow-600 rounded-md p-4 leading-tight text-lg">
                {selectedProduct.disclaimer}
              </p>
              <p className="text-5xl  text-white font-bold pt-20 pb-10">
                {selectedProduct.price}
              </p>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-5 rounded"
                onClick={() => alert("Comprar clickeado")}
              >
                Adquirir
              </button>
              <button
                className="bg-gray-900  text-white font-bold py-4 px-5 rounded border border-transparent hover:border-gray-600 hover:border-x-2"
                onClick={() => alert("Comprar clickeado")}
              >
                Regalar
              </button>

              <p className="text-gray-900 bg-yellow-600 rounded-md p-4 leading-tight text-lg">
                Al comprar esta montura estás donando al servidor.
              </p>
            </div>
          </div>
          {/* LINEA SEPARADOR BLANCA*/}
          <div className="my-8 border-t border-gray-700 "></div>

          {/* seccion que permita mostrar unas iamgenes tipo tarjeta con titulo y descripcion de maximo 3 tarjetas */}

          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {selectedProduct.cards.map((card) => (
                <div
                  key={card.id}
                  className="rounded-lg shadow-lg overflow-hidden"
                >
                  <img
                    src={card.imageUrl}
                    alt={`Imagen de ${card.title}`}
                    className="w-full h-50 object-cover"
                  />
                  <div className="pt-5">
                    <h3 className="text-2xl font-bold text-white mb-5">
                      {card.title}
                    </h3>
                    <p className="text-gray-400 text-lg">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetail;
