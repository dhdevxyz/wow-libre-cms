import React from "react";

const Header: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white  p-4 flex justify-between items-center fixed top-0 left-0 w-full z-20">
      <h1 className="text-3xl font-bold">Panel de Control</h1>
      <div className="flex items-center space-x-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition duration-300">
          Notificaciones
        </button>
        <button className="bg-gray-600 text-white px-4 py-2 rounded shadow hover:bg-gray-700 transition duration-300">
          Perfil
        </button>
      </div>
    </div>
  );
};

export default Header;
