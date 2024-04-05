import React from "react";
import { Pie } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS } from "chart.js";

ChartJS.register(ArcElement);
const PieChart = ({
  height = "80px",
  width = "100%",
  itemName,
  percentage,
  labels,
  data: _data,
}) => {
  const data = {
    labels: labels ?? ["Item", "Remaining"],
    datasets: [
      {
        data: _data ?? [(20, 80)],
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Expenditure on Food",
      },
    },
  };

  return (
    <div
      className="pie-chart-container dflex flex-row"
      style={{ height, width }}
    >
      <Pie data={data} options={options} className="ml-15 mr-15" />
      <pre className="ml-15">
        {itemName ?? "item"} {percentage?.toFixed(2) ?? 0} %
      </pre>
    </div>
  );
};

export default PieChart;
