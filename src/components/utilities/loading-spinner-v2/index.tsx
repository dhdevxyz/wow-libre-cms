import React from "react";

const LoadingSpinnerCentral: React.FC = () => {
  return (
    <div className="flex items-center justify-center bg-gray-900">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-500"></div>
    </div>
  );
};

export default LoadingSpinnerCentral;
