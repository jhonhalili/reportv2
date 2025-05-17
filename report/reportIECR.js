document.addEventListener("DOMContentLoaded", () => {

// get DOM elements for year selector, view selector, and chart canvas
  const yearSelector = document.getElementById("conversionYearSelector");
  const viewSelector = document.getElementById("conversionViewSelector");
  const ctx = document.getElementById("conversionChart").getContext("2d");

  let conversionChart; // variable to hold the Chart instance

// constants for conversion funnel stages and their corresponding colors
  const STAGES = ["Online Inquirers", "Walk-in Inquirers", "Registrants", "Enrollees"];
  const STAGE_COLORS = ["#D9E4F5", "#A9C1E8", "#6399D6", "#2B6CB0"];

// function to get the top 5 programs based on enrollee count
  function getTop5Programs(data) {
    return Object.entries(data)
      .sort(([, a], [, b]) => b[3] - a[3]) // sort by enrollees
      .slice(0, 5) // take top 5
      .map(([program]) => program); // extract just the program names
  }

// main function to build/update the chart
  function buildChart(year, view) {

// get raw data for the selected year
    const rawData = programData.conversionData[year];
    if (!rawData) return; // exit if no data for selected year

// get all programs or just top 5 based on view selection
    const programs = Object.keys(rawData);
    const selectedPrograms = view === "top5" ? getTop5Programs(rawData) : programs;

// prepare datasets for each stage of the conversion funnel
    const datasets = STAGES.map((stageLabel, stageIdx) => ({
      label: stageLabel,
      data: selectedPrograms.map((p) => rawData[p]?.[stageIdx] || 0), // get data for each program at this stage
      backgroundColor: STAGE_COLORS[stageIdx], // assign corresponding color
    }));

    const labels = selectedPrograms; // acronyms only

// destroy previous chart instance if it exists
    if (conversionChart) conversionChart.destroy();

// create new chart instance
    conversionChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        indexAxis: "x", // vertical chart (column bars)
        responsive: true,
        plugins: {
          tooltip: {
            mode: "index", // show tooltips for all datasets at same index
            intersect: false,
          },
          legend: {
            position: "top", // place legend at top of chart
          },
          datalabels: {
            anchor: "end",
            align: "top",
            formatter: (value) => value, // display the raw value
          },
        },
        scales: {
          x: {
            stacked: false, // bars not stacked
            title: {
              display: true,
            },
          },
          y: {
            beginAtZero: true, // y-axis starts at 0
            stacked: false,
            title: {
              display: true,
            },
          },
        },
      },
    });
  }

// optional mapping of program acronyms to full names (currently not used)
  const programNameMap = {
    ASCT: "Associate in Computer Technology",
    ART: "Associate in Retail Technology",
    BSRTCS: "BS Retail Technology & Consumer Science",
    BACOMM: "BA Communication",
    BAMMA: "Bachelor of Multimedia Arts",
    BSA: "BS Accountancy",
    BSAIS: "BS Accounting Information System",
    BSCPE: "BS Computer Engineering",
    BSCS: "BS Computer Science",
    BSHM: "BS Hospitality Management",
    BSIS: "BS Information Systems",
    BSIT: "BS Information Technology",
    BSMA: "BS Management Accounting",
    BSOA: "BS Office Administration",
  };

// event listeners for dropdown changes
  yearSelector.addEventListener("change", () => {
    buildChart(yearSelector.value, viewSelector.value);
  });

  viewSelector.addEventListener("change", () => {
    buildChart(yearSelector.value, viewSelector.value);
  });

// initialize chart with default values
  buildChart(yearSelector.value || "2024", viewSelector.value || "all");
});


// mini chart
document.addEventListener("DOMContentLoaded", () => {

// get canvas context for mini chart
  const miniCtx = document.getElementById("miniConversionChart").getContext("2d");
  let miniChart; // variable to hold mini chart instance

  function renderMiniChart() {
    const year = "2024"; // Or dynamically fetch the latest
    const rawData = programData.conversionData?.[year];
    if (!rawData) return;

// get top 4 programs by registrants
    const top5 = Object.entries(rawData)
      .sort(([, a], [, b]) => b[2] - a[2]) // index 3 = Enrollees
      .slice(0, 4);

    const labels = top5.map(([prog]) => prog); // acronyms
    const enrollees = top5.map(([, data]) => data[2]); // registrant counts

// destroy previous mini chart if it exists
    if (miniChart) miniChart.destroy();
    miniChart = new Chart(miniCtx, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: "Enrollees",
          data: enrollees,
          backgroundColor: ["#D9E4F5", "#A9C1E8", "#6399D6", "#2B6CB0"],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }, // hide legend
          tooltip: { enabled: false }, // disable tooltips
        },
        scales: {
          x: {
          ticks: { display: false }, // hide x-axis labels
          grid: { display: true, drawTicks: false },
          title: { display: false }
        },
          y: {
          ticks: { display: false }, // hide y-axis labels
          grid: { display: true, drawTicks: false },
          title: { display: false },
          beginAtZero: true
        }
        }
      }
    });
  }

  renderMiniChart(); // initialize mini chart on load
});
