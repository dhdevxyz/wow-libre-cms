"use client";
import { getUser } from "@/api/account";
import { changePasswordUser } from "@/api/account/change-password";
import NavbarAuthenticated from "@/components/navbar-authenticated";
import LoadingSpinner from "@/components/utilities/loading-spinner";
import { useUserContext } from "@/context/UserContext";
import { InternalServerError } from "@/dto/generic";
import { UserDetailDto } from "@/model/model";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

const Profile = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const token = Cookies.get("token");
  const [isLoading, setIsLoading] = useState(true);
  const [userDetail, setUserDetail] = useState<UserDetailDto>();
  const [redirect, setRedirect] = useState(false);
  const { t } = useTranslation();
  const { clearUserData } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (token) {
          const userModel = await getUser(token);

          setUserDetail(userModel);
        } else {
          setRedirect(true);
        }
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Could not update password",
          color: "white",
          background: "#0B1218",
          timer: 4500,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

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
      if (error instanceof InternalServerError) {
        if (error.statusCode === 401) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: t("errors.message.expiration-session"),
            color: "white",
            background: "#0B1218",
            timer: 4000,
            willClose: () => {
              clearUserData();
              setRedirect(true);
            },
          });
          return;
        } else {
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
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.message}`,
          color: "white",
          background: "#0B1218",
        });
      }
    }
  };

  const isFormValid =
    oldPassword && newPassword && confirmPassword && oldPassword;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen min-w-full">
        <div className="flex flex-col items-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="contenedor">
      <div className="mb-10">
        <NavbarAuthenticated />
      </div>
      <div className="bg-gray-900 text-white flex flex-col items-center rounded-3xl shadow-lg overflow-visible pb-10 border border-gray-700">
        {/* Background Section */}
        <div
          className="relative w-full h-96 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://static.wixstatic.com/media/5dd8a0_86d8e9de3efb4e05a17969bbe8832a02~mv2.jpg')",
          }}
        >
          {/* Profile Picture */}
          <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-gray-800 shadow-lg hover:scale-105 transition-transform"
            />
          </div>
        </div>

        {/* User Info */}
        <div className="mt-16 text-center  p-4 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-2">
            {userDetail?.first_name} {userDetail?.last_name}
          </h1>
          <p className="text-gray-400 text-lg mb-4">{userDetail?.email}</p>
          <p className="text-gray-400 text-lg mb-2">
            {t("profile.input-date-birthdate")}{" "}
            {userDetail?.date_of_birth
              ? new Date(userDetail.date_of_birth).toLocaleDateString()
              : "No disponible"}
          </p>
          <p className="text-gray-400 text-lg">
            {t("profile.input-country")} {userDetail?.country}
          </p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 mt-6">
          <div className="text-center bg-gray-800 p-4 rounded-lg shadow-md">
            <p className="text-xl font-bold">0</p>
            <p className="text-gray-400 text-sm">
              {t("profile.label-accounts")}
            </p>
          </div>
          <div className="text-center bg-gray-800 p-4 rounded-lg shadow-md">
            <p className="text-xl font-bold">0</p>
            <p className="text-gray-400 text-sm">
              {t("profile.label-character")}
            </p>
          </div>
          <div className="text-center bg-gray-800 p-4 rounded-lg shadow-md">
            <p className="text-xl font-bold">0</p>
            <p className="text-gray-400 text-sm">
              {t("profile.label-servers")}
            </p>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-8 px-4 text-center">
          <p className="text-gray-300 text-lg max-w-md mx-auto">
            {t("profile.bio")}
          </p>
        </div>

        {/* Change Password Form */}
        <div className="mt-8 w-full max-w-md px-4">
          <h2 className="text-xl font-bold mb-4 text-center">
            {t("profile.title")}
          </h2>
          <form className="space-y-4" onSubmit={handleUpdatePassword}>
            <div>
              <label
                htmlFor="old-password"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                {t("profile.input-change-password")}
              </label>
              <input
                type="password"
                id="old-password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="new-password"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                {t("profile.input-new-change-password")}
              </label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                {t("profile.input-new-confirm-change-password")}
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={!isFormValid} // Deshabilitar si el formulario no es válido
              className={`w-full py-2 rounded-lg font-medium ${
                isFormValid
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-500 cursor-not-allowed"
              } transition-all`}
            >
              {t("profile.btn-update-password")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
