document.addEventListener("DOMContentLoaded", () => {

// check if required data is available
  if (!programData || !programData.enrollmentData) {
    console.error("Enrollment data is missing");
    return;
  }

  const years = Object.keys(programData.enrollmentData); // extract available years from the enrollment data
  const yearSelector = document.getElementById("top5YearSelector"); // get reference to the year selection dropdown
  let miniChart, mainChart; // variables to store chart instances

// populate year dropdown with available years
  years.forEach((year) => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelector.appendChild(option);
  });

  const createBarChart = (ctx, labels, values, colors, isMini = false) => {
    return new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "Enrollees",
          data: values,
          backgroundColor: colors,
          borderRadius: isMini ? 0 : 8, // mini chart has square corners
          borderSkipped: false, // apply border radius to all corners
        }],
      },
      options: {
        indexAxis: 'y',  // <-- horizontal bars for both mini and main
        animation: { duration: 600, easing: 'easeOutQuart' }, // smooth animations
        responsive: true,
        plugins: {
          legend: { display: false }, // hide legend
          datalabels: {
            display: !isMini, // only show data labels on main chart
            anchor: "end",
            align: "right",
            formatter: (v) => v, // display raw value
            color: "#333",
            font: { weight: "bold" },
          },
          tooltip: { enabled: !isMini }, // only show tooltips on main chart
        },
        scales: {
          x: {
            beginAtZero: true,
             grid: { display: true, drawTicks: false },
            ticks: { display: !isMini }, // only show ticks on main chart
          },
          y: {
             grid: { display: true, drawTicks: false },
            ticks: { display: !isMini }, // only show ticks on main chart
          },
        },
      }
    });
  };

  const updateChart = (chart, labels, values, colors) => {
    chart.data.labels = labels;
    chart.data.datasets[0].data = values;
    chart.data.datasets[0].backgroundColor = colors;
    chart.update();
  };

  const updateTop5Chart = (year) => {

// get raw data for the selected year
    const rawData = programData.enrollmentData[year] || [];

// sort by value and take top 5 programs
    const top5 = rawData
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

// extract labels, values, and colors for the chart
    const labels = top5.map((item) => item.program);
    const values = top5.map((item) => item.value);
    const highlightColor = "#1f77b4";

// assign colors - highlight first item, use predefined colors for others
    const colors = top5.map((item, i) =>
      i === 0 ? highlightColor : (colorMap[item.program] || "#999999")
    );

// get canvas contexts for both charts
    const miniCtx = document.getElementById("miniTop5Chart").getContext("2d");
    const mainCtx = document.getElementById("top5BarChart").getContext("2d");

// create or update mini chart
    if (!miniChart) {
      miniChart = createBarChart(miniCtx, labels, values, colors, true);
    } else {
      updateChart(miniChart, labels, values, colors);
    }

// create or update main chart
    if (!mainChart) {
      mainChart = createBarChart(mainCtx, labels, values, colors, false);
    } else {
      updateChart(mainChart, labels, values, colors);
    }
  };

// add event listener for year selection changes
  yearSelector.addEventListener("change", (e) => {
    updateTop5Chart(e.target.value);
  });

// initialize chart with data for the first available year
  updateTop5Chart(years[0]);
});
