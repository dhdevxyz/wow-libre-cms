"use client";

import { getProducts } from "@/api/store";
import NavbarAuthenticated from "@/components/navbar-authenticated";
import AdvertisingStore from "@/components/store/banners";
import { CategoryDetail } from "@/model/model";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const Store = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<{
    [key: string]: CategoryDetail[];
  }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setCategories(productsData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSelectItem = (id: string) => {
    router.push(`/store/${id}`);
  };

  return (
    <div className="contenedor">
      <NavbarAuthenticated />
      <div className="mt-14">
        <AdvertisingStore />
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center mt-4">
          <p className="text-white">Cargando productos...</p>
        </div>
      )}

      <nav className="w-full  flex items-center justify-start bg-gray-800 text-white mt-10 mb-10">
        {Object.keys(categories).map((category) => (
          <a
            key={category}
            href={`#${category}`}
            className="hover:text-gray-300 px-4 py-5 hover:bg-gray-700 transition duration-200 ease-in-out font-serif  text-3xl text-yellow-500"
          >
            {category}
          </a>
        ))}
      </nav>

      {Object.entries(categories).map(([categoryName, categoryDetails]) => (
        <div
          key={categoryName}
          id={categoryName}
          className="pt-20 bg-gray-800  "
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0 md:w-1/3 flex flex-col justify-center text-center max-w-md mx-auto space-y-4">
                <div>
                  <h2 className="text-4xl font-bold text-white mb-4">
                    {categoryName}
                  </h2>
                  <p className="text-gray-400 text-xl font-semibold">
                    {categoryDetails[0]?.disclaimer}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap md:w-2/3 gap-4 mb-10 cursor-pointer">
                {categoryDetails[0]?.products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-gray-800 hover:bg-gray-700 relative p-4 rounded-lg shadow-lg w-full sm:w-1/2 lg:w-1/3 xl:w-1/3 flex flex-col transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    style={{ height: "450px" }}
                    onClick={() => handleSelectItem(product.reference_number)}
                  >
                    {product.discount > 0 && (
                      <span className="absolute top-4 right-4 bg-orange-500 text-white text-lg font-semibold px-2 py-1 rounded-full animate-pulse shadow-lg">
                        ¡{product.discount}% de descuento!
                      </span>
                    )}

                    <img
                      src={product.img_url}
                      alt={`Image ${product.id}`}
                      className="w-full h-1/2 object-cover rounded-md mb-4 transition-transform duration-300 "
                    />

                    <div className="flex flex-col flex-grow">
                      <p className="text-white mb-2 text-3xl leading-tight font-bold hover:text-orange-300 transition-colors duration-300">
                        {product.name}
                      </p>
                      <p className="text-gray-400 mb-2 text-xl leading-tight">
                        {product.disclaimer}
                      </p>
                      <p className="text-orange-300 mb-2 text-2xl mt-3">
                        {product.category}
                      </p>
                      <p className="text-gray-400 mb-2 text-lg">
                        {product.partner}
                      </p>
                      <div className="mt-auto">
                        {product.discount > 0 ? (
                          <>
                            {product.gambling_money === false ? (
                              <>
                                <p
                                  className="text-orange-300 font-bold"
                                  style={{ fontSize: "1.5rem" }}
                                >
                                  ${product.price} USD
                                </p>
                                <p className="line-through text-gray-500">
                                  ${product.price} USD
                                </p>
                              </>
                            ) : (
                              <>
                                <p
                                  className="text-orange-300 font-bold"
                                  style={{ fontSize: "1.5rem" }}
                                >
                                  ${product.gold_price} Gold
                                </p>
                                <p className="line-through text-gray-500">
                                  ${product.gold_price} Gold
                                </p>
                              </>
                            )}
                          </>
                        ) : (
                          <p
                            className="text-gray-300 font-bold"
                            style={{ fontSize: "1.5rem" }}
                          >
                            {product.gambling_money === false
                              ? `$${product.price} USD`
                              : `$${product.gold_price} Gold`}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Store;
