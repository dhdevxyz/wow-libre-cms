import { getUsersAllServer, updateMail } from "@/api/dashboard/users";
import { AccountsServer } from "@/model/model";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface UsersDashboardProps {
  token: string;
  serverId: number;
}

const UsersDashboard: React.FC<UsersDashboardProps> = ({ token, serverId }) => {
  const [users, setUsers] = useState<AccountsServer[]>([]);
  const [selectedUser, setSelectedUser] = useState<AccountsServer | null>(null);
  const [editedEmail, setEditedEmail] = useState("");
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
    setEditedEmail(user.email);
  };

  const handleSaveEmail = async () => {
    if (selectedUser) {
      try {
        await updateMail(editedEmail, selectedUser.username, serverId, token);
        Swal.fire(
          "Éxito",
          "El correo ha sido actualizado correctamente.",
          "success"
        );
        setSelectedUser(null);
        setEditedEmail("");
        fetchData(); // Refrescar datos
      } catch (error) {
        Swal.fire(
          "Error",
          "No se pudo actualizar el correo. Inténtelo de nuevo.",
          "error"
        );
      }
    }
  };

  const handleBanUser = async () => {
    if (selectedUser) {
      try {
        // Aquí deberías llamar a la API correspondiente para banear al usuario.
        const updatedUsers = users.map((user) =>
          user.id === selectedUser.id ? { ...user, banned: true } : user
        );
        setUsers(updatedUsers);
        Swal.fire("Éxito", "El usuario ha sido baneado.", "success");
        setSelectedUser(null);
      } catch (error) {
        Swal.fire("Error", "No se pudo banear al usuario.", "error");
      }
    }
  };

  const handleMuteUser = async () => {
    if (selectedUser) {
      try {
        // Aquí deberías llamar a la API correspondiente para silenciar al usuario.
        const updatedUsers = users.map((user) =>
          user.id === selectedUser.id ? { ...user, muted: true } : user
        );
        setUsers(updatedUsers);
        Swal.fire("Éxito", "El usuario ha sido silenciado.", "success");
        setSelectedUser(null);
      } catch (error) {
        Swal.fire("Error", "No se pudo silenciar al usuario.", "error");
      }
    }
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
    <div className="bg-gray-900 text-gray-300 p-6 rounded-lg shadow-lg">
      <h1 className="text-center text-3xl font-extrabold mb-6 text-blue-400">
        Usuarios Registrados
      </h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar usuarios..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {selectedUser && (
        <div className="bg-gray-800 p-4 rounded-lg mb-4 border border-blue-400">
          <h2 className="text-xl font-bold mb-2 text-blue-400">
            Editar Usuario
          </h2>
          <div className="flex items-center space-x-4 text-gray-400">
            <span>ID: {selectedUser.id}</span>
            <span>Username: {selectedUser.username}</span>
          </div>
          <div className="mt-2">
            <label htmlFor="email" className="block text-sm mb-1 text-gray-400">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mt-4 flex justify-between space-x-2">
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setSelectedUser(null);
                  setEditedEmail("");
                }}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEmail}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
              >
                Guardar
              </button>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleBanUser}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition"
              >
                Banear
              </button>
              <button
                onClick={handleMuteUser}
                className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-500 transition"
              >
                Silenciar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabla de usuarios */}
      <div
        className="overflow-x-auto"
        style={{ height: "670px", overflowY: "auto" }}
      >
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-800 text-gray-400">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Username</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Online</th>
              <th className="px-4 py-2 text-left">Muteado</th>
              <th className="px-4 py-2 text-left">Última Conexión</th>
              <th className="px-4 py-2 text-left">Fallos de Login</th>
              <th className="px-4 py-2 text-left">Última IP</th>
              <th className="px-4 py-2 text-left">OS</th>
              <th className="px-4 py-2 text-left">Expansión</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                onClick={() => handleRowClick(user)}
                className={`${
                  index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                } hover:bg-gray-600 cursor-pointer transition`}
              >
                <td className="px-4 py-2 border-b border-gray-600">
                  {user.id}
                </td>
                <td className="px-4 py-2 border-b border-gray-600">
                  {user.username}
                </td>
                <td className="px-4 py-2 border-b border-gray-600">
                  {user.email}
                </td>
                <td className="px-4 py-2 border-b pl-10 border-gray-600">
                  <span
                    className={`inline-block w-6 h-6 rounded-full ${
                      user.online ? "bg-green-600" : "bg-red-600"
                    }`}
                    title={user.online ? "Online" : "Offline"}
                  ></span>
                </td>
                <td className="px-4 py-2 border-b pl-10 border-gray-600">
                  <span
                    className={`inline-block w-6 h-6 rounded-full ${
                      user.mute ? "bg-red-600" : "bg-green-600"
                    }`}
                    title={user.mute ? "Silenciado" : "Activo"}
                  ></span>
                </td>
                <td className="px-4 py-2 border-b border-gray-600">
                  {user.last_ip}
                </td>
                <td className="px-4 py-2 border-b border-gray-600">
                  {user.failed_logins}
                </td>
                <td className="px-4 py-2 border-b border-gray-600">
                  {user.last_ip}
                </td>
                <td className="px-4 py-2 border-b border-gray-600">
                  {user.os}
                </td>
                <td className="px-4 py-2 border-b border-gray-600">
                  {user.expansion}
                </td>
              </tr>
            ))}
            {fillEmptyRows()}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <label htmlFor="itemsPerPage" className="mr-2">
            Mostrar:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
            className="px-2 py-1 rounded bg-gray-800 text-gray-400"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || totalElements === 0}
            className="px-3 py-1 rounded bg-gray-700 text-gray-400 hover:bg-gray-600 disabled:opacity-50"
          >
            Anterior
          </button>
          <span>
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
            className="px-3 py-1 rounded bg-gray-700 text-gray-400 hover:bg-gray-600 disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersDashboard;
