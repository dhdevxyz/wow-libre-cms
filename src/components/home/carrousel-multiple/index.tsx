"use client";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const MultiCarousel = () => {
  const items = [
    { id: 1, image: "https://via.placeholder.com/100x100", title: "Item 1" },
    { id: 2, image: "https://via.placeholder.com/100x100", title: "Item 2" },
    { id: 3, image: "https://via.placeholder.com/100x100", title: "Item 3" },
    { id: 4, image: "https://via.placeholder.com/100x100", title: "Item 4" },
    { id: 5, image: "https://via.placeholder.com/100x100", title: "Item 5" },
  ];

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
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
  return (
    <div>
      <div>
        <Carousel responsive={responsive}>
          {items.map((item) => (
            <div key={item.id}>
              <img src={item.image} alt={item.title} />
              <p>{item.title}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
export default MultiCarousel;
