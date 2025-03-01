import React, { useState } from "react";
import { FaBell, FaUser } from "react-icons/fa";

const Header: React.FC = () => {
  // Estado para controlar si el modal está visible o no
  const [isModalVisible, setModalVisible] = useState(false);

  // Función para alternar la visibilidad del modal
  const toggleModal = () => {
    setModalVisible((prev) => !prev);
  };

  return (
    <div className="bg-gray-800 text-white p-4 pr-10 flex justify-between items-center fixed top-0 left-0 w-full z-20">
      <h1 className="text-3xl font-bold">Panel de Control</h1>
      <div className="flex items-center space-x-4">
        {/* Icono de campanita (Notificaciones) */}
        <div
          className="bg-blue-600 p-3 rounded-full shadow hover:bg-blue-700 transition duration-300 cursor-pointer"
          onClick={toggleModal}
        >
          <FaBell className="text-white text-xl" />
        </div>

        {/* Icono de perfil */}
        <div className="bg-gray-600 p-3 rounded-full shadow hover:bg-gray-700 transition duration-300">
          <FaUser className="text-white text-xl" />
        </div>
      </div>

      {/* Modal de notificaciones */}
      {isModalVisible && (
        <div className="absolute top-20 right-10 bg-gray-900 text-white p-4 rounded-lg shadow-lg w-80">
          <h2 className="text-lg font-semibold mb-2">Notificaciones</h2>
          <ul>
            <li className="border-b border-gray-700 py-2"></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
