import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart: React.FC<{ filteredData: any }> = ({ filteredData }) => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Funciones para cambiar los valores de los selects
  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setSelectedMonth(null);
    setSelectedDay(null);
  };

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    setSelectedDay(null);
  };

  const handleDayChange = (day: number) => {
    setSelectedDay(day);
  };

  const getFilteredData = () => {
    if (!filteredData) {
      return [];
    }

    let years = Object.keys(filteredData || {}).map((year) => ({
      year: parseInt(year),
      months: Object.keys(filteredData[year] || {}).map((month) => ({
        month,
        days: Object.keys(filteredData[year][month] || {}).map((day) => ({
          day: parseInt(day),
          ...filteredData[year][month][day],
        })),
      })),
    }));

    // Filtrar por año
    if (selectedYear) {
      years = years.filter((year) => year.year === selectedYear);
    }

    // Filtrar por mes
    if (selectedMonth) {
      years = years.map((year) => ({
        ...year,
        months: year.months.filter((month) => month.month === selectedMonth),
      }));
    }

    // Filtrar por día
    if (selectedDay) {
      years = years.map((year) => ({
        ...year,
        months: year.months.map((month) => ({
          ...month,
          days: month.days.filter((day) => day.day === selectedDay),
        })),
      }));
    }

    return years;
  };

  // Generar los datos de la gráfica
  const chartData = {
    labels: getFilteredData().flatMap((year) =>
      year.months.flatMap((month) => month.days.map((day) => `Día ${day.day}`))
    ),
    datasets: [
      {
        label: "Capital Prestado",
        data: getFilteredData().flatMap((year) =>
          year.months.flatMap((month) => month.days.map((day) => day.loans))
        ),
        borderColor: "#16a34a", // Verde oscuro
        backgroundColor: "rgba(22, 163, 74, 0.2)",
        fill: true,
      },
      {
        label: "Saldo Pendiente",
        data: getFilteredData().flatMap((year) =>
          year.months.flatMap((month) => month.days.map((day) => day.pending))
        ),
        borderColor: "#f97316", // Naranja
        backgroundColor: "rgba(249, 115, 22, 0.2)",
        fill: true,
      },
      {
        label: "Monto Recuperado",
        data: getFilteredData().flatMap((year) =>
          year.months.flatMap((month) => month.days.map((day) => day.paid))
        ),
        borderColor: "#2563eb", // Azul
        backgroundColor: "rgba(37, 99, 235, 0.2)",
        fill: true,
      },
      {
        label: "Ganancia Estimada",
        data: getFilteredData().flatMap((year) =>
          year.months.flatMap((month) => month.days.map((day) => day.gain))
        ),
        borderColor: "#eab308", // Amarillo dorado
        backgroundColor: "rgba(234, 179, 8, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="bg-gray-900 text-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">
        Gráfica de Préstamos y Pagos
      </h2>

      {/* Select para Año */}
      <select
        onChange={(e) => handleYearChange(Number(e.target.value))}
        value={selectedYear || ""}
        className="mb-4 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="">Selecciona un año</option>
        {Object.keys(filteredData || {}).map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      {/* Select para Mes */}
      {selectedYear && (
        <select
          onChange={(e) => handleMonthChange(e.target.value)}
          value={selectedMonth || ""}
          className="mb-4 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Selecciona un mes</option>
          {selectedYear &&
            Object.keys(filteredData[selectedYear] || {}).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
        </select>
      )}

      {/* Select para Día */}
      {selectedMonth && selectedYear && (
        <select
          onChange={(e) => handleDayChange(Number(e.target.value))}
          value={selectedDay || ""}
          className="mb-4 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Selecciona un día</option>
          {selectedMonth &&
            selectedYear &&
            Object.keys(filteredData[selectedYear][selectedMonth] || {}).map(
              (day) => (
                <option key={day} value={day}>
                  Día {day}
                </option>
              )
            )}
        </select>
      )}

      {/* Gráfica */}
      <div>
        <Line data={chartData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default LineChart;
