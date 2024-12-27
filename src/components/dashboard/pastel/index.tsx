import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ["USA", "Canada", "Mexico", "UK", "Germany"], // Nombres de los países
    datasets: [
      {
        data: [60, 15, 10, 10, 5], // Porcentajes de distribución
        backgroundColor: [
          "#2563eb",
          "#f59e0b",
          "#10b981",
          "#ef4444",
          "#3b82f6",
        ], // Colores para cada parte
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#ffffff", // Color blanco para las etiquetas
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-white text-xl font-semibold mb-4">
        Distribución por Países
      </h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
