"use client";

import React, { useEffect, useState } from "react";
import "./style.css";
import Searcher from "./search/searcher";
import Link from "next/link";
import NavbarAuth from "./auth";
import { useTranslation } from "react-i18next";
import { getAvailableCountries } from "@/api/country";
import LoadingSpinner from "../../utilities/loading-spinner";
import { useUserContext } from "@/context/UserContext";

const Navbar = () => {
  const { t } = useTranslation();
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const [languages, setLanguages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const apiResponse = await getAvailableCountries();
        const uniqueLanguages = Array.from(
          new Set(apiResponse.map((country) => country.language))
        );
        setLanguages(uniqueLanguages);
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (query: string) => {
    console.log("Buscar:", query);
  };

  const toggleLanguageDropdown = () => {
    setLanguageDropdown(!languageDropdown);
  };

  const changeLanguage = (language: string) => {
    if (user) {
      setUser({
        ...user,
        language: language,
      });
    }
    setLanguageDropdown(false);
  };

  return (
    <div className="navbar contenedor  text-white">
      <header>
        <Link className="logo-home flex items-center" href="/">
          <img
            className="nav-small-image"
            src="https://i.ibb.co/grsYmyj/logo.webp"
            alt="Logo WowLibre"
          />
          <p className="title-server title-home ml-2 text-xl font-bold">
            Wow Libre
          </p>
        </Link>
      </header>
      <div className="searcher flex-grow">
        <Searcher
          onSearch={handleSearch}
          placeHolder={t("navbar.search.place-holder")}
        ></Searcher>
      </div>
      <div className="promotion">
        <a href="nav-promotion">
          <img
            className="image-promotion"
            src="./img/homes/promotion.png"
            alt="Promotion"
          />
        </a>
      </div>
      {loading ? (
        <div className="nav-ubication relative">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="nav-ubication relative">
          <a
            className="cursor-pointer hover:text-gray-400 flex items-center"
            onClick={toggleLanguageDropdown}
          >
            {t("navbar.language")}
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </a>

          {languageDropdown && (
            <div className="absolute mt-10 right-0 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50">
              <ul className="text-white p-2">
                {languages.map((lang) => (
                  <li
                    key={lang}
                    className="cursor-pointer p-2 hover:bg-gray-700 rounded-md"
                    onClick={() => changeLanguage(lang)}
                  >
                    {lang.toUpperCase()}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="nav-category">
        <nav className="category flex space-x-4">
          <Link
            className="category-link hover:text-gray-400 font-serif"
            href="/guild"
          >
            {t("navbar.sections.position-one")}
          </Link>
          <Link
            className="category-link hover:text-gray-400 font-serif"
            href="/comunity"
          >
            {t("navbar.sections.position-two")}
          </Link>
          <Link
            className="category-link hover:text-gray-400 font-serif"
            href="/bank"
          >
            {t("navbar.sections.position-three")}
          </Link>
          <Link
            className="category-link hover:text-gray-400 font-serif"
            href="/store"
          >
            {t("navbar.sections.position-four")}
          </Link>
          <Link
            className="category-link hover:text-gray-400 font-serif"
            href="/help"
          >
            {t("navbar.sections.position-five")}
          </Link>
        </nav>
      </div>
      <div className="auth relative">
        <NavbarAuth />
      </div>
    </div>
  );
};

export default Navbar;
