import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
} from "chart.js";

ChartJS.register(BarElement, LinearScale, CategoryScale);
const BarChart = ({ labels, dataToDisplay }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Expenses",
        backgroundColor: "rgba(8, 36, 94,   1)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(0,0,0,0.5)",
        hoverBorderColor: "rgba(54, 162, 235, 1)",
        data: dataToDisplay,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category",
        ticks: {
          beginAtZero: true,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: "auto", width: "fit-content", objectFit: "contain" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
