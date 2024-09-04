"use client";
import NavbarMinimalist from "@/components/navbar-minimalist";
import Link from "next/link";
import React, { useState } from "react";

const ChangePassword = () => {
  const [currentForm, setCurrentForm] = useState("reset");
  const handleFormChange = (formType: string) => {
    setCurrentForm(formType);
  };

  return (
    <div className="contenedor">
      <NavbarMinimalist />
      <div className="antialiased flex items-center justify-center p-4 mt-10">
        <div className="max-w-8xl w-full bg-gray-800 p-8 md:p-12 rounded-xl shadow shadow-slate-300 flex flex-col md:flex-row">
          {/* Form Section */}
          <div className="w-full md:w-1/3 md:pr-8">
            {currentForm === "reset" ? (
              <>
                <h1 className="text-3xl md:text-4xl font-medium text-white">
                  Restablece tu Contraseña
                </h1>
                <p className="text-slate-400 text-xl">
                  Recupera el poder de tu cuenta y sigue tu épica aventura en
                  Azeroth. Completa el formulario a continuación para
                  restablecer tu contraseña y retoma tu estatus heroico en World
                  of Warcraft.
                </p>

                <form action="" className="my-10">
                  <div className="flex flex-col space-y-5 mt-20">
                    <label htmlFor="email">
                      <p className="font-medium text-white pb-2">
                        Email address
                      </p>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                        placeholder="Enter email address"
                      />
                    </label>

                    <button className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                        />
                      </svg>
                      <span>Restablecer</span>
                    </button>
                    <p className="text-center text-white">
                      ¿Aún no estás registrado?{" "}
                      <a
                        href="#"
                        className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
                      >
                        <Link href="/register">Registrarme</Link>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </span>
                      </a>
                    </p>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h1 className="text-3xl md:text-4xl font-medium text-white">
                  Verifica tu Código
                </h1>
                <p className="text-slate-400 text-xl">
                  Ingresa el código de seguridad que acabamos de enviar a tu
                  correo electrónico.
                </p>

                <form action="" className="my-10">
                  <div className="flex flex-col space-y-5 mt-20">
                    <label htmlFor="otp">
                      <p className="font-medium text-white pb-6">
                        Código de seguridad
                      </p>
                      <div className="flex justify-center space-x-2">
                        {Array.from({ length: 4 }).map((_, index) => (
                          <input
                            key={index}
                            id={`otp-${index}`}
                            name={`otp-${index}`}
                            type="text"
                            maxLength={1}
                            className=" py-4 px-2  w-28 text-xl md:text-2xl text-center border font-bold border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 hover:shadow"
                            placeholder="-"
                          />
                        ))}
                      </div>
                    </label>

                    <button className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                      <span>Validate OTP</span>
                    </button>
                  </div>
                </form>
              </>
            )}

            <div className="text-center mt-5">
              <button
                className="py-2 px-4 font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg"
                onClick={() =>
                  handleFormChange(
                    currentForm === "reset" ? "additional" : "reset"
                  )
                }
              >
                {currentForm === "reset"
                  ? "Show Additional Form"
                  : "Back to Reset Password"}
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-2/3 flex items-center justify-center mt-8 md:mt-0 select-none">
            <img
              src="https://i.ibb.co/JBDS19V/png-transparent-world-of-warcraft-mists-of-pandaria-tauren-chibi-chibi-chibi-video-game-fictional-ch.png"
              alt="Reset Password Illustration"
              className="rounded-lg w-full md:w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
