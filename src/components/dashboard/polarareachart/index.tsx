import React from "react";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale);

const PolarAreaChart = () => {
  const data = {
    labels: ["USA", "Canada", "Mexico", "UK", "Germany"],
    datasets: [
      {
        data: [60, 15, 10, 10, 5],
        backgroundColor: [
          "#2563eb",
          "#f59e0b",
          "#10b981",
          "#ef4444",
          "#3b82f6",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#ffffff",
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-white text-xl font-semibold mb-4">
        Distribución por Países
      </h2>
      <PolarArea data={data} options={options} />
    </div>
  );
};

export default PolarAreaChart;
