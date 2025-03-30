import React from "react";

interface CardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-gray-900 p-10 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
      {/* Icono con fondo sutil */}
      <div className="flex items-center justify-center bg-gray-800 p-4 rounded-xl w-12 h-12 mb-4">
        <div className="text-blue-400 text-3xl">{icon}</div>
      </div>

      {/* Contenido */}
      <div className="text-left">
        <h2 className="text-xl text-gray-300 font-medium">{title}</h2>
        <p className="text-3xl text-white font-bold">{value}</p>
      </div>
    </div>
  );
};

export default Card;
