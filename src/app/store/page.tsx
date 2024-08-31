"use client";

import NavbarAuthenticated from "@/components/navbar-authenticated";
import AdvertisingStore from "@/components/store/banners";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

// Define las categorías y sus respectivas tarjetas
const categories = [
  {
    id: "section1",
    title: "Categoría 1",
    category: "Excelente para nuevos jugadores",
    description: "¿Acabas de llegar a World of Warcraft? Empieza por aquí.",
    cards: [
      {
        id: 1,
        image:
          "https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/blt8251b00af5c9b40a/66bfcb5b7e3fe282ad56f73c/WOW_11.0_TWW_LaunchBanners-Destruction_Launcher_FranchisePhoenix_1920x1080_JL01b.png?imwidth=854&imdensity=1",
        title: "Mensajero encantador",
        description:
          "¡Ya disponible! Llévate una subida hasta el nivel 70 en todas las ediciones y vuelve a la lucha.",
        type: "Monturas",
        price: "$ 2 usd",
      },
      {
        id: 2,
        image:
          "https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/bltc11eb8267b854b16/668432688ec4a48f0c373586/WoW_OwlMountEvergreen_BnetShop_ProductAssetGallery_1920x1080.png?imwidth=1088&imdensity=1",
        title: "Vermis arborea aspuciosa",
        description: "¡Juega gratis hasta el nivel 20!",
        type: "Monturas",
        price: "$ 50 usd",
      },
      {
        id: 3,
        title: "Cuervo aterrador",
        image:
          "https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/bltbb5a731e240dc6a8/659737a6d08684df44bc0c06/WoW_LNY-Shop_Bnet_ProductAsset_1920x1080_B01.png?imwidth=1088&imdensity=1",
        description:
          "¡Incluye acceso a World of Warcraft, Cataclysm Classic, la Temporada del Descubrimiento de Classic y los reinos del modo Hardcore! ",
        type: "Monturas",
        price: "$ 41 usd",
      },
      {
        id: 4,
        title: "Pack Logdo",
        image:
          "https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/blt159934687683127b/63505f8da1e3093bbef752c4/ensorcelled-everwyrm-thumbnail-960x540.png?imwidth=1088&imdensity=1",
        description: "Descripción de la imagen 4",
        type: "Monturas",
        price: "$ 21 usd",
      },
    ],
  },
  {
    id: "section2",
    title: "Categoría 2",
    category: "Excelente para nuevos jugadores",
    description: "Contenido de la categoría 2...",

    cards: [
      {
        id: 5,
        title: "xxxxxxxxxx",

        image: "https://via.placeholder.com/150",
        description: "Descripción de la imagen 5",
        type: "Monturas",
        price: "$ 20 usd",
      },
      {
        id: 6,
        title: "xxxxxxxxxx",

        image: "https://via.placeholder.com/150",
        description: "Descripción de la imagen 6",
        type: "Monturas",
        price: "$ 20 usd",
      },
    ],
  },
  {
    id: "section3",
    title: "Categoría 3",
    category: "Excelente para nuevos jugadores",
    description: "Contenido de la categoría 3...",
    cards: [
      {
        id: 7,
        title: "xxxxxxxxxx",

        image: "https://via.placeholder.com/450",
        description: "Descripción de la imagen 7",
        type: "Monturas",
        price: "$2  usd",
      },
      {
        id: 8,
        title: "xxxxxxxxxx",
        image: "https://via.placeholder.com/450",
        description: "Descripción de la imagen 8",
        type: "Monturas",
        price: "$20 usd",
      },
      {
        id: 9,
        title: "xxxxxxxxxx",
        image: "https://via.placeholder.com/450",
        description: "Descripción de la imagen 9",
        type: "Monturas",
        price: "COP 124.600,00 ",
      },
    ],
  },
];

const Store = () => {
  const router = useRouter();
  const handleSelectItem = (id: number) => {
    router.push(`/store/${id}`);
  };

  return (
    <div className="contenedor">
      <NavbarAuthenticated />
      <AdvertisingStore />
      <nav className="w-full h-20 flex items-center justify-start bg-gray-900 text-white mt-10 mb-10">
        {categories.map((category) => (
          <a
            key={category.id}
            href={`#${category.id}`}
            className="hover:text-gray-400 px-4 py-2 hover:bg-gray-700"
          >
            {category.title}
          </a>
        ))}
      </nav>
      {categories.map((category) => (
        <div key={category.id} id={category.id} className="pt-20 bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Column 1: Title and Description */}
              <div className="flex-shrink-0 md:w-1/3 flex flex-col justify-center text-center max-w-md mx-auto space-y-4">
                <div>
                  <h2 className="text-4xl font-bold text-white mb-4">
                    {category.category}
                  </h2>
                  <p className="text-gray-400 text-lg">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Column 2: Image Cards */}
              <div className="flex flex-wrap md:w-2/3 gap-4 mb-10 cursor-pointer">
                {category.cards.map((card) => (
                  <div
                    key={card.id}
                    className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg shadow-lg w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex flex-col"
                    style={{ minHeight: "400px" }}
                    onClick={() => handleSelectItem(card.id)}
                  >
                    <img
                      src={card.image}
                      alt={`Image ${card.id}`}
                      className="w-full h-60 object-cover rounded-md mb-4"
                    />
                    <div className="flex flex-col flex-grow">
                      <p className="text-white mb-4 ">{card.title}</p>
                      <p className="text-yellow-500 mb-4 text-lg">
                        {card.description}
                      </p>
                      <p className="text-gray-300 mb-4 text-lg">{card.type}</p>
                      <p className="text-gray-100 mt-auto font-bold">
                        {card.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Store;
