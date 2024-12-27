import React from "react";

interface CardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-gray-700 p-6 rounded-xl shadow-lg hover:scale-105 transform transition duration-300 hover:shadow-2xl">
      {/* Icono con fondo circular alineado a la izquierda */}
      <div className="flex items-center bg-gray-800 p-4 rounded-full w-16 h-16 mb-4">
        <div className="text-white text-3xl">{icon}</div>
      </div>

      {/* Titulo y valor alineados a la izquierda */}
      <div className="text-left">
        <h2 className="text-xl text-white font-semibold mb-2">{title}</h2>
        <p className="text-3xl text-white font-extrabold">{value}</p>
      </div>
    </div>
  );
};

export default Card;
