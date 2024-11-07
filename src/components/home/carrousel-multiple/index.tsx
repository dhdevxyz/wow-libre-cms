"use client";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useRouter } from "next/navigation";
import { Product } from "@/model/model";
import { getProductsDiscount } from "@/api/store";
import LoadingSpinner from "@/components/utilities/loading-spinner";

const MultiCarousel = () => {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsWithDiscount = await getProductsDiscount();
        setProducts(productsWithDiscount);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchProducts();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const handleSelectItem = (id: string) => {
    router.push(`/store/${id}`);
  };

  return (
    <div className="rounded-2xl p-4 ">
      <div>
        <h3 className="text-start pl-4 text-2xl text-white lg:text-3xl mt-3">
          ¡Ofertas Imperdibles en Productos con Descuento!
        </h3>
      </div>
      {error ? (
        <div className="flex items-center justify-center h-full mt-20">
          <LoadingSpinner />
        </div>
      ) : products.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <LoadingSpinner />
        </div>
      ) : (
        <Carousel
          className="max-h-[50rem] max-w-[80rem]"
          responsive={responsive}
          autoPlay={false}
          autoPlaySpeed={3000}
          infinite={true}
          slidesToSlide={1}
          transitionDuration={500}
        >
          {products.map((product) => (
            <div
              className="flex flex-col m-4 rounded-lg overflow-hidden p-4 hover:bg-gray-600 transition-all"
              key={product.id}
              onClick={() => handleSelectItem(product.reference_number)}
            >
              <div className="relative">
                <img
                  src={product.img_url}
                  alt={product.name}
                  className="w-full h-[20rem] object-cover transition duration-300 hover:opacity-75"
                />
              </div>
              <div className="mt-2">
                <p className="text-lg text-[#f6a001] mt-2 lg:text-4xl mb-4 pt-4">
                  {product.name}
                </p>
                <p className="text-lg text-gray-200  md:text-xl lg:text-2xl xl:text-xl">
                  {product.category}
                </p>

                {product.gambling_money ? (
                  <p className="text-lg text-[#6396f3] pt-9 lg:text-3xl">
                    {product.discounted_gold_price}g
                  </p>
                ) : (
                  <p className="text-lg text-[#6396f3]  pt-9 lg:text-2xl">
                    ${product.discounted_price} USD
                  </p>
                )}

                <p className="text-lg text-[#7fff00] pt-2 lg:text-2xl">
                  {product.disclaimer.length > 30
                    ? `${product.disclaimer.slice(0, 30)}...`
                    : product.disclaimer}
                </p>
                <button className="w-full mt-8 bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all text-lg">
                  Comprar
                </button>
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default MultiCarousel;
