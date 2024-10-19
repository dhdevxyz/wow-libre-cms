"use client";

import { validateMail } from "@/api/account/security";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import NavbarAuthenticated from "@/components/navbar-authenticated";

interface ValidationResult {
  success: boolean;
  message: string;
}

const ConfirmOtpAccount: React.FC = () => {
  const [validationResult, setValidationResult] =
    useState<ValidationResult | null>(null);
  const [isMail, setMail] = useState<string | null>("");

  // Obtener los parámetros de la URL
  const searchParams = useSearchParams();

  const codeParam = searchParams.get("code");
  const codeEmail = searchParams.get("email");
  const token = Cookies.get("token");

  useEffect(() => {
    setMail(codeEmail);

    if (codeParam && token) {
      const validateOtp = async () => {
        try {
          await validateMail(token, codeParam);
          return {
            success: true,
            message: "OTP validado con éxito",
          };
        } catch (error) {
          setValidationResult({
            success: false,
            message: "Error al validar el OTP",
          });
        }
      };

      validateOtp();
    }
  }, [searchParams]);

  return (
    <div className="contenedor">
      <NavbarAuthenticated />
      <div className="flex flex-col justify-center items-center">
        <div className="max-w-[720px] mx-auto">
          <div className="block mb-4 mx-auto border-b border-slate-300 pb-2 max-w-[460px] text-center p-10">
            <a className="block w-full px-4 py-2 text-center text-white transition-all select-none">
              ¡Estamos procesando! 🔍 Validando tu correo <b>{isMail}</b>,
              asegurándonos de que todo esté en orden. 🚀
            </a>
          </div>

          <div className="relative flex flex-col items-center text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 pb-10 mx-auto">
            <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-96 w-full">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc8-XMWUUpHfCZYVof-c5wYTeoY_wocnvFHQqo9FMs6cNF97rHPY_PgX1a2xHFpavEJiE&usqp=CAU"
                alt="card-image"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="block font-sans text-1xl antialiased font-medium leading-relaxed text-blue-gray-900">
                  {validationResult?.message}
                </p>
                <div className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      validationResult?.success ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></div>
                </div>
              </div>
              <p className="block font-sans text-xl antialiased font-normal leading-normal text-gray-700 opacity-75">
                ¡Atención! 🔐 Tu código de seguridad tiene una validez de solo
                30 minutos y ha sido enviado a tu correo electrónico registrado.
                Si no lo ves en tu bandeja de entrada, te recomendamos revisar
                la carpeta de spam. ¡No pierdas tiempo, el reloj está corriendo!
                ⏳
              </p>
            </div>
            <div className="p-6 pt-0">
              <button
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-md hover:shadow-lg focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-500 text-white shadow-md hover:bg-blue-600 hover:scale-105 focus:scale-105 active:scale-100"
                type="button"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOtpAccount;
