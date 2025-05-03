import React from "react";
import "./style.css";
import { webProps } from "@/constants/configs";

interface TitleWowProps {
  title: string;
  description: string;
}

const TitleWow = ({ title, description }: TitleWowProps) => {
  return (
    <div className="title-wow-container">
      <h2 className="title-text text-center mb-4 text-5xl sm:text-5xl md:text-7xl lg:text-7xl xl:text-8xl title-server">
        {title}
        <br />
        {webProps.serverName} <span className="highlight-text">Wow</span>
      </h2>
      <div className="description-container">
        <p className="description-text text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl">
          {description}
        </p>
      </div>
    </div>
  );
};

export default TitleWow;
