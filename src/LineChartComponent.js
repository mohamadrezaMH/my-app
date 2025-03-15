import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const PlantChart = () => {
  // داده‌های نمودار
  const data = {
    labels: ["شروع", "مرحله رشد", "اوج رشد", "کاهش"],
    datasets: [
      {
        label: "رشد گیاه",
        data: [2, 4, 7, 3], // مقادیر روی محور Y
        borderColor: "#3cba9f",
        backgroundColor: "rgba(60,186,159,0.2)",
        tension: 0.4,
        pointStyle: (context) => {
          // تعیین تصویر برای نقاط
          const img = new Image();
          img.src = "/plant-icon.svg"; // مسیر SVG گیاه
          return img;
        },
        pointRadius: 10, // اندازه نقاط
        pointHoverRadius: 12, // اندازه در هاور
      },
      {
        label: "بخش پایینی نمودار",
        data: [null, null, 1, null], // فقط یک نقطه در پایین نمودار
        borderColor: "rgba(0,0,0,0)",
        pointBackgroundColor: "#FFD700",
        pointRadius: 10,
        pointHoverRadius: 12,
      },
    ],
  };

  // تنظیمات نمودار
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: false, // غیرفعال کردن پیش‌فرض
        external: (context) => {
          // نمایش باکس سفارشی در هاور
          let tooltipEl = document.getElementById("chart-tooltip");
          if (!tooltipEl) {
            tooltipEl = document.createElement("div");
            tooltipEl.id = "chart-tooltip";
            tooltipEl.style.position = "absolute";
            tooltipEl.style.background = "#fff";
            tooltipEl.style.border = "1px solid #ccc";
            tooltipEl.style.padding = "5px";
            tooltipEl.style.borderRadius = "5px";
            tooltipEl.style.pointerEvents = "none";
            document.body.appendChild(tooltipEl);
          }

          const tooltipModel = context.tooltip;
          if (tooltipModel.opacity === 0) {
            tooltipEl.style.opacity = 0;
            return;
          }

          // نمایش متن
          const label = tooltipModel.dataPoints[0].label;
          tooltipEl.innerHTML = <strong>${label}</strong>;

          // مکان‌یابی باکس
          const { x, y } = tooltipModel.caretX
            ? { x: tooltipModel.caretX, y: tooltipModel.caretY }
            : { x: 0, y: 0 };

          tooltipEl.style.left = ${x}px;
          tooltipEl.style.top = ${y - 40}px;
          tooltipEl.style.opacity = 1;
        },
      },
    },
    scales: {
      y: { beginAtZero: true, max: 8 },
    },
  };

  return <Line data={data} options={options} />;
};

export default PlantChart;