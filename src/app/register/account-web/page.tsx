"use client";

import PageCounter from "@/components/register/counter";
import NavbarMinimalist from "@/components/register/navbar";
import TitleWow from "@/components/title";
import { useUserContext } from "@/context/UserContext";
import { encryptPassword } from "@/security";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import "../style.css";

const AccountIngame = () => {
  const { user, setUser } = useUserContext(); // Obteniendo el contexto y funciones del contexto
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Nuevo estado para la confirmación de contraseña
  const router = useRouter();

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Las contraseñas no coinciden",
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }

    if (!password.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La contraseña está vacía.",
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }

    if (password.trim().length < 5 || password.trim().length > 30) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La contraseña debe ser superior a 5 caracteres e inferior a 30 caracteres.",
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }

    if (user) {
      setUser({
        ...user,
        password_web: encryptPassword(password),
      });
    }
    router.push("/register/username");
  };

  const handleVolverClick = () => {
    router.back();
  };

  return (
    <div className="contenedor register">
      <NavbarMinimalist />

      <div className="register-container">
        <TitleWow
          title=" Registrarme en "
          description="Protege tu cuenta y elige una contraseña segura para la web administrativa."
        />
        <form
          className="register-container-form pt-5"
          onSubmit={handleFormSubmit}
        >
          <div className="form-group">
            <label
              htmlFor="countrySelect"
              className="mb-2 register-container-form-label"
            >
              Contraseña para la web
            </label>

            <input
              className="mb-3 px-4 py-2 border rounded-md text-black register-input"
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="firstNameInput"
              className="mb-2 register-container-form-label"
            >
              Confirmar Contraseña
            </label>
            <input
              className="mb-3 px-4 py-2 border rounded-md text-black register-input"
              type="password"
              placeholder="Ingrese nuevamente su contraseña"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>

          <PageCounter currentSection={6} totalSections={7} />
          <button
            className=" text-white px-5 py-5 rounded-md mt-8 button-register"
            type="submit"
          >
            Continuar
          </button>
          <button
            className="text-white px-5 py-5 rounded-md mt-8 button-register"
            type="button" // Asegúrate de cambiar el tipo a "button"
            onClick={handleVolverClick} // Agrega el evento onClick
          >
            Volver
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountIngame;
