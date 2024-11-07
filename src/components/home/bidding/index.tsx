"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import "react-multi-carousel/lib/styles.css";
import MultiCarousel from "../carrousel-multiple";
import { useRouter } from "next/navigation";
import { Product } from "@/model/model";
import { getProductOffert } from "@/api/store";

const Bidding = () => {
  const router = useRouter();

  const [products, setProducts] = useState<Product>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsWithDiscount = await getProductOffert();
        setProducts(productsWithDiscount);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="contenedor mx-auto mt-10">
      <div className="text-center md:text-left mb-8">
        <h2 className="text-3xl font-bold text-[#f6a001] mb-4">Ofertas</h2>
        <p className="text-lg text-white mb-2">
          Encuentra las mejores promociones para ti.
        </p>
      </div>
      <div className="bidding-primary flex flex-col md:flex-row justify-between">
        <div className="bidding-day bg-gradient-to-b from-[#27445f] to-[#161d2a] rounded-lg p-6 w-full max-w-md">
          <div className="bidding-day-title">
            <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-3xl mt-4">
              Oferta del día
            </h3>
          </div>
          <div className="bidding-day-image mb-4">
            <img
              src={products?.img_url}
              alt=""
              className="w-full h-96 object-cover rounded-md transition duration-300 hover:opacity-75"
            />
          </div>
          <div className="bidding-day-content text-left">
            <p className="bidding-day-content-product-title text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4">
              {products?.name}
            </p>
            <p className="bidding-day-content-product-description text-lg md:text-xl lg:text-2xl xl:text-xl mb-4">
              {products?.category}
            </p>
            <p className="bidding-day-content-product-price text-lg md:text-xl lg:text-2xl xl:text-2xl pt-4 mb-2">
              {products?.price}
            </p>
            <a className="bidding-day-content-product-disclaimer text-lg md:text-xl lg:text-2xl xl:text-xl mb-2 block">
              {products?.disclaimer}
            </a>
            <button className="w-full mt-4 bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all text-lg">
              Comprar
            </button>
          </div>
        </div>
        <div className="bidding-offert bg-gray-800 rounded-lg p-4 mt-6 md:mt-0">
          <MultiCarousel />
        </div>
      </div>
    </div>
  );
};

export default Bidding;
