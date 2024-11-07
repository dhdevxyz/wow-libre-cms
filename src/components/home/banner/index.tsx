"use client";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const banners = [
  {
    image: "/img/homes/banner/banner_five.webp",
    alt: "Advertising banner for the game, showing arthas",
  },
  {
    image: "/img/homes/banner/banner_two.webp",
    alt: "World of warcraft game advertising banner",
  },
  {
    image: "/img/homes/banner/banner_three.webp",
    alt: "World of warcraft game advertising banner",
  },
  {
    image: "/img/homes/banner/banner_four.webp",
    alt: "World of warcraft game advertising banner",
  },
];

const Advertising = () => {
  return (
    <div className="mt-4">
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        autoPlay={true}
        interval={9000}
        showThumbs={false}
        dynamicHeight={false}
        showIndicators={false}
        showStatus={false}
        width={"100%"}
      >
        {banners.map((banner, index) => (
          <div
            key={index}
            className="relative"
            style={{
              width: "100%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <img
              src={banner.image}
              alt={banner.alt}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "50rem",
              }}
              className="rounded-lg"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Advertising;
