"use client";
import NavbarAuthenticated from "@/components/navbar-authenticated";
import { useParams } from "next/navigation";
import React from "react";

const StoreDetail = () => {
  const { id } = useParams(); // Usar destructuración para obtener el id

  return (
    <div>
      <div className="contenedor">
        <NavbarAuthenticated />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Columna izquierda: Imagen Grande */}
            <div className="flex-shrink-0 md:w-2/3">
              <img
                src="https://via.placeholder.com/800x400" // Imagen de ejemplo con ancho mayor que alto
                alt={`Detalle ${id}`}
                className="w-full h-auto max-h-[500px] object-cover rounded-lg"
              />
            </div>

            {/* Columna derecha: Título, Subtítulo y Botón */}
            <div className="md:w-1/3 flex flex-col justify-center space-y-4">
              <h2 className="text-3xl font-bold text-white">
                Título del Producto
              </h2>
              <p className="text-gray-400 text-lg">Subtítulo del Producto</p>
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => alert("Comprar clickeado")}
              >
                Comprar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetail;
