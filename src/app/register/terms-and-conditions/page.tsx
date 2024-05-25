"use client";

import PageCounter from "@/components/register/counter";
import NavbarMinimalist from "@/components/register/navbar";
import TitleWow from "@/components/title";
import React, { ChangeEvent, useState } from "react";
import "../style.css";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const TermsAndConditions = () => {
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState({
    option1: false,
    option2: false,
  });

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSelectedOptions({
      ...selectedOptions,
      [name]: checked,
    });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedOptions.option1 || !selectedOptions.option2) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, selecciona todas las opciones.",
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }
    router.push("/register/account-ingame");
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
          description="¡Bienvenido a Wow Libre! Aceptar nuestras opciones te permite 
          sumergirte en una experiencia personalizada llena de ofertas exclusivas, 
          noticias emocionantes y mucho más."
        />

        <form
          className="register-container-form pt-5"
          onSubmit={handleFormSubmit}
        >
          <div className="form-group-flex-row">
            <input
              type="checkbox"
              name="option1"
              checked={selectedOptions.option1}
              onChange={handleCheckboxChange}
            />
            <label
              htmlFor="countrySelect"
              className="ml-2 register-container-form-label"
            >
              El correo de la cuenta recibirá ofertas especiales, noticias y
              demás de Wow Libre
            </label>
          </div>

          <div className="form-group-flex-row">
            <input
              type="checkbox"
              name="option2"
              checked={selectedOptions.option2}
              onChange={handleCheckboxChange}
              className=""
            />
            <span className="ml-2 register-container-form-label register-widget-20">
              He leído y acepto lo siguiente:{" "}
              <a href="/login" className="underline">
                Términos y condiciones
              </a>
            </span>
          </div>

          <PageCounter currentSection={4} totalSections={7} />
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

export default TermsAndConditions;
