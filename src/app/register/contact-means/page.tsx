"use client";

import PageCounter from "@/components/utilities/counter";
import NavbarMinimalist from "@/components/navbar-minimalist";
import TitleWow from "@/components/utilities/serverTitle";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../style.css";
import { existEmail, existPhone } from "@/api/account/exist-email";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Footer from "@/components/footer";

const ContactMeans = () => {
  const { user, setUser } = useUserContext();
  const [email, setEmail] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const router = useRouter();
  const { t } = useTranslation();

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("register.error.email-empty"),
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }

    if (!isValidEmail(email)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("register.error.email-invalid"),
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }

    try {
      const [emailResponse] = await Promise.all([existEmail(email)]);

      if (emailResponse.exist) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: t("register.error.email-exist"),
          color: "white",
          background: "#0B1218",
          timer: 43500,
        });

        return;
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }

    if (user) {
      setUser({
        ...user,
        email: email,
        cell_phone: cellPhone,
      });
    }
    router.push("/register/terms-and-conditions");
  };

  const handleVolverClick = () => {
    router.back();
  };

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setCellPhone(user.cell_phone || "");
    }
  }, [setUser]);

  return (
    <div className="contenedor register">
      <NavbarMinimalist />

      <div className="register-container">
        <TitleWow
          title={t("register.title-server-sub-title")}
          description={t(
            "register.section-page.contact-means.title-server-message"
          )}
        />

        <form className="register-container-form" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label
              htmlFor="emailInput"
              className="mb-2 register-container-form-label"
            >
              {t("register.section-page.contact-means.input.email-text")}
            </label>

            <input
              className="mb-3 w-full px-4 py-2 border rounded-md text-black register-input"
              type="email"
              id="emailInput"
              placeholder={t(
                "register.section-page.contact-means.input.email-text-place-holder"
              )}
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="phoneInput"
              className="mb-2 register-container-form-label"
            >
              {t("register.section-page.contact-means.input.phone-text")}{" "}
              (Optional)
            </label>
            <PhoneInput
              country={"us"}
              value={cellPhone}
              onChange={(value) => setCellPhone(value)}
              inputClass="!w-full !text-black !rounded-md"
              containerClass="!mb-3 !w-full"
              buttonClass="!bg-gray-200 !rounded-l-md"
              inputStyle={{
                width: "100%",
                paddingLeft: "58px",
              }}
              inputProps={{ id: "phoneInput" }}
              dropdownClass="custom-dropdown"
            />
          </div>

          <PageCounter currentSection={3} totalSections={5} />
          <button
            className="text-white px-5 py-5 rounded-md mt-8 button-register"
            type="submit"
          >
            {t("register.section-page.contact-means.button.btn-primary")}
          </button>
          <button
            className="text-white px-5 py-5 rounded-md mt-8 button-register"
            type="button"
            onClick={handleVolverClick}
          >
            {t("register.section-page.contact-means.button.btn-secondary")}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ContactMeans;
