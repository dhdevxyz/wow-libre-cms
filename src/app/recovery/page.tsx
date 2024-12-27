"use client";
import {
  recoverPassword,
  validateRecoverPassword,
} from "@/api/account/security";
import NavbarMinimalist from "@/components/navbar-minimalist";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

const ChangePassword = () => {
  const [currentForm, setCurrentForm] = useState("reset");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", ""]);
  const router = useRouter();
  const { t } = useTranslation();
  const { user } = useUserContext();
  const language = user.language;

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
      setSuccessMessage(t("reset-password.section-one.success-message"));
      handleFormChange("additional");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value.toLocaleUpperCase();
    setOtp(newOtp);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    const otpCode = otp.join("");

    try {
      await validateRecoverPassword(email, otpCode, language);
      setSuccessMessage("Success");
      Swal.fire({
        icon: "success",
        title: t("reset-password.section-two.title-success"),
        text: t("reset-password.section-two.success-message"),
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
      setError(err.message);
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
                  {t("reset-password.section-one.title")}
                </h1>
                <p className="text-slate-400 text-xl">
                  {t("reset-password.section-one.sub-title")}
                </p>

                <form onSubmit={handleSubmit} className="my-10">
                  <div className="flex flex-col space-y-5 mt-20">
                    <label htmlFor="email">
                      <p className="font-medium text-white pb-2">
                        {t("reset-password.section-one.var-mail")}
                      </p>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                        placeholder={t(
                          "reset-password.section-one.var-mail-placeholder"
                        )}
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
                      {loading
                        ? t("reset-password.section-one.btn.send")
                        : t("reset-password.section-one.btn.txt")}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h1 className="text-3xl md:text-4xl font-medium text-white">
                  {t("reset-password.section-two.title")}
                </h1>
                <p className="text-slate-400 text-xl">
                  {t("reset-password.section-two.sub-title")}
                </p>

                <form onSubmit={handleOtpSubmit} className="my-10">
                  <div className="flex flex-col space-y-5 mt-10">
                    <p className="font-medium text-white pb-6">
                      {t("reset-password.section-two.disclaimer")}
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
                      {loading
                        ? t("reset-password.section-two.btn.send")
                        : t("reset-password.section-two.btn.txt")}
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleBackClick();
                      }}
                      className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center mt-4"
                    >
                      <span>{t("reset-password.section-two.btn.return")}</span>
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Image Section */}
          <div className="w-full md:w-2/3 flex items-center justify-center mt-8 md:mt-0 select-none aspect-[19/9]">
            <img
              src="https://turtle-wow.org/build/assets/turtlewow_unreal_barrens-BkxjrNvE.webp"
              alt="Ilustración de Restablecer Contraseña"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
