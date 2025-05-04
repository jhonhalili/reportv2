document.addEventListener("DOMContentLoaded", () => {
  if (!programData || !programData.campusData) {
    console.error("Campus data is missing");
    return;
  }

  const years = Object.keys(programData.campusData);
  const yearSelector = document.getElementById("campusYearSelector");
  let miniChart, mainChart;

  years.forEach((year) => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelector.appendChild(option);
  });

  const updateCampusChart = (year) => {
    const miniCtx = document.getElementById("miniCampusChart").getContext("2d");
    const ctx = document.getElementById("campusChart").getContext("2d");
    const data = programData.campusData[year];
    const labels = data.map((item) => item.campus);
    const values = data.map((item) => {
      const programs = item.programs;
      return Object.values(programs).reduce((sum, val) => sum + val, 0);
    });
    const colors = [colorMap["ASCT"], colorMap["BSCS"], colorMap["BSIT"]]; // One color per campus

    // Destroy existing charts if they exist
    if (miniChart) miniChart.destroy();
    if (mainChart) mainChart.destroy();

    miniChart = new Chart(miniCtx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Enrollees by Campus",
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
            label: "Enrollees by Campus",
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
    updateCampusChart(e.target.value);
  });

  // Initialize with the first year
  updateCampusChart(years[0]);
});
