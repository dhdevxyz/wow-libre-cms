"use client";

import PageCounter from "@/components/register/counter";
import NavbarMinimalist from "@/components/navbar-minimalist";
import TitleWow from "@/components/utilities/serverTitle";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import "../style.css";
import { registerAccountGame } from "@/api/account/register";
import LoadingSpinner from "@/components/utilities/loading-spinner";
const crypto = require("crypto");
import Cookies from "js-cookie";
import NavbarAuthenticated from "@/components/navbar-authenticated";
import Footer from "@/components/footer";
import { useTranslation } from "react-i18next";
import useAuth from "@/hook/useAuth";

const AccountIngame = () => {
  const { user } = useUserContext();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const { computeVerifier, params } = require(`trinitycore-srp6`);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const jwt = Cookies.get("token");
  const { t } = useTranslation();

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  useAuth(t("errors.message.expiration-session"));

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("register.errors.password-game-no-matches"),
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
        text: t("register.errors.password-game-empty"),
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
        text: t("register.errors.password-game-invalid-length"),
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }
    setIsSubmitting(true);

    try {
      const salt = crypto.randomBytes(32);

      const verifier = computeVerifier(
        params.trinitycore,
        Buffer.from(salt),
        user.username.toUpperCase(),
        password.toUpperCase()
      );

      await registerAccountGame(
        {
          username: user.username,
          salt: Buffer.from(salt).toString("hex"),
          verifier: Buffer.from(verifier).toString("hex"),
        },
        jwt
      );

      router.push("/accounts");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
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
    <div className="contenedor ">
      <NavbarAuthenticated />
      <div className="register-container register">
        <TitleWow
          title={t("register.title-server-sub-title")}
          description={t(
            "register.section-page.finaly-create-account-gam.title-server-message"
          )}
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
              {t(
                "register.section-page.finaly-create-account-game.password-txt"
              )}
            </label>

            <input
              className="mb-3 px-4 py-2 border rounded-md text-black register-input"
              type="password"
              placeholder={t(
                "register.section-page.finaly-create-account-game.password-placeholder"
              )}
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="firstNameInput"
              className="mb-2 register-container-form-label"
            >
              {t(
                "register.section-page.finaly-create-account-game.confirm-password-txt"
              )}
            </label>
            <input
              className="mb-3 px-4 py-2 border rounded-md text-black register-input"
              type="password"
              placeholder={t(
                "register.section-page.finaly-create-account-game.confirm-password-placeholder"
              )}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          {isSubmitting && (
            <div className="mb-4 text-center">
              <LoadingSpinner />{" "}
              <p className="mt-4 text-gray-600 text-lg">
                {t(
                  "register.section-page.finaly-create-account-game.loading-sniper-txt"
                )}
              </p>
            </div>
          )}
          <PageCounter currentSection={2} totalSections={2} />
          <button
            className=" text-white px-5 py-5 rounded-md mt-8 button-register"
            type="submit"
            disabled={isSubmitting}
          >
            {t(
              "register.section-page.finaly-create-account-game.button.btn-primary"
            )}
          </button>
          <button
            className="text-white px-5 py-5 rounded-md mt-8 button-register"
            type="button"
            disabled={isSubmitting}
            onClick={handleVolverClick}
          >
            {t(
              "register.section-page.finaly-create-account-game.button.btn-secondary"
            )}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AccountIngame;
