"use client";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const banners = [
  {
    image:
      "https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/blt3898bae7f9b7b4e9/667dca156711603624433800/WoW_6MoSubBundle_ShopHomepageBannerDesktop_1600x500.png?imwidth=1568&imdensity=1",
    alt: "Advertising banner for the game, showing arthas",
  },
  {
    image:
      "https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/bltc713caf08c25791b/66be84a4e72fee8b44083c79/WOW_11.0_TWW_LaunchBanners-Destruction_Battlenet_Desktop-1600x500_JL01.png?imwidth=1568&imdensity=1",
    alt: "World of warcraft game advertising banner",
  },
  {
    image:
      "https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/blt6287f65e481b52f2/66a0863fc528954ab56107a0/WoW_110_CosmicWeaponsCache_BnetShop_HeaderDesktop_1600x500.png?imwidth=1568&imdensity=1",
    alt: "World of warcraft game advertising banner",
  },
  {
    image:
      "https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/blt2451376352512b56/66215a652cc876b869bba996/WoW_10.2.7_VAS_Sale_Bnet_Home_Desktop_1600x500.png?imwidth=1568&imdensity=1",
    alt: "World of warcraft game advertising banner",
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
