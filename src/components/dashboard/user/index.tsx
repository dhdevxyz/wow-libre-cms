import { getUsersAllServer, updateMail } from "@/api/dashboard/users";
import { AccountsServer } from "@/model/model";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UserActionModal from "./UserManagement";

interface UsersDashboardProps {
  token: string;
  serverId: number;
}

const UsersDashboard: React.FC<UsersDashboardProps> = ({ token, serverId }) => {
  const [users, setUsers] = useState<AccountsServer[]>([]);
  const [selectedUser, setSelectedUser] = useState<AccountsServer | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalElements, setTotalElements] = useState(0);

  const fetchData = async () => {
    try {
      const response = await getUsersAllServer(
        itemsPerPage,
        currentPage - 1,
        serverId,
        searchTerm,
        token
      );
      setUsers(response.accounts);
      setTotalElements(response.size);
    } catch (error) {
      Swal.fire(
        "Error",
        "No se pudieron obtener los usuarios. Inténtelo más tarde.",
        "error"
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage, searchTerm, token]);

  useEffect(() => {
    const totalPages =
      totalElements && itemsPerPage
        ? Math.ceil(totalElements / itemsPerPage)
        : 0;

    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalElements, itemsPerPage]);

  const handleRowClick = (user: AccountsServer) => {
    setSelectedUser(user);
  };

  const fillEmptyRows = () => {
    const emptyRows = itemsPerPage - users.length;
    return Array.from({ length: emptyRows }, (_, i) => (
      <tr
        key={`empty-row-${i}`}
        className="h-10 bg-transparent border-none pointer-events-none"
        aria-hidden="true"
      >
        <td colSpan={9} className="border-none"></td>
      </tr>
    ));
  };

  return (
    <div className="bg-black text-gray-300 p-4 sm:p-6 rounded-lg shadow-lg h-full overflow-hidden">
      <h1 className="text-center text-2xl sm:text-3xl font-extrabold mb-4 sm:mb-6 text-blue-400">
        Usuarios Registrados
      </h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar usuario por el email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 text-sm sm:text-lg rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="overflow-x-auto">
        {selectedUser && (
          <UserActionModal
            selectedUser={selectedUser}
            onClose={() => setSelectedUser(null)}
            serverId={serverId}
            token={token}
            fetchData={fetchData}
            banned={selectedUser.banned}
          />
        )}

        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="px-4 py-2 text-left whitespace-nowrap">ID</th>
              <th className="px-4 py-2 text-left whitespace-nowrap">
                Username
              </th>
              <th className="px-4 py-2 text-left whitespace-nowrap">Email</th>
              <th className="px-4 py-2 text-left whitespace-nowrap">Online</th>
              <th className="px-4 py-2 text-left whitespace-nowrap">Muteado</th>
              <th className="px-4 py-2 text-left whitespace-nowrap">Baneado</th>
              <th className="px-4 py-2 text-left whitespace-nowrap">
                Última Conexión
              </th>
              <th className="px-4 py-2 text-left whitespace-nowrap">
                Fallos de Login
              </th>
              <th className="px-4 py-2 text-left whitespace-nowrap">
                Última IP
              </th>
              <th className="px-4 py-2 text-left whitespace-nowrap">OS</th>
              <th className="px-4 py-2 text-left whitespace-nowrap">
                Expansión
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                onClick={() => handleRowClick(user)}
                className={`${
                  index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                } hover:bg-gray-500 cursor-pointer transition`}
              >
                <td className="px-4 py-2 text-left border-b border-gray-700">
                  {user.id}
                </td>
                <td className="px-4 py-2 text-left border-b border-gray-700">
                  {user.username}
                </td>
                <td className="px-4 py-2 text-left border-b border-gray-700">
                  {user.email}
                </td>
                <td className="px-4 py-2 text-left border-b border-gray-700">
                  <span
                    className={`inline-block w-6 h-6 rounded-full ${
                      user.online ? "bg-green-500" : "bg-red-500"
                    }`}
                    title={user.online ? "Online" : "Offline"}
                  ></span>
                </td>
                <td className="px-4 py-2 text-left border-b border-gray-700">
                  <span
                    className={`inline-block w-6 h-6 rounded-full ${
                      user.mute ? "bg-green-500" : "bg-red-500"
                    }`}
                    title={user.mute ? "Silenciado" : "Activo"}
                  ></span>
                </td>
                <td className="px-4 py-2 text-left border-b border-gray-700">
                  <span
                    className={`inline-block w-6 h-6 rounded-full ${
                      user.banned ? "bg-green-500" : "bg-red-500"
                    }`}
                    title={user.banned ? "Baneado" : "Sin Banear"}
                  ></span>
                </td>
                <td className="px-4 py-2 text-left border-b border-gray-700">
                  {user.last_ip}
                </td>
                <td className="px-4 py-2 text-left border-b border-gray-700">
                  {user.failed_logins}
                </td>
                <td className="px-4 py-2 text-left border-b border-gray-700">
                  {user.last_ip}
                </td>
                <td className="px-4 py-2 text-left border-b border-gray-700">
                  {user.os}
                </td>
                <td className="px-4 py-2 text-left border-b border-gray-700">
                  {user.expansion}
                </td>
              </tr>
            ))}
            {fillEmptyRows()}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center sm:mt-4 min-h-[60px]">
        <div className="mb-2 sm:mb-0">
          <label htmlFor="itemsPerPage" className="mr-2">
            Mostrar:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
            className="px-2 py-1 sm:py-2 rounded bg-gray-800 text-gray-400"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || totalElements === 0}
            className="px-2 sm:px-3 py-1 sm:py-2 rounded bg-gray-700 text-gray-400 hover:bg-gray-600 disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-xl sm:text-2xl text-gray-300">
            Página {totalElements > 0 ? currentPage : 0} de{" "}
            {Math.ceil(totalElements / itemsPerPage)}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(totalElements / itemsPerPage))
              )
            }
            disabled={
              currentPage === Math.ceil(totalElements / itemsPerPage) ||
              totalElements === 0
            }
            className="px-2 sm:px-3 py-1 sm:py-2 rounded bg-gray-700 text-gray-400 hover:bg-gray-600 disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersDashboard;
