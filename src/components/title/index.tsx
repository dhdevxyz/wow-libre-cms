import React from "react";
import "./style.css";

interface TitleWowProps {
  title: string;
  description: string;
}

const TitleWow = ({ title, description }: TitleWowProps) => {
  return (
    <div className="title-wow-container">
      <h2 className="title-text text-center mb-11 text-6xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl title-server">
        {title}
        <br />
        WOW <span className="highlight-text">LIBRE</span>
      </h2>
      <div className="description-container">
        <p className="description-text pt-6 text-center text-lg mb-4 leading-tight sm:text-lg md:text-2xl lg:text-2xl xl:text-2xl">
          {description}
        </p>
      </div>
    </div>
  );
};

export default TitleWow;
