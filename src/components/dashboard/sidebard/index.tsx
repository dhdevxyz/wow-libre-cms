import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaUsers,
  FaChartBar,
  FaCogs,
  FaSignOutAlt,
  FaQuestionCircle,
  FaFolder,
} from "react-icons/fa";

const Sidebar: React.FC<{ onOptionChange: (option: string) => void }> = ({
  onOptionChange,
}) => {
  const [isUsersOpen, setUsersOpen] = useState(false);
  const [isSupportOpen, setSupportOpen] = useState(false);
  const [isOthersOpen, setOthersOpen] = useState(false);
  const [isMigrationsOpen, setMigrationsOpen] = useState(false);

  const router = useRouter();

  const handleMenuClick = (menu: string) => {
    onOptionChange(menu);
  };

  const handleReturnPage = () => {
    router.push("/servers");
  };

  const handleSubMenuClick = (menu: string) => {
    if (menu === "users") {
      setUsersOpen(!isUsersOpen);
    } else if (menu === "support") {
      setSupportOpen(!isSupportOpen);
    } else if (menu === "others") {
      setOthersOpen(!isOthersOpen);
    } else if (menu === "migrations") {
      setMigrationsOpen(!isMigrationsOpen);
    }
  };

  return (
    <div className="bg-gray-800 text-white w-72 h-full p-5 pt-40 shadow-xl fixed top-0 left-0 z-10">
      <h3 className="text-lg font-semibold mb-2 text-gray-400">Gestión</h3>
      <ul>
        {/* Opción de Dashboard */}
        <li
          className="flex items-center justify-between p-2 rounded-md hover:bg-gray-700 transition duration-200 cursor-pointer"
          onClick={() => handleMenuClick("dashboard")}
        >
          <div className="flex items-center">
            <FaChartBar className="mr-2" />
            Dashboard
          </div>
        </li>

        {/* Opción de Usuarios */}
        <li
          className="flex items-center justify-between p-2 rounded-md hover:bg-gray-700 transition duration-200 cursor-pointer"
          onClick={() => handleSubMenuClick("users")}
        >
          <div className="flex items-center">
            <FaUsers className="mr-2" />
            Usuarios
          </div>
          <span>{isUsersOpen ? "-" : "+"}</span>
        </li>
        {isUsersOpen && (
          <ul className="ml-5 mt-2">
            <li
              className="p-2 rounded-md hover:bg-gray-600 transition duration-200 cursor-pointer"
              onClick={() => handleMenuClick("userList")}
            >
              Lista de Usuarios
            </li>
          </ul>
        )}

        {/* Opción de Ajustes */}
        <li
          className="flex items-center justify-between p-2 rounded-md hover:bg-gray-700 transition duration-200 cursor-pointer"
          onClick={() => handleMenuClick("settings")}
        >
          <div className="flex items-center">
            <FaCogs className="mr-2" />
            Ajustes
          </div>
        </li>

        {/* Opción de Soporte */}
        <li
          className="flex items-center justify-between p-2 rounded-md hover:bg-gray-700 transition duration-200 cursor-pointer"
          onClick={() => handleSubMenuClick("support")}
        >
          <div className="flex items-center">
            <FaQuestionCircle className="mr-2" />
            Soporte
          </div>
          <span>{isSupportOpen ? "-" : "+"}</span>
        </li>
        {isSupportOpen && (
          <ul className="ml-5 mt-2">
            <li
              className="p-2 rounded-md hover:bg-gray-600 transition duration-200 cursor-pointer"
              onClick={() => handleMenuClick("contactSupport")}
            >
              Contactar Soporte
            </li>
          </ul>
        )}

        {/* Opción de Otros */}
        <li
          className="flex items-center justify-between p-2 rounded-md hover:bg-gray-700 transition duration-200 cursor-pointer"
          onClick={() => handleSubMenuClick("others")}
        >
          <div className="flex items-center">
            <FaFolder className="mr-2" />
            Servicios
          </div>
          <span>{isOthersOpen ? "-" : "+"}</span>
        </li>
        {isOthersOpen && (
          <ul className="ml-5 mt-2">
            <li
              className="p-2 rounded-md hover:bg-gray-600 transition duration-200 cursor-pointer"
              onClick={() => handleMenuClick("bank")}
            >
              Banco
            </li>
            <li
              className="p-2 rounded-md hover:bg-gray-600 transition duration-200 cursor-pointer"
              onClick={() => handleMenuClick("return")}
            >
              Hermandades
            </li>
            <li
              className="p-2 rounded-md hover:bg-gray-600 transition duration-200 cursor-pointer"
              onClick={() => handleMenuClick("promotions")}
            >
              Promociones
            </li>
            <li
              className="p-2 rounded-md hover:bg-gray-600 transition duration-200 cursor-pointer"
              onClick={() => handleMenuClick("return")}
            >
              Ruleta
            </li>
          </ul>
        )}
      </ul>

      {/* Opción de Logout */}
      <ul>
        <li
          className="flex items-center p-2 rounded-md hover:bg-gray-700 transition duration-200 cursor-pointer"
          onClick={handleReturnPage}
        >
          <FaSignOutAlt className="mr-2" />
          Volver
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
