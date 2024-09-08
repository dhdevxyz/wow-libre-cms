"use client";
import React from "react";
import "./style.css";
import "react-multi-carousel/lib/styles.css";
import MultiCarousel from "../carrousel-multiple";

const Bidding = () => {
  return (
    <div>
      <div className="contenedor mt-10 ">
        <div className="text-center md:text-left">
          <h2 className="bidding-introduction-title title-server mb-4 text-lg md:text-xl lg:text-1xl xl:text-2xl">
            Ofertas
          </h2>
          <p className="bidding-introduction-description text-lg md:text-x2 lg:text-2xl xl:text-3xl">
            Encuentra las mejores promociones para ti.
          </p>
        </div>
        <div className="bidding-primary">
          <div className="bidding-day">
            <div className="bidding-day-title">
              <h3 className="text-xl md:text-x2 lg:text-3xl xl:text-3xl mt-4">
                Oferta del dia
              </h3>
            </div>
            <div className="bidding-day-image">
              <img
                src="https://i.ibb.co/j4BFfSb/NLH1-TYFS474-Z1682703162669.jpg"
                alt=""
                className="w-full transition duration-300 hover:opacity-75"
              />
            </div>
            <div className="bidding-day-content">
              <p className="bidding-day-content-product-title text-lg md:text-x2 lg:text-3xl xl:text-4xl mb-4">
                Dragon Comodo terrestre
              </p>
              <p className="bidding-day-content-product-description text-lg md:text-x2 lg:text-3xl xl:text-2xl mb-4">
                Montura
              </p>
              <p className="bidding-day-content-product-price text-lg md:text-x2 lg:text-3xl xl:text-3xl pt-4 mb-2">
                200g
              </p>
              <a
                href="#"
                className="bidding-day-content-product-disclaimer text-lg md:text-x2 lg:text-3xl xl:text-2xl"
              >
                Oferta disponible solo hoy
              </a>
              <button className="bidding-day-content-product-button">
                Comprar
              </button>
            </div>
          </div>
          <div className="bidding-offert">
            <MultiCarousel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bidding;
