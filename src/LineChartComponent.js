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

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChartComponent = () => {
  // State to manage which dataset is active
  const [activeDataset, setActiveDataset] = useState(null);

  // Data for the chart
  const data = {
    labels: ["13 Jan", "14 Jan", "15 Jan", "16 Jan", "17 Jan", "18 Jan", "19 Jan", "20 Jan"],
    datasets: [
      {
        label: "temperature_2m",
        data: [-8, -5, 0, 3, 4, 2, 1, -2],
        borderColor: "rgba(0, 128, 255, 1)",
        backgroundColor: "rgba(0, 128, 255, 0.2)",
        yAxisID: "y1",
        tension: 0.4,
        hidden: activeDataset !== null && activeDataset !== "temperature_2m",
        pointRadius: 5,
        hoverRadius: 8,
      },
      {
        label: "dew_point_2m",
        data: [-10, -7, -4, -2, 0, -1, -2, -5],
        borderColor: "rgba(128, 0, 255, 1)",
        backgroundColor: "rgba(128, 0, 255, 0.2)",
        yAxisID: "y1",
        tension: 0.4,
        pointStyle: "rectRot",
        hidden: activeDataset !== null && activeDataset !== "dew_point_2m",
        pointRadius: 5,
        hoverRadius: 8,
      },
      {
        label: "wind_speed_10m",
        data: [12, 10, 8, 6, 4, 5, 7, 9],
        borderColor: "rgba(0, 255, 128, 1)",
        backgroundColor: "rgba(0, 255, 128, 0.2)",
        yAxisID: "y2",
        tension: 0.4,
        borderWidth: 2,
        pointStyle: "rectRot",
        hidden: activeDataset !== null && activeDataset !== "wind_speed_10m",
        pointRadius: 5,
        hoverRadius: 8,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "white",
          font: {
            size: 12,
          },
          usePointStyle: true,
          padding: 20,
        },
        onHover: (event, legendItem) => {
          // Set active dataset based on legend item hovered
          setActiveDataset(legendItem.text);
        },
        onLeave: () => {
          // Reset active dataset when leaving the legend
          setActiveDataset(null);
        },
      },
      title: {
        display: true,
        text: "52.52°N 13.42°E 38m above sea level",
        color: "white",
        font: {
          size: 16,
        },
        padding: {
          top: 10,
          bottom: 10,
        },
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            const value = context.raw;
            const unit = context.dataset.yAxisID === "y1" ? "°C" : "km/h";
            return `${label}: ${value} ${unit}`;
          },
        },
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleColor: "white",
        bodyColor: "white",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.5)",
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
      y1: {
        type: "linear",
        position: "left",
        ticks: {
          color: "white",
          callback: (value) => `${value}°C`,
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
      y2: {
        type: "linear",
        position: "right",
        ticks: {
          color: "white",
          callback: (value) => `${value} km/h`,
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20,
      },
    },
  };

  // Add plugin for drawing vertical line
  const verticalLinePlugin = {
    id: "verticalLine",
    beforeDraw: (chart) => {
      if (chart.tooltip?._active?.length) {
        const ctx = chart.ctx;
        const activePoint = chart.tooltip._active[0];
        const x = activePoint.element.x;
        const topY = chart.scales.y1.top;
        const bottomY = chart.scales.y1.bottom;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.restore();
      }
    },
  };

  // Register plugin
  ChartJS.register(verticalLinePlugin);

  return (
    <div style={{ width: "80%", height: "500px", backgroundColor: "#1e1e1e", padding: "20px", borderRadius: "8px" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChartComponent;
