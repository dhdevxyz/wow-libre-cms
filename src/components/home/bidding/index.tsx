"use client";
import { getProductOffert } from "@/api/store";
import { Product } from "@/model/model";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "react-multi-carousel/lib/styles.css";
import MultiCarousel from "../carrousel-multiple";
import "./style.css";
import Link from "next/link";

const Bidding = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product>();

  const handleSelectItem = (id: string) => {
    router.push(`/store/${id}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsWithDiscount = await getProductOffert();
        setProducts(productsWithDiscount);
      } catch (err: any) {}
    };
    fetchProducts();
  }, []);

  return (
    <div className="contenedor mx-auto mt-10">
      <div className="text-center md:text-left mb-8">
        <h2 className="text-4xl  font-bold text-[#f6a001] title-server mb-4">
          {t("home-products.title")}
        </h2>
        <p className="text-xl text-white mb-2">{t("home-products.subtitle")}</p>
      </div>
      <div className="bidding-primary flex flex-col md:flex-row justify-between">
        <div className="bidding-day bg-gradient-to-b from-[#27445f] to-[#161d2a] rounded-lg p-6 w-full max-w-md">
          <div className="bidding-day-title">
            <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-3xl mt-4">
              {t("home-products.offer-day.title")}
            </h3>
          </div>
          <div className="bidding-day-image mb-4">
            <img
              src={products?.img_url || "https://i.ibb.co/k4kZ9Ng/boo-1.png"}
              alt="Product Max Discount"
              className="w-full h-96 object-cover rounded-md transition duration-300 hover:opacity-75"
            />
          </div>
          <div className="bidding-day-content text-left">
            <p className="bidding-day-content-product-title text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4">
              {products?.name}
            </p>
            <p className="text-lg md:text-xl lg:text-2xl xl:text-xl mb-4 text-gray-200">
              {products?.category}
            </p>
            {products && products?.gambling_money ? (
              <p className="bidding-day-content-product-price text-lg md:text-xl lg:text-2xl xl:text-2xl pt-4 mb-2">
                {products?.discounted_gold_price}
              </p>
            ) : (
              <p className="bidding-day-content-product-price text-lg md:text-xl lg:text-2xl xl:text-2xl pt-4 mb-2">
                $ {products?.discounted_price} USD
              </p>
            )}

            {products ? (
              <a className="bidding-day-content-product-disclaimer text-lg md:text-xl lg:text-2xl xl:text-xl mb-2 block">
                {products?.disclaimer}
              </a>
            ) : (
              <a className="bidding-day-content-product-disclaimer text-lg md:text-xl lg:text-2xl xl:text-xl mb-2 block">
                {t("home-products.offer-day.disclaimer")}
              </a>
            )}

            {products ? (
              <button
                onClick={() => handleSelectItem(products.reference_number)}
                className="w-full mt-4 bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all text-lg"
              >
                {t("home-products.offer-day.btn.primary")}
              </button>
            ) : (
              <Link href="/store" passHref>
                <button className="w-full mt-4 bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all text-2xl">
                  {t("home-products.offer-day.btn.alternative")}
                </button>
              </Link>
            )}
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
