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

interface PolarAreaChartProps {
  labels: string[];
  dataValues: number[];
  backgroundColors: string[];
  legendPosition?: "top" | "left" | "bottom" | "right";
  title?: string;
  legendColor?: string;
  width?: number;
  height?: number;
}

const PolarAreaChart: React.FC<PolarAreaChartProps> = ({
  labels,
  dataValues,
  backgroundColors,
  legendPosition = "top",
  title = "",
  legendColor = "#ffffff",
  width = 600,
  height = 600,
}) => {
  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: backgroundColors,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: legendPosition,
        labels: {
          color: legendColor,
        },
      },
    },
  };

  return (
    <div
      className="bg-gray-900 p-6 rounded-lg shadow"
      style={{
        width: "100%",
        maxWidth: `${width}px`,
        height: `${height}px`,
        margin: "0 auto",
      }}
    >
      <h2 className="text-white text-xl font-semibold mb-4 text-center">
        {title || "Distribución por Categoría"}
      </h2>
      <PolarArea data={data} options={options} />
    </div>
  );
};

export default PolarAreaChart;
