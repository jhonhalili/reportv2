document.addEventListener("DOMContentLoaded", () => {
  if (!programData || !programData.enrollmentData) {
    console.error("Enrollment data is missing");
    return;
  }

  const years = Object.keys(programData.enrollmentData);
  const yearButtons = document.getElementById("year-buttons");
  const selectedYearSpan = document.getElementById("selected-year");
  let miniChart, mainChart;

  years.forEach((year) => {
    const button = document.createElement("button");
    button.textContent = year;
    button.className = "px-4 py-2 bg-gray-200 rounded hover:bg-gray-300";
    button.addEventListener("click", () => {
      updateLineChart(year);
      selectedYearSpan.textContent = `Selected Year: ${year}`;
    });
    yearButtons.appendChild(button);
  });

  const updateLineChart = (year) => {
    const miniCtx = document.getElementById("miniLineChart").getContext("2d");
    const ctx = document.getElementById("lineChart").getContext("2d");
    const data = programData.enrollmentData[year];
    const labels = data.map((item) => item.program);
    const values = data.map((item) => item.value);

    // Destroy existing charts if they exist
    if (miniChart) miniChart.destroy();
    if (mainChart) mainChart.destroy();

    miniChart = new Chart(miniCtx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Enrollees",
            data: values,
            borderColor: colorMap["ASCT"],
            fill: false,
          },
        ],
      },
      options: {
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
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Enrollees",
            data: values,
            borderColor: colorMap["ASCT"],
            fill: false,
          },
        ],
      },
      options: {
        plugins: {
          datalabels: { display: false },
        },
      },
    });
  };

  // Initialize with the first year
  updateLineChart(years[0]);
  selectedYearSpan.textContent = `Selected Year: ${years[0]}`;
});
