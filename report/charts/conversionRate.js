document.addEventListener("DOMContentLoaded", () => {
  if (!programData || !programData.conversionData) {
    console.error("Conversion data is missing");
    return;
  }

  const years = Object.keys(programData.conversionData);
  const yearSelector = document.getElementById("conversionYearSelector");
  let miniChart, mainChart;

  years.forEach((year) => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelector.appendChild(option);
  });

  const updateFunnelChart = (year) => {
    const miniCtx = document.getElementById("miniFunnelChart").getContext("2d");
    const ctx = document.getElementById("funnelChart").getContext("2d");
    const data = programData.conversionData[year];
    const labels = data.map((item) => item.stage);
    const values = data.map((item) => item.value);
    const colors = [
      colorMap["ASCT"],
      colorMap["BSCS"],
      colorMap["BSIT"],
      colorMap["BSA"],
    ]; // Pick a few colors

    // Destroy existing charts if they exist
    if (miniChart) miniChart.destroy();
    if (mainChart) mainChart.destroy();

    miniChart = new Chart(miniCtx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Conversion Funnel",
            data: values,
            backgroundColor: colors,
          },
        ],
      },
      options: {
        indexAxis: "y",
        plugins: {
          legend: { display: false },
          datalabels: { display: false },
        },
        scales: {
          x: { display: false },
          y: { display: false },
        },
      },
    });

    mainChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Conversion Funnel",
            data: values,
            backgroundColor: colors,
          },
        ],
      },
      options: {
        indexAxis: "y",
        plugins: {
          datalabels: {
            anchor: "end",
            align: "right",
            formatter: (value) => value,
          },
        },
      },
    });
  };

  yearSelector.addEventListener("change", (e) => {
    updateFunnelChart(e.target.value);
  });

  // Initialize with the first year
  updateFunnelChart(years[0]);
});
