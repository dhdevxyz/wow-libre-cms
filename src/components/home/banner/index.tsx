"use client";
import { bannersHome } from "@/api/home";
import { useUserContext } from "@/context/UserContext";
import { BannersHome } from "@/model/model";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Advertising = () => {
  const [banners, setBanners] = useState<BannersHome[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useUserContext();

  const fallbackBanners: BannersHome[] = [
    {
      url: "https://static.wixstatic.com/media/5dd8a0_21a165a3316e459f88b1b47e3ff0c4d0~mv2.webp",
      alt: "wowlibre_banner",
    },
  ];

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const fetchedBanners = await bannersHome(user.language);
        setBanners(fetchedBanners);
      } catch (error) {
        setBanners(fallbackBanners);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, [user]);

  return (
    <div className="mt-10 flex justify-center items-center">
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
        {loading
          ? fallbackBanners.map((banner, index) => (
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
                  src={banner.url}
                  alt={banner.alt}
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "50rem",
                  }}
                  className="rounded-lg"
                />
              </div>
            ))
          : banners.map((banner, index) => (
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
                  src={banner.url}
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
