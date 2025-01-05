import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Registra los elementos necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// Definimos los tipos de las props que el componente va a recibir
interface PieChartProps {
  labels: string[];
  dataValues: number[];
  backgroundColors: string[];
  legendPosition?: "top" | "left" | "bottom" | "right"; // Posición de la leyenda, predeterminada es "top"
  title?: string; // Título opcional
  legendColor?: string; // Color de las etiquetas de la leyenda
}

const PieChart: React.FC<PieChartProps> = ({
  labels,
  dataValues,
  backgroundColors,
  legendPosition = "top", // Valor por defecto "top"
  title,
  legendColor = "#ffffff", // Color de la leyenda predeterminado es blanco
}) => {
  const data = {
    labels, // Etiquetas personalizadas pasadas por props
    datasets: [
      {
        data: dataValues, // Valores de los segmentos pasados por props
        backgroundColor: backgroundColors, // Colores de los segmentos pasados por props
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: legendPosition, // Posición de la leyenda
        labels: {
          color: legendColor, // Color de las etiquetas de la leyenda
        },
      },
    },
  };

  return (
    <div
      className="bg-gray-800 p-6 rounded-lg shadow"
      style={{
        width: "100%", // Hacer el gráfico responsivo
        maxWidth: "600px", // Máximo tamaño
        margin: "0 auto", // Centrar en la pantalla
      }}
    >
      <h2 className="text-white text-xl font-semibold mb-4 text-center">
        {title || "Distribución por Categoría"}
      </h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
