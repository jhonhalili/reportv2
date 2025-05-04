document.addEventListener("DOMContentLoaded", () => {
  if (!programData || !programData.enrollmentData) {
    console.error("Enrollment data is missing");
    return;
  }

  const years = Object.keys(programData.enrollmentData);
  const yearSelector = document.getElementById("top5YearSelector");
  let miniChart, mainChart; // Renamed for clarity with canvas IDs

  years.forEach((year) => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelector.appendChild(option);
  });

  const updateTop5Chart = (year) => {
    const data = programData.enrollmentData[year]
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
    const miniCtx = document.getElementById("miniTop5Chart").getContext("2d");
    const ctx = document.getElementById("top5BarChart").getContext("2d");
    const labels = data.map((item) => item.program);
    const values = data.map((item) => item.value);
    const colors = data.map((item) => colorMap[item.program] || "#999999");

    // Destroy existing charts if they exist
    if (miniChart) miniChart.destroy();
    if (mainChart) mainChart.destroy();

    miniChart = new Chart(miniCtx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Enrollees",
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
            label: "Enrollees",
            data: values,
            backgroundColor: colors,
          },
        ],
      },
      options: {
        plugins: {
          datalabels: {
            anchor: "end",
            align: "top",
            formatter: (value) => value,
          },
        },
      },
    });
  };

  yearSelector.addEventListener("change", (e) => {
    updateTop5Chart(e.target.value);
  });

  // Initialize with the first year
  updateTop5Chart(years[0]);
});
