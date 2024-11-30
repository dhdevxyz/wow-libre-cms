"use client";
import NavbarAuthenticated from "@/components/navbar-authenticated";
import React, { useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { changePasswordUser } from "@/api/account/change-password";

const Profile = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = Cookies.get("token");

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Passwords do not match!",
      });
      return;
    }

    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Authentication Error",
        text: "No token found, please log in again.",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await changePasswordUser(oldPassword, newPassword, token);

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      Swal.fire({
        icon: "success",
        title: "Password Updated",
        text: "Your password has been updated successfully!",
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message || "An error occurred while updating the password.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = oldPassword && newPassword && confirmPassword;

  return (
    <div className="contenedor">
      <div className="mb-10">
        <NavbarAuthenticated />
      </div>
      <div className="bg-gray-900 text-white flex flex-col items-center rounded-3xl shadow-lg overflow-hidden pb-10">
        {/* Background Section */}
        <div
          className="relative w-full h-96 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images8.alphacoders.com/126/1269084.jpg')",
          }}
        >
          {/* Profile Picture */}
          <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-gray-800 shadow-lg"
            />
          </div>
        </div>

        {/* User Info */}
        <div className="mt-16 text-center">
          <h1 className="text-2xl font-bold">John Doe</h1>
          <p className="text-gray-400">@johndoe</p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 mt-6">
          <div className="text-center">
            <p className="text-xl font-bold">0</p>
            <p className="text-gray-400 text-sm">Cuentas</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">0</p>
            <p className="text-gray-400 text-sm">Personajes</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">0</p>
            <p className="text-gray-400 text-sm">Servidores</p>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-8 px-4 text-center">
          <p className="text-gray-300 text-lg max-w-md mx-auto">
            Estamos en una versión beta. Actualmente, podrías encontrar algunos
            detalles o funcionalidades que no están del todo optimizadas.
            Contamos con las características mínimas mientras seguimos
            trabajando y creciendo para ofrecerte una mejor experiencia. 🌟
          </p>
        </div>

        {/* Change Password Form */}
        <div className="mt-8 w-full max-w-md px-4">
          <h2 className="text-xl font-bold mb-4 text-center">
            Change Password
          </h2>
          <form className="space-y-4" onSubmit={handleUpdatePassword}>
            <div>
              <label
                htmlFor="old-password"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Old Password
              </label>
              <input
                type="password"
                id="old-password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="new-password"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={!isFormValid} // Deshabilitar si el formulario no es válido
              className={`w-full py-2 rounded-lg font-medium ${
                isFormValid
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
