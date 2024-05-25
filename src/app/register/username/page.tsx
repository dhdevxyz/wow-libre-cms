"use client";

import PageCounter from "@/components/register/counter";
import NavbarMinimalist from "@/components/register/navbar";
import TitleWow from "@/components/title";
import { useUserContext } from "@/context/UserContext";
import { decryptPassword, encryptPassword } from "@/security";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import "../style.css";

const crypto = require("crypto");

const AccountIngame = () => {
  const { user, setUser, clearUserData } = useUserContext(); // Obteniendo el contexto y funciones del contexto
  const [userName, setUsername] = useState("");
  const router = useRouter();
  const { computeVerifier, params } = require(`trinitycore-srp6`);

  const handleUserNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userName.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ingrese un usuario.",
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
      return;
    }

    if (userName.trim().length < 5 || userName.trim().length > 40) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La contraseña debe ser superior a 5 caracteres e inferior a 40 caracteres.",
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
      return;
    }

    if (user) {
      setUser({
        ...user,
        username: userName,
      });
    }

    const salt = crypto.randomBytes(32);

    const verifier = computeVerifier(
      params.trinitycore,
      Buffer.from(salt),
      userName.toUpperCase(),
      decryptPassword(user.password).toUpperCase()
    );

    try {
      const userDateOfBirth = user.date_of_birth;

      const formattedDateOfBirth = userDateOfBirth
        ? !isNaN(new Date(userDateOfBirth).getTime())
          ? new Date(userDateOfBirth).toISOString().split("T")[0]
          : undefined
        : undefined;

      const requestBody: RegistrationData = {
        username: userName,
        salt: Buffer.from(salt).toString("hex"),
        verifier: Buffer.from(verifier).toString("hex"),
        country: user?.country,
        date_of_birth: formattedDateOfBirth,
        first_name: user?.first_name,
        last_name: user?.last_name,
        cell_phone: user?.cell_phone,
        email: user?.email,
        password: decryptPassword(user?.password_web || ""),
      };

      const registrationResult = await registerUser(requestBody);

      if (registrationResult.code == 201) {
        router.push(`/congrats?email=${user?.email}`);
        clearUserData();
      } else if (registrationResult.code == 400) {
        const errorResponse = convertToErrorBadRequest(registrationResult);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${
            errorResponse.message
          }: ${errorResponse.data.valuesInvalid.join(", ")}`,
          color: "white",
          background: "#0B1218",
          timer: 4500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            registrationResult.message ||
            "Ocurrió un error al intentar registrar los datos.",
          color: "white",
          background: "#0B1218",
          timer: 4500,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocurrió un error al intentar registrar los datos2.",
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
    }
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
          description="Protege tu cuenta y elige una contraseña segura para el juego."
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
              Usuario
            </label>

            <input
              className="mb-3 px-4 py-2 border rounded-md text-black register-input"
              type="password"
              placeholder="Ingrese un usuario"
              value={userName}
              onChange={handleUserNameChange}
            />
          </div>

          <PageCounter currentSection={7} totalSections={7} />
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
