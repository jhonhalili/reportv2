document.addEventListener("DOMContentLoaded", () => {
  if (!programData || !programData.demographicData) {
    console.error("Demographic data is missing");
    return;
  }

  const years = Object.keys(programData.demographicData);
  const yearSelector = document.getElementById("demoYearSelector");
  let miniChart, mainChart;

  years.forEach((year) => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelector.appendChild(option);
  });

  const updateDemoChart = (year) => {
    const miniCtx = document.getElementById("miniDemoChart").getContext("2d");
    const ctx = document.getElementById("demoChart").getContext("2d");
    const data = programData.demographicData[year];
    const labels = data.map((item) => item.category);
    const values = data.map((item) => item.value);
    const colors = [
      colorMap["ASCT"],
      colorMap["BSCS"],
      colorMap["BSIT"],
      colorMap["BSA"],
      colorMap["BAMMA"],
    ];

    // Destroy existing charts if they exist
    if (miniChart) miniChart.destroy();
    if (mainChart) mainChart.destroy();

    miniChart = new Chart(miniCtx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Demographic Breakdown",
            data: values,
            backgroundColor: colors,
          },
        ],
      },
      options: {
        plugins: {
          legend: { display: false },
          datalabels: { display: false },
        },
      },
    });

    mainChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Demographic Breakdown",
            data: values,
            backgroundColor: colors,
          },
        ],
      },
      τικές: {
        plugins: {
          datalabels: {
            color: "#fff",
            formatter: (value, ctx) => {
              const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${percentage}%`;
            },
          },
        },
      },
    });
  };

  yearSelector.addEventListener("change", (e) => {
    updateDemoChart(e.target.value);
  });

  // Initialize with the first year
  updateDemoChart(years[0]);
});
