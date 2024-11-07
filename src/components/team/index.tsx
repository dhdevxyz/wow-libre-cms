import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useTranslation } from "react-i18next";

const MeetTheTeam = () => {
  const { t } = useTranslation();

  const teamMembers = [
    {
      name: "Manuel Chitiva",
      title: "Founder & Specialist",
      image: "https://i.ibb.co/qMqFH2j/ddd.png",
      social: {
        linkedin: "https://www.linkedin.com/in/manuelchitiva/",
        twitter: "https://www.facebook.com/WowLibre/",
        instagram: "https://www.facebook.com/WowLibre/",
      },
    },
    {
      name: "Greengo",
      title: "Game Master",
      image:
        "https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?fit=clamp&w=400&h=400&q=80",
      social: {},
    },
    {
      name: "Greengo",
      title: "Game Master",
      image:
        "https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?fit=clamp&w=400&h=400&q=80",
      social: {},
    },
    {
      name: "Doesn't matter",
      title: "Game Master",
      image:
        "https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?fit=clamp&w=400&h=400&q=80",
      social: {},
    },
  ];

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col">
        <span className="text-center font-bold my-10 opacity-30 text-white">
          <hr className="my-4" />
        </span>

        <div className="flex flex-col mt-8">
          <div className="container max-w-7xl px-4">
            <div className="flex flex-wrap justify-center text-center mb-24">
              <div className="w-full lg:w-6/12 px-4">
                <h1 className="text-white text-4xl font-bold mb-8">
                  {t("support.team.title")}
                </h1>
                <p className="text-gray-400 text-lg font-light">
                  {t("support.team.subtitle")}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4"
                >
                  <div className="flex flex-col">
                    <a
                      href="#"
                      className="mx-auto aspect-square w-full overflow-hidden rounded-2xl"
                    >
                      <img
                        className="object-cover w-full h-full drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100"
                        src={member.image}
                        alt={`${member.name}'s avatar`}
                      />
                    </a>
                    <div className="text-center mt-6">
                      <h1 className="text-white text-xl font-bold mb-1">
                        {member.name}
                      </h1>
                      <div className="text-gray-400 font-light mb-2">
                        {member.title}
                      </div>
                      <div className="flex items-center justify-center space-x-2 opacity-50 hover:opacity-100 transition-opacity duration-300">
                        <a
                          href={member.social.linkedin}
                          className="flex items-center justify-center rounded-full bg-gray-700 p-2 cursor-pointer hover:bg-indigo-600 transition-colors duration-200"
                        >
                          <i className="fab fa-linkedin text-white"></i>
                        </a>
                        <a
                          href={member.social.twitter}
                          className="flex items-center justify-center rounded-full bg-gray-700 p-2 cursor-pointer hover:bg-blue-500 transition-colors duration-200"
                        >
                          <i className="fab fa-twitter text-white"></i>
                        </a>
                        <a
                          href={member.social.instagram}
                          className="flex items-center justify-center rounded-full bg-gray-700 p-2 cursor-pointer hover:bg-pink-500 transition-colors duration-200"
                        >
                          <i className="fab fa-instagram text-white"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetTheTeam;
