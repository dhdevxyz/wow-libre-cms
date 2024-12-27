import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const data = {
    labels: ["Producto A", "Producto B", "Producto C", "Producto D"],
    datasets: [
      {
        label: "Ventas",
        data: [400, 300, 500, 700],
        backgroundColor: ["#1d4ed8", "#9333ea", "#f97316", "#22c55e"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
