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

interface BarChartProps {
  labels: string[];
  dataValues: number[];
  backgroundColors: string[];
  legendPosition?: "top" | "left" | "bottom" | "right";
  title?: string;
}

const BarChart: React.FC<BarChartProps> = ({
  labels,
  dataValues,
  backgroundColors,
  legendPosition = "top",
  title,
}) => {
  const data = {
    labels,
    datasets: [
      {
        label: title || "Facción",
        data: dataValues,
        backgroundColor: backgroundColors,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: legendPosition,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
