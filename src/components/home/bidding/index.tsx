"use client";
import React from "react";
import "./style.css";
import "react-multi-carousel/lib/styles.css";
import MultiCarousel from "../carrousel-multiple";

const Bidding = () => {
  const images = [
    { src: "https://via.placeholder.com/500x600", alt: "Producto 5" },
    { src: "https://via.placeholder.com/500x600", alt: "Producto 6" },
    { src: "https://via.placeholder.com/500x600", alt: "Producto 4" },
    { src: "https://via.placeholder.com/500x600", alt: "Producto 3" },
  ];
  const responsive = {
    desktop: {
      breakpoint: { max: 800, min: 1024 },
      items: 1, // Muestra 2 elementos a la vez
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1, // Muestra 2 elementos a la vez
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1, // Muestra 1 elemento a la vez en dispositivos móviles
    },
  };
  return (
    <div>
      <div className="bidding-primary contenedor">
        <div className="bidding-day">
          <div className="bidding-day-title">
            <h3>Oferta del dia</h3>
          </div>
          <div className="bidding-day-image">
            <img src="https://via.placeholder.com/200x300" alt="" />
          </div>
          <div className="bidding-day-content">
            <p>Samsing Galaxy</p>
            <p className="bidding-day-price">$ 20000</p>
            <a href="#" className="bidding-day-disclaimer">
              Envio Gratis{" "}
            </a>
            <button>comprar</button>
          </div>
        </div>
        <div className="bidding-offert">
          <div>
            <h3>Ofertas</h3>
          </div>
          <MultiCarousel />
        </div>
      </div>
    </div>
  );
};

export default Bidding;
