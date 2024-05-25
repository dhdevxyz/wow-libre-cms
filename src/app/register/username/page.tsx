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
import { RegisterData } from "@/model/model";
import { register } from "@/api/account/register";
import LoadingSpinner from "@/components/loading-spinner";

const crypto = require("crypto");

const AccountIngame = () => {
  const { user, setUser, clearUserData } = useUserContext(); // Obteniendo el contexto y funciones del contexto
  const [userName, setUsername] = useState("");
  const router = useRouter();
  const { computeVerifier, params } = require(`trinitycore-srp6`);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    if (userName.trim().length < 5 || userName.trim().length > 20) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La contraseña debe ser superior a 5 caracteres e inferior a 20 caracteres.",
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
      return;
    }
    setIsSubmitting(true);

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
          : new Date().toISOString()
        : new Date().toISOString();

      const requestBody: RegisterData = {
        username: userName,
        salt: Buffer.from(salt).toString("hex"),
        verifier: Buffer.from(verifier).toString("hex"),
        country: user.country,
        date_of_birth: formattedDateOfBirth,
        first_name: user.first_name,
        last_name: user.last_name,
        cell_phone: user.cell_phone,
        email: user.email,
        password: decryptPassword(user.password_web),
      };

      const registrationResult = await register(requestBody);

      if (registrationResult.code == 201) {
        router.push(`/congrats?email=${user?.email}&username=${userName}`);
        clearUserData();
      } else if (registrationResult.code == 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Bad Request",
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
        text: "Ocurrió un error al intentar registrar los datos.",
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
    } finally {
      setIsSubmitting(false);
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
          description="Este nombre será tu identidad pública. Podrás cambiarlo una vez de manera gratuita."
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
              type="text"
              placeholder="Ingrese un usuario"
              value={userName}
              onChange={handleUserNameChange}
            />
          </div>
          {isSubmitting && (
            <div className="mb-4 text-center">
              <LoadingSpinner />{" "}
              <p className="mt-4 text-gray-600 text-lg">Creando cuenta...</p>
            </div>
          )}
          <PageCounter currentSection={7} totalSections={7} />
          <button
            className=" text-white px-5 py-5 rounded-md mt-8 button-register"
            type="submit"
            disabled={isSubmitting}
          >
            Continuar
          </button>
          <button
            className="text-white px-5 py-5 rounded-md mt-8 button-register"
            type="button"
            onClick={handleVolverClick}
            disabled={isSubmitting}
          >
            Volver
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountIngame;
