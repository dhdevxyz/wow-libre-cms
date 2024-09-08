import Link from "next/link";
import React, { useState } from "react";

const NavbarMinimalist = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="flex flex-col md:flex-row items-center justify-between w-full p-5 box-border mt-10 relative">
      <div className="flex flex-col items-center w-full md:w-auto md:flex-row md:items-center">
        <Link
          className="flex flex-col items-center md:flex-row md:items-center"
          href="/"
        >
          <img
            className="max-w-[15%] md:max-w-[10%]"
            src="/img/logos/logo.png"
            alt="Logo Primary World Of Warcraft"
          />
          <p className="text-white text-4xl md:text-4xl pl-4 pt-6  md:mt-6 md:pt-0 title-server text-center md:text-left">
            Wow Libre
          </p>
        </Link>
      </div>

      <button
        className="md:hidden absolute left-5 top-10 text-white text-5xl"
        onClick={toggleMenu}
      >
        ☰
      </button>

      <nav
        className={`md:flex items-center pt-5 ${
          isMenuOpen ? "block" : "hidden"
        } md:block`}
      >
        <Link
          className="flex items-center text-white text-2xl md:text-3xl hover:bg-gray-700 px-6 py-3 rounded-lg transition duration-300"
          href="/"
        >
          <p className="">Inicio</p>
        </Link>
        <Link
          className="flex items-center text-white text-2xl md:text-3xl hover:bg-gray-700 px-6 py-3 rounded-lg transition duration-300"
          href="/"
        >
          <p className="">Hermandades</p>
        </Link>
        <Link
          className="flex items-center text-white text-2xl md:text-3xl hover:bg-gray-700 px-6 py-3 rounded-lg transition duration-300"
          href="/"
        >
          <p className="">Banco</p>
        </Link>
        <Link
          className="flex items-center text-white text-2xl md:text-3xl hover:bg-gray-700 px-6 py-3 rounded-lg transition duration-300"
          href="/"
        >
          <p className="">Tienda</p>
        </Link>
        <Link
          className="flex items-center text-white text-2xl md:text-3xl hover:bg-gray-700 px-6 py-3 rounded-lg transition duration-300"
          href="/"
        >
          <p className="">Comunidad</p>
        </Link>
        <Link
          className="flex items-center text-white text-2xl md:text-3xl hover:bg-gray-700 px-6 py-3 rounded-lg transition duration-300"
          href="/help"
        >
          <p className="">Support</p>
        </Link>
      </nav>
    </header>
  );
};

export default NavbarMinimalist;
