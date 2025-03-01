"use client";
import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="contenedor pt-10 sm:pt-16">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-8 xl:space-y-0">
          <div className="sm:order-2 mt-8 grid grid-cols-1 gap-8 xl:gap-12 xl:col-span-2 text-center sm:text-left">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h4 className="text-lg leading-5 font-semibold tracking-wider text-gray-400 uppercase">
                  {t("footer.terms-and-conditions")}
                </h4>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="#"
                      className="text-lg leading-6 text-gray-300 hover:text-gray-100 transition duration-150 ease-in-out"
                    >
                      {t("footer.terms-of-use")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-lg leading-6 text-gray-300 hover:text-gray-100 transition duration-150 ease-in-out"
                    >
                      {t("footer.privacy-policy")}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="sm:order-1 space-y-8 xl:space-y-0 text-center sm:text-left">
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex justify-center sm:justify-start space-x-6">
                <a
                  href="https://www.facebook.com/WowLibre/"
                  target="_blank"
                  className="text-gray-400 hover:text-gray-300 transition duration-150 ease-in-out"
                >
                  <span className="sr-only">Facebook</span>
                  <img
                    className="h-8 w-8"
                    src="../img/footer/facebook.webp"
                    alt="Facebook Icon"
                  />
                </a>
                <a
                  href="https://www.tiktok.com/@wowlibre?lang=es"
                  target="_blank"
                  className="text-gray-400 hover:text-gray-300 transition duration-150 ease-in-out"
                >
                  <span className="sr-only">Instagram</span>
                  <img
                    className="h-8 w-8"
                    src="../img/footer/instagram.webp"
                    alt="Instagram Icon"
                  />
                </a>
                <a
                  href="https://chat.whatsapp.com/BDELJKhuJkWIMKxF8ExIdN"
                  target="_blank"
                  className="text-gray-400 hover:text-gray-300 transition duration-150 ease-in-out"
                >
                  <span className="sr-only">WhatsApp</span>
                  <img
                    className="h-8 w-8"
                    src="../img/footer/whatsapp.webp"
                    alt="WhatsApp Icon"
                  />
                </a>
                <a
                  target="_blank"
                  className="text-gray-400 hover:text-gray-300 transition duration-150 ease-in-out"
                  href="https://t.me/wowlibreservers"
                >
                  <span className="sr-only">Telegram</span>
                  <img
                    className="h-8 w-8"
                    src="../img/footer/telegram.webp"
                    alt="Telegram Icon"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
        <div className="text-center md:text-left text-base leading-6 text-gray-400">
          <p className="text-2xl mb-10">{t("footer.about")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
