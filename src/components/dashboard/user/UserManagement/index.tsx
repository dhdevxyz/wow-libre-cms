import { banAccount, updateMail } from "@/api/dashboard/users";
import { InternalServerError } from "@/dto/generic";
import { AccountsServer } from "@/model/model";
import { useState } from "react";
import Swal from "sweetalert2";

interface BanData {
  banDate: string;
  banReason: string;
  gmName: string;
}

interface UserActionModalProps {
  selectedUser: AccountsServer | null;
  onClose: () => void;
  serverId: number;
  token: string;
  fetchData: () => void;
  banned: boolean;
}

export default function UserActionModal({
  selectedUser,
  onClose,
  serverId,
  token,
  fetchData,
  banned,
}: UserActionModalProps) {
  const [editedEmail, setEditedEmail] = useState(selectedUser?.email || "");
  const [banReason, setBanReason] = useState("");
  const [banDays, setBanDays] = useState(0);
  const [banHours, setBanHours] = useState(0);
  const [banMinutes, setBanMinutes] = useState(0);
  const [password, setPassword] = useState("");
  const [banSeconds, setBanSeconds] = useState(0);
  const [gmName, setGmName] = useState("");
  const [actionType, setActionType] = useState<"edit" | "ban">("edit");

  const handleSaveEmail = async () => {
    if (!isValidEmail(editedEmail)) {
      Swal.fire(
        "Error",
        "Por favor, ingrese un correo electrónico válido.",
        "error"
      );
      return;
    }

    if (selectedUser) {
      try {
        await updateMail(editedEmail, selectedUser.username, serverId, token);
        Swal.fire(
          "Éxito",
          "El correo ha sido actualizado correctamente.",
          "success"
        );
        fetchData();
        onClose();
      } catch (error: any) {
        if (error instanceof InternalServerError) {
          Swal.fire({
            icon: "error",
            title: "Opss!",
            html: `
                  <p><strong>Message:</strong> ${error.message}</p>
                  <hr style="border-color: #444; margin: 8px 0;">
                  <p><strong>Transaction ID:</strong> ${error.transactionId}</p>
                `,
            color: "white",
            background: "#0B1218",
          });
          return;
        }
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.message}`,
          color: "white",
          background: "#0B1218",
          timer: 4000,
        });
      }
    }
  };

  const handleBanUser = async () => {
    if (!password || !gmName || !banReason) {
      Swal.fire("Error", "Por favor, ingrese los campos.", "error");
      return;
    }

    if (selectedUser) {
      try {
        await banAccount(
          selectedUser.username,
          banDays,
          banHours,
          banMinutes,
          banSeconds,
          gmName,
          banReason,
          password,
          serverId,
          token
        );

        Swal.fire("Éxito", "El usuario ha sido baneado.", "success");
        fetchData();
      } catch (error: any) {
        if (error instanceof InternalServerError) {
          Swal.fire({
            icon: "error",
            title: "Opss!",
            html: `
                  <p><strong>Message:</strong> ${error.message}</p>
                  <hr style="border-color: #444; margin: 8px 0;">
                  <p><strong>Transaction ID:</strong> ${error.transactionId}</p>
                `,
            color: "white",
            background: "#0B1218",
          });
          return;
        }
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.message}`,
          color: "white",
          background: "#0B1218",
          timer: 4000,
        });
      }
    }
  };

  const handleSubmit = () => {
    if (actionType === "edit") {
      handleSaveEmail();
    } else if (actionType === "ban") {
      handleBanUser();
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const isBanDisabled =
    actionType === "ban" &&
    ((banDays === 0 &&
      banHours === 0 &&
      banMinutes === 0 &&
      banSeconds === 0) || // Debe haber al menos una duración
      banReason.trim() === "" || // La razón no puede estar vacía
      gmName.trim() === "" || // El nombre del GM es obligatorio
      password.trim() === ""); // La contraseña es obligatoria

  // Validación para "Editar Usuario"
  const isEditDisabled = actionType === "edit" && editedEmail.trim() === ""; // El email no puede estar vacío

  return (
    selectedUser && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-gray-800 p-8 rounded-lg border border-blue-400 w-[90%] max-w-3xl">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">
            {actionType === "edit" ? "Editar Usuario" : "Banear Usuario"}
          </h2>

          <div className="flex flex-col space-y-3 text-gray-400 text-lg">
            <span>
              <strong>ID:</strong> {selectedUser.id}
            </span>
            <span>
              <strong>Username:</strong> {selectedUser.username}
            </span>
          </div>

          {actionType === "edit" && (
            <div className="mt-4">
              <label className="block text-lg mb-2 text-gray-400">Email:</label>
              <input
                type="email"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}

          {actionType === "ban" && (
            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-lg mb-2 text-gray-400">
                  Duración del Ban:
                </label>

                <div className="flex space-x-2">
                  <div className="flex flex-col items-center">
                    <input
                      type="number"
                      min="0"
                      pattern="^[0-9]*$"
                      value={banDays}
                      onChange={(e) => setBanDays(Number(e.target.value))}
                      className="w-20 px-4 py-3 rounded-lg bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-red-400 
    appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      placeholder="0"
                    />
                    <span className="text-sm text-gray-400 mt-1">Dias</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <input
                      type="number"
                      min="0"
                      value={banHours}
                      onChange={(e) => setBanHours(Number(e.target.value))}
                      className="w-20 px-4 py-3 rounded-lg bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-red-400 
                      appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      placeholder="0"
                    />
                    <span className="text-sm text-gray-400 mt-1">Horas</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <input
                      type="number"
                      min="0"
                      value={banMinutes}
                      onChange={(e) => setBanMinutes(Number(e.target.value))}
                      className="w-20 px-4 py-3 rounded-lg bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-red-400 
    appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      placeholder="0"
                    />
                    <span className="text-sm text-gray-400 mt-1">Minutos</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <input
                      type="number"
                      min="0"
                      value={banSeconds}
                      onChange={(e) => setBanSeconds(Number(e.target.value))}
                      className="w-20 px-4 py-3 rounded-lg bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-red-400 
    appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      placeholder="0"
                    />
                    <span className="text-sm text-gray-400 mt-1">Segundos</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-lg mb-2 text-gray-400">
                  Razón:
                </label>
                <textarea
                  value={banReason}
                  onChange={(e) => setBanReason(e.target.value)}
                  className="w-full px-4 py-3 text-lg rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
              <div>
                <label className="block text-lg mb-2 text-gray-400">
                  Nombre GM:
                </label>
                <input
                  type="text"
                  value={gmName}
                  onChange={(e) => setGmName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
              <div>
                <label className="block text-lg mb-2 text-gray-400">
                  Password:
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-col md:flex-row justify-between space-y-3 md:space-y-0 md:space-x-4">
            <div className="flex space-x-2">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition text-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className={`px-6 py-3 rounded-lg text-lg ${
                  actionType === "ban"
                    ? "bg-red-600 hover:bg-red-500 text-white"
                    : "bg-blue-600 hover:bg-blue-500 text-white"
                } ${
                  isBanDisabled || isEditDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={actionType === "ban" ? isBanDisabled : isEditDisabled}
              >
                {actionType === "edit" ? "Guardar" : "Confirmar Baneo"}
              </button>
            </div>

            <div className="flex space-x-2">
              {!banned && (
                <button
                  onClick={() => setActionType("ban")}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 transition text-lg"
                >
                  Banear
                </button>
              )}
              <button
                onClick={() => setActionType("edit")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition text-lg"
              >
                Editar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
