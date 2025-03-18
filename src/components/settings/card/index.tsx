import React from "react";
interface CardProps {
  title: string;
  value: number;
  percentage: number;
  color: string;
  btnText: string;
}

const CardSettings: React.FC<CardProps> = ({
  title,
  value,
  percentage,
  color,
  btnText,
}) => {
  const bgColor = color.replace("border-l-8", "bg").replace("border", "bg");

  return (
    <div
      className={`flex flex-col justify-center items-center 
    w-full max-w-[600px] lg:w-full p-6 
    bg-gray-800 rounded-lg shadow-xl border-l-8 ${color} mx-auto`}
    >
      <div className="flex justify-between w-full">
        <div className="p-3 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
            />
          </svg>
        </div>
        <div>
          <span
            className={`text-sm px-4 py-1 ${color} text-white rounded-full`}
          >
            {percentage}%
          </span>
        </div>
      </div>
      <div className="text-white text-center">
        <div className="font-bold text-5xl">{value}</div>
        <div className="font-bold text-lg">{title}</div>
      </div>
      <button
        className={`mt-4 px-5 py-2 rounded-md text-md text-white transition-all duration-300 
        ${bgColor} 
        hover:bg-opacity-90 hover:scale-105 hover:shadow-lg`}
      >
        {btnText}
      </button>
    </div>
  );
};

export default CardSettings;
