import React from "react";

interface CardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, value, icon }) => {
  return (
    <div
      className="bg-gray-900 p-8 rounded-2xl shadow-md transition-all duration-300 
                 border-2 border-transparent hover:border-indigo-500 
                 hover:shadow-xl hover:scale-105 transform"
      style={{
        background:
          "linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(6, 182, 212, 0.2))",
        borderRadius: "1rem",
        borderWidth: "2px",
        borderColor: "transparent",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Icono con fondo sutil */}
      <div className="flex items-center justify-center bg-gray-800 p-4 rounded-xl w-16 h-16 mb-4">
        <div className="text-indigo-500 text-3xl">{icon}</div>
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
