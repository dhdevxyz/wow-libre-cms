"use client";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const banners = [
  {
    image:
      "https://static.wixstatic.com/media/5dd8a0_5811c889364640b6beb9511ebfa80c46~mv2.webp",
    alt: "banner advertising for discount",
  },
  {
    image:
      "https://static.wixstatic.com/media/5dd8a0_f5f5bcd55a3a4260ad852fb5c784a67f~mv2.webp",
    alt: "banner advertising for discount",
  },
];

const AdvertisingStore = () => {
  return (
    <div className="mt-4">
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        autoPlay={true}
        interval={9000}
        showThumbs={false}
        dynamicHeight={false}
        showIndicators={true}
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
                height: "100%",
                maxHeight: "35rem",
              }}
              className="rounded-2xl"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default AdvertisingStore;
