"use client";

import { sendMail } from "@/api/account";
import { validateMail } from "@/api/account/security";
import NavbarAuthenticated from "@/components/navbar-authenticated";
import { useUserContext } from "@/context/UserContext";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

interface ValidationResult {
  success: boolean;
  message: string;
}

const ConfirmOtpAccount: React.FC = () => {
  const [validationResult, setValidationResult] =
    useState<ValidationResult | null>(null);
  const [isMail, setMail] = useState<string | null>("");
  const { user, setUser } = useUserContext();
  const router = useRouter();
  const token = Cookies.get("token");
  const { t } = useTranslation();

  const handleConfirmEmail = async () => {
    if (!token) {
      router.push("/");
      return;
    }

    try {
      await sendMail(token);
      Swal.fire({
        title: t("account.validation-mail.title-success"),
        text: t("account.validation-mail.message-success"),
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: t("account.validation-mail.title-error"),
        text: error.message,
        confirmButtonText: "Aceptar",
      });
    }
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get("code");
    const codeEmail = urlParams.get("email");

    setMail(codeEmail);
    if (!user.pending_validation) {
      router.push("/accounts");
    }

    if (codeParam && token && user.pending_validation) {
      const validateOtp = async () => {
        try {
          await validateMail(token, codeParam);
          setValidationResult({
            success: true,
            message: "✅ OTP validado con éxito",
          });
          if (user) {
            setUser({
              ...user,
              pending_validation: false,
            });
          }
        } catch (error) {
          setValidationResult({
            success: false,
            message: "❌ Error al validar el OTP",
          });
        }
      };

      validateOtp();
    }
  }, []);

  return (
    <div className="contenedor bg-midnight text-white ">
      <NavbarAuthenticated />

      <section className="flex items-center justify-center my-20 md:my-40 px-4">
        <div className="bg-gray-800 rounded-xl shadow-xl p-8 max-w-lg w-11/12 sm:w-full text-center">
          {validationResult ? (
            <div className="flex flex-col items-center space-y-8">
              {validationResult.success ? (
                <svg
                  className="w-16 h-16 text-green-500 animate-bounce"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4"
                  />
                </svg>
              ) : (
                <svg
                  className="w-16 h-16 text-red-500 animate-shake"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" />
                  <line
                    x1="15"
                    y1="9"
                    x2="9"
                    y2="15"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="9"
                    y1="9"
                    x2="15"
                    y2="15"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              )}

              <h2 className="text-xl sm:text-2xl font-bold">
                {validationResult.message}
              </h2>

              {validationResult.success ? (
                <p className="text-gray-300 text-sm sm:text-base">
                  🎉 ¡Felicidades! Tu cuenta ya está validada y lista para usar.
                  Ahora puedes disfrutar de todos nuestros servicios sin
                  restricciones.
                </p>
              ) : (
                <p className="text-gray-300 text-sm sm:text-base">
                  ⚠️ Tu código de seguridad es válido por solo{" "}
                  <span className="font-semibold text-yellow-400">
                    30 minutos
                  </span>
                  . Asegúrate de ingresar el código correcto enviado a{" "}
                  <span className="font-semibold text-blue-400">{isMail}</span>.
                  Si no lo ves en tu bandeja de entrada, revisa la carpeta de
                  spam.
                </p>
              )}

              {validationResult.success ? (
                <button
                  className="bg-green-500 hover:bg-green-600 transition px-6 py-3 rounded-lg font-medium text-white w-full sm:w-auto"
                  onClick={() => router.push("/accounts")}
                >
                  Ir a mis cuentas 🚀
                </button>
              ) : (
                <button
                  className="bg-red-500 hover:bg-red-600 transition px-6 py-3 rounded-lg font-medium text-white w-full sm:w-auto"
                  onClick={handleConfirmEmail}
                >
                  Reenviar OTP 🔄
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center my-20 md:my-40 px-4">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ConfirmOtpAccount;
