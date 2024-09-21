"use client";
import { recoverPassword, validateOtp } from "@/api/account/security";
import NavbarMinimalist from "@/components/navbar-minimalist";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

const ChangePassword = () => {
  const [currentForm, setCurrentForm] = useState("reset");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", ""]);
  const router = useRouter();

  const handleFormChange = (formType: string) => {
    setCurrentForm(formType);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await recoverPassword(email);
      setSuccessMessage("Correo enviado. Revisa tu bandeja de entrada.");
      handleFormChange("additional");
    } catch (err: any) {
      setError(err.message || "Error al enviar el correo.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    const otpCode = otp.join("");

    try {
      await validateOtp(email, otpCode);
      setSuccessMessage("OTP verificado correctamente.");
      Swal.fire({
        icon: "success",
        title: "Contraseña restablecida",
        text: `Se te envió una contraseña temporal al correo electrónico.`,
        color: "white",
        background: "#0B1218",
        willClose: () => {
          router.push("/login");
        },
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
    } catch (err: any) {
      setError(err.message || "Error al verificar el OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    setLoading(false);
    setError(null);
    setSuccessMessage(null);
    handleFormChange("reset");
  };

  return (
    <div className="contenedor">
      <NavbarMinimalist />
      <div className="antialiased flex items-center justify-center p-4 mt-24 mb-16">
        <div className="max-w-8xl w-full bg-gray-800 p-8 md:p-12 rounded-xl shadow shadow-slate-300 flex flex-col md:flex-row">
          {/* Form Section */}
          <div className="w-full md:w-1/3 md:pr-8 mt-10">
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

                <form onSubmit={handleSubmit} className="my-10">
                  <div className="flex flex-col space-y-5 mt-20">
                    <label htmlFor="email">
                      <p className="font-medium text-white pb-2">
                        Dirección de correo electrónico
                      </p>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                        placeholder="Introduce tu correo electrónico"
                        required
                      />
                    </label>

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {successMessage && (
                      <p className="text-green-500 text-sm">{successMessage}</p>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
                      disabled={loading}
                    >
                      {loading ? "Enviando..." : "Restablecer"}
                    </button>
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

                <form onSubmit={handleOtpSubmit} className="my-10">
                  <div className="flex flex-col space-y-5 mt-10">
                    <p className="font-medium text-white pb-6">
                      Código de seguridad
                    </p>

                    <div className="flex justify-center space-x-2">
                      {otp.map((value, index) => (
                        <label key={index} htmlFor={`otp-${index}`}>
                          <input
                            id={`otp-${index}`}
                            name={`otp-${index}`}
                            type="text"
                            maxLength={1}
                            className="py-4 px-2 w-16 text-xl md:text-2xl text-center border font-bold border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 hover:shadow"
                            value={value}
                            onChange={(e) =>
                              handleOtpChange(index, e.target.value)
                            }
                            placeholder="-"
                          />
                        </label>
                      ))}
                    </div>
                    {error && <p className="text-red-500 text-lg">{error}</p>}

                    <button
                      type="submit"
                      className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
                    >
                      {loading ? "Enviando..." : "Validar OTP"}
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleBackClick();
                      }}
                      className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center mt-4"
                    >
                      <span>Volver</span>
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Image Section */}
          <div className="w-full md:w-2/3 flex items-center justify-center mt-8 md:mt-0 select-none">
            <img
              src="https://i.postimg.cc/Jnfb0TWJ/businessman-designing-a-website-by-coding-on-a-desktop-computer-images-for-web-banners-free-vector-r.png"
              alt="Ilustración de Restablecer Contraseña"
              className="rounded-lg w-full md:w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
