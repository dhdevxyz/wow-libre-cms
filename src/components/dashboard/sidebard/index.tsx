import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaChartBar,
  FaCogs,
  FaFolder,
  FaSignOutAlt,
  FaUsers,
} from "react-icons/fa";

const Sidebar: React.FC<{ onOptionChange: (option: string) => void }> = ({
  onOptionChange,
}) => {
  const [isUsersOpen, setUsersOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const router = useRouter();

  const handleMenuClick = (menu: string) => {
    setSelectedOption(menu);
    onOptionChange(menu);
  };
  const handleReturnPage = () => {
    router.push("/servers");
    setSelectedOption("");
  };
  return (
    <div
      className="bg-gray-800 text-white w-72 h-full p-5 pt-20 shadow-xl fixed top-0 left-0 
                 hidden md:block"
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-400">Gestión</h3>
      <ul>
        <li
          className={`flex items-center p-3 rounded-md hover:bg-gray-700 cursor-pointer ${
            selectedOption === "dashboard" ? "bg-gray-600" : ""
          }`}
          onClick={() => handleMenuClick("dashboard")}
        >
          <FaChartBar className="mr-2" />
          Dashboard
        </li>

        <li
          className="flex items-center justify-between p-3 rounded-md hover:bg-gray-700 cursor-pointer"
          onClick={() => setUsersOpen(!isUsersOpen)}
        >
          <div className="flex items-center">
            <FaUsers className="mr-2" />
            Usuarios
          </div>
          <span>{isUsersOpen ? "-" : "+"}</span>
        </li>
        {isUsersOpen && (
          <ul className="ml-6 mt-2">
            <li
              className="p-2 rounded-md hover:bg-gray-600 cursor-pointer"
              onClick={() => handleMenuClick("users")}
            >
              Lista de Usuarios
            </li>
          </ul>
        )}

        <li
          className={`flex items-center p-3 rounded-md hover:bg-gray-700 cursor-pointer ${
            selectedOption === "bank" ? "bg-gray-600" : ""
          }`}
          onClick={() => handleMenuClick("bank")}
        >
          <FaFolder className="mr-2" />
          Banco
        </li>
        <li
          className={`flex items-center p-3 rounded-md hover:bg-gray-700 cursor-pointer ${
            selectedOption === "promotions" ? "bg-gray-600" : ""
          }`}
          onClick={() => handleMenuClick("promotions")}
        >
          <FaCogs className="mr-2" />
          Promociones
        </li>
        <li
          className={`flex items-center p-3 rounded-md hover:bg-gray-700 cursor-pointer ${
            selectedOption === "settings" ? "bg-gray-600" : ""
          }`}
          onClick={() => handleMenuClick("settings")}
        >
          <FaCogs className="mr-2" />
          Ajustes
        </li>

        <li
          className={`flex items-center p-2 rounded-md hover:bg-gray-700 transition duration-200 cursor-pointer ${
            selectedOption === "returnPage" ? "bg-gray-600" : ""
          }`}
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
