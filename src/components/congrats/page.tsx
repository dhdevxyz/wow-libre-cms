"use client";

import "./style.css";

import NavbarAuthenticated from "@/components/navbar-authenticated";
import Footer from "@/components/footer";
import Link from "next/link";
import LoadingSpinner from "../utilities/loading-spinner";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Congrats = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const country = searchParams.get("country");
  const phone = searchParams.get("phone");
  const router = useRouter();
  const { t, ready } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ready) {
      setLoading(false);
    }
  }, [ready]);

  const handleLinkAccounts = () => {
    router.push("/accounts");
  };

  if (loading) {
    return (
      <div className="contenedor flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="contenedor">
      <NavbarAuthenticated />
      <div className="congrats md:mt-0 mt-5">
        <div className="congrats-container select-none">
          <img
            src="/img/congrats/pngegg.png"
            alt="Congratulations warrior"
            className="congrats-img-large select-none"
          />
          <div className="congrats-content">
            <img
              src="/img/logos/logo.webp"
              alt="WowLibre Logo"
              className="congrats-img select-none"
            />

            <h2 className="title">
              {t("register.section-page.congrats.message-welcome-part-one")}
              <br />
              {t("register.section-page.congrats.message-welcome-part-two")}
            </h2>

            <div className="account-info text-white">
              <p className="text-2xl md:text-4xl lg:text-3xl xl:text-2xl pb-5">
                {t("register.section-page.congrats.body-welcome")}
              </p>
              <p className="mt-2 text-2xl md:text-3xl lg:text-4xl xl:text-3xl pb-3 pt-5 font-bold">
                {t("register.section-page.congrats.title-details")}
              </p>

              {email && (
                <p className="account-text font-semibold text-2xl md:text-4xl lg:text-3xl xl:text-2xl">
                  Email: {email}
                </p>
              )}
              {country && (
                <p className="account-text font-semibold text-2xl md:text-4xl lg:text-3xl xl:text-2xl">
                  Country: {country}
                </p>
              )}
              {phone && (
                <p className="account-text font-semibold text-2xl md:text-4xl lg:text-3xl xl:text-2xl">
                  Phone: {phone}
                </p>
              )}
              <button
                className="download-button text-white text-lg md:text-xl lg:text-2xl xl:text-2xl"
                type="button"
                onClick={handleLinkAccounts}
              >
                {t("register.section-page.congrats.btn-txt-action-primary")}
              </button>
              <Link
                href="https://wowdl.net/es/client/World-of-Warcraft-3.3.5a.12340"
                target="_blank"
                rel="noopener noreferrer"
                className="download-button text-white text-lg md:text-xl lg:text-2xl xl:text-2xl"
                type="button"
              >
                {t("register.section-page.congrats.btn-txt-action-secondary")}
              </Link>
            </div>
            <p className="text-white mt-10 text-lg md:text-xl lg:text-1xl xl:text-1xl">
              {t("register.section-page.congrats.disclaimer")}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Congrats;
