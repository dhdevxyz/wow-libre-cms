import { CardVdp } from "@/model/model";
import React from "react";

const ICONS: Record<number, JSX.Element> = {
  1: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-16"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 14a4 4 0 00-8 0M12 8a4 4 0 100-8 4 4 0 000 8zM2 20a10 10 0 0120 0"
      />
    </svg>
  ),
  2: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-16"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 20h5v-2a4 4 0 00-4-4h-1m-6 6H3v-2a4 4 0 014-4h1m9-4a3 3 0 11-6 0 3 3 0 016 0zM7 10a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
  3: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-16"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 22s8-4 8-10V4l-8-2-8 2v8c0 6 8 10 8 10z"
      />
    </svg>
  ),
};

interface ServerAnalyticsProps {
  cardData: CardVdp[];
}

const ServerAnalytics: React.FC<ServerAnalyticsProps> = ({ cardData }) => {
  return (
    <div className="contenedor grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-7xl mx-auto p-4">
      {cardData.map((card) => (
        <article
          key={card.id}
          className="flex flex-col items-center sm:items-start gap-6 rounded-xl border p-8 sm:p-12 min-h-[100px] shadow-lg 
                   transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-500 border-blue-400
                   bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
        >
          <span className="rounded-full bg-blue-500/20 text-blue-400 p-5 transition-all duration-300 hover:bg-blue-500 hover:text-white">
            {ICONS[card.icon] || ICONS[1]}
          </span>

          <div className="text-center sm:text-left">
            <p className="text-3xl sm:text-4xl font-bold text-white pb-2">
              {card.value}
            </p>
            <p className="text-lg sm:text-xl text-gray-400">
              {card.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ServerAnalytics;
