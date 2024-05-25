"use client";
import NavbarMinimalist from "@/components/register/navbar";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import "./style.css";

const Congrats = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const username = searchParams.get("username");

  useEffect(() => {
    const createSnowflake = () => {
      const snowflake = document.createElement("div");
      snowflake.className = "snowflake";
      snowflake.textContent = "❄";
      snowflake.style.left = `${Math.random() * 100}vw`;
      snowflake.style.animationDuration = `${Math.random() * 5 + 3}s`; // Velocidad de caída ajustada
      snowflake.style.opacity = Math.random().toString();
      snowflake.style.fontSize = `${Math.random() * 24 + 12}px`; // Tamaño del copo de nieve ajustado
      snowflake.style.color = "rgba(173, 216, 230, 0.8)"; // Color azul claro
      snowflake.style.transform = `rotate(${Math.random() * 360}deg) scale(${
        Math.random() * 1.5 + 0.5
      })`; // Rotación y escala

      document.body.appendChild(snowflake);

      setTimeout(() => {
        snowflake.remove();
      }, 8000); // Tiempo ajustado para remover el copo de nieve
    };

    const interval = setInterval(createSnowflake, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className=" contenedor">
      <NavbarMinimalist />
      <div className="congrats">
        <div className="congrats-container">
          <img
            src="/img/congrats/pngegg.png"
            alt="Ejemplo"
            className="congrats-img-large "
          />
          <div className="congrats-content">
            <img
              src="/img/logos/logo.png"
              alt="Ejemplo"
              className="congrats-img"
            />

            <h2 className="title">
              Bienvenido a <br /> la comunidad libre
            </h2>

            <div className="account-info text-white">
              <p className="text-2xl md:text-4xl lg:text-3xl xl:text-2xl pb-5">
                ¡Te damos la más cordial bienvenida a nuestra comunidad! Estamos
                encantados de tenerte aquí y queremos que sepas que todos
                nuestros servicios son completamente gratuitos.
              </p>
              <p className="mt-2 text-2xl md:text-3xl lg:text-4xl xl:text-3xl pb-10">
                Detalles de la cuenta creada:
              </p>
              <p className="account-email text-2xl md:text-4xl lg:text-3xl xl:text-2xl">
                Email: {email}
              </p>
              <p className="account-username   text-2xl md:text-4xl lg:text-3xl xl:text-2xl">
                Nombre de usuario: {username}
              </p>
              <button
                className="download-button  text-white text-lg md:text-xl lg:text-2xl xl:text-2xl "
                type="button"
              >
                Descargar Cliente
              </button>
              <button
                className="download-button  text-white text-lg md:text-xl lg:text-2xl xl:text-2xl  "
                type="button"
              >
                Comprar Pase de batalla
              </button>
            </div>
            <p className="text-white mt-10 text-lg md:text-xl lg:text-1xl xl:text-1xl">
              World of Warcraft® and Blizzard Entertainment® are all trademarks
              or registered trademarks of Blizzard Entertainment in the United
              States and/or other countries. These terms and all related
              materials, logos, and images are copyright © Blizzard
              Entertainment. This site is in no way associated with or endorsed
              by Blizzard Entertainment®.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Congrats;
