document.addEventListener("DOMContentLoaded", () => {
  if (!programData || !programData.enrollmentData) {
    console.error("Enrollment data is missing");
    return;
  }

  const years = Object.keys(programData.enrollmentData);
  const yearSelector = document.getElementById("yearSelector");
  let previewChart, mainChart;

  years.forEach((year) => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelector.appendChild(option);
  });

  const updateProgramList = (year) => {
    const programList = document.getElementById("programList");
    programList.innerHTML = "";
    programData.enrollmentData[year].forEach((item) => {
      const div = document.createElement("div");
      div.textContent = `${item.name}: ${item.value}`;
      programList.appendChild(div);
    });
  };

  const updateDonutChart = (year) => {
    const ctx = document.getElementById("donutChart").getContext("2d");
    const previewCtx = document
      .getElementById("previewDonutChart")
      .getContext("2d");
    const data = programData.enrollmentData[year];
    const labels = data.map((item) => item.program);
    const values = data.map((item) => item.value);
    const colors = data.map((item) => colorMap[item.program] || "#999999");

    // Destroy existing charts if they exist
    if (previewChart) previewChart.destroy();
    if (mainChart) mainChart.destroy();

    previewChart = new Chart(previewCtx, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
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
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            data: values,
            backgroundColor: colors,
          },
        ],
      },
      options: {
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
    const selectedYear = e.target.value;
    updateProgramList(selectedYear);
    updateDonutChart(selectedYear);
  });

  // Initialize with the first year
  const defaultYear = years[0];
  yearSelector.value = defaultYear;
  updateProgramList(defaultYear);
  updateDonutChart(defaultYear);
});
