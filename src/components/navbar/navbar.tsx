"use client";

import React from "react";
import "./style.css";
import Searcher from "../search/searcher";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const handleSearch = (query: string) => {
    console.log("Buscar:", query);
  };

  return (
    <div className="navbar">
      <header>
        <a className="logo-home" href="#">
          <img
            className="nav-small-image"
            src="./img/logos/logo.png"
            alt="Logo Primary World Of Warcraft"
          />
          <p className="title-server title-home">Wow Libre</p>
        </a>
      </header>
      <div className="searcher">
        <Searcher onSearch={handleSearch}></Searcher>
      </div>
      <div className="promotion">
        <a href="nav-promotion">
          <img
            className="image-promotion"
            src="./img/homes/promotion.png"
            alt=""
          />
        </a>
      </div>
      <div className="nav-ubication">
        <a className="text-white">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" size="lg" />
          Ingrese tu <br />
          ubicación
        </a>
      </div>
      <div className="nav-category">
        <nav className="category">
          <a className="category-link" href="#">
            Categorias
          </a>
          <a className="category-link" href="#">
            Comunidad
          </a>
          <a className="category-link" href="#">
            Historial
          </a>
          <a className="category-link" href="#">
            Vender
          </a>
          <a className="category-link" href="#">
            Ayuda
          </a>
        </nav>
      </div>
      <div className="auth">
        <nav className="nav-auth">
          <a className="nav-auth-category" href="#">
            Crea tu cuenta
          </a>
          <a className="nav-auth-category" href="#">
            Ingresa
          </a>
          <a className="nav-auth-category" href="#">
            Mis Compras
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
