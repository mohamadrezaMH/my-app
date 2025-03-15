import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const PlantChart = () => {
  const mainData = [2, 4, 7, 3 , 10]; // داده‌های رشد گیاه
  const bottomData = [1, 1, 1, 1 , 1]; // نقاط پایین نمودار

  const dates = ["1403/01/01", "1403/02/15", "1403/04/10", "1403/07/12" , "1403/07/17"];

  const plantIcons = [
    "./plant-32.png",
    "./plant-32.png",
    "./plant-32.png",
    "./plant-32.png",
    "./plant-32.png",
  ];
  const bottomIcons = [
    "./plant-32.png",
    "./plant-32.png",
    "./plant-32.png",
    "./plant-32.png",
    "./plant-32.png",
  ];

  const segmentColors = ["#ff9800", "#ffcc00", "#4caf50" , "#9caf10"];

  const data = {
    labels: dates,
    datasets: [
      {
        label: "رشد گیاه",
        data: mainData,
        borderColor: "blue",
        backgroundColor: "rgba(60,186,159,0.2)",
        tension: 0.4,
        pointStyle: (context) => {
          const img = new Image();
          img.src = plantIcons[context.dataIndex];
          return img;
        },
        pointRadius: 10,
        pointHoverRadius: 12,
      },
      {
        label: "مرحله برداشت",
        data: bottomData,
        borderWidth: 2,
        segment: {
          borderColor: (ctx) => {
            return segmentColors[ctx.p0DataIndex % segmentColors.length];
          },
        },
        pointStyle: (context) => {
          if (context.dataIndex === 1 || context.dataIndex === 2) {
            const img = new Image();
            img.src = bottomIcons[context.dataIndex - 1];
            return img;
          }
          return "circle";
        },
        pointRadius: 12,
        pointHoverRadius: 14,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          title: (tooltipItems) => {
            return `تاریخ: ${dates[tooltipItems[0].dataIndex]}`;
          },
          label: (tooltipItem) => {
            return tooltipItem.datasetIndex === 1
              ? "رسیدن محصول - آغاز برداشت"
              : `مقدار: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      y: { beginAtZero: true, max: 8 },
    },
  };

  return (<div style={{ width: "80%", height: "500px", backgroundColor: "#1e1e1e", marginBottom: "50px" , padding: "20px", borderRadius: "8px" }}>
    {data ? <Line data={data} options={options} /> : <p>Loading data...</p>}
  </div>);
};

export default PlantChart;


