document.addEventListener("DOMContentLoaded", () => {

  const tempEl = document.getElementById("suhu");
  const humEl  = document.getElementById("kelembapan");
  const ctx    = document.getElementById("sensorChart");

  const sensorChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "Temperature (°C)",
          data: [],
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59,130,246,0.2)",
          borderWidth: 2,
          tension: 0.4
        },
        {
          label: "Humidity (%)",
          data: [],
          borderColor: "#10b981",
          backgroundColor: "rgba(16,185,129,0.2)",
          borderWidth: 2,
          tension: 0.4
        }
      ]
    },
    options: {
        plugins: {
        legend: {
        labels: {
        color: "#94a3b8"
      }
    }
  },
      scales: {
        x: {
            ticks: { color: "#94a3b8" },
            grid: { color: "rgba(148,163,184,0.1)" }
      },
        y: {
            ticks: { color: "#94a3b8" },
            grid: { color: "rgba(148,163,184,0.1)" },
            beginAtZero: true
      }
      }
    }
  });

  async function fetchData() {
    const res = await fetch("/data");
    const data = await res.json();

    tempEl.textContent = data.temperature;
    humEl.textContent  = data.humidity;

    const lastUpdateEl = document.getElementById("lastUpdate");
    if (lastUpdateEl) {
    lastUpdateEl.textContent = new Date().toLocaleTimeString("id-ID");
    }


    const time = new Date().toLocaleTimeString();

    sensorChart.data.labels.push(time);
    sensorChart.data.datasets[0].data.push(data.temperature);
    sensorChart.data.datasets[1].data.push(data.humidity);

    if (sensorChart.data.labels.length > 15) {
      sensorChart.data.labels.shift();
      sensorChart.data.datasets.forEach(d => d.data.shift());
    }

    sensorChart.update("none");
  }

  setInterval(fetchData, 2000);

});

const toggleBtn = document.getElementById("themeToggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  toggleBtn.textContent =
    document.body.classList.contains("dark")
      ? "☀️ Light Mode"
      : "🌙 Dark Mode";
});

