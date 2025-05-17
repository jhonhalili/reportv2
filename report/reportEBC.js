document.addEventListener("DOMContentLoaded", () => {

// campus full chart logic
// get DOM elements and initialize chart variables
  const yearSelect = document.getElementById("campusYearFilter"); // year dropdown
  const islandSelect = document.getElementById("islandGroupFilter"); // island group dropdown
  const regionButtonsContainer = document.getElementById("regionButtons"); // container for region buttons
  const ctx = document.getElementById("campusEnrollmentChart").getContext("2d"); // canvas context for main chart

  let currentChart; // variable to store the current chart instance

// function to update region buttons based on selected year and island
  const updateRegionButtons = () => {
    const year = yearSelect.value.split("–")[0]; // extract year from the selected value (format "yyyy–yyyy")
    const island = islandSelect.value;

// get regions for selected year and island from programData
    const regions = Object.keys(programData.campus[year]?.[island] || {}); 

    regionButtonsContainer.innerHTML = ""; // clear existing region buttons

// create a button for each region
    regions.forEach(region => {
      const btn = document.createElement("button");
      btn.textContent = region;
      btn.className = "px-3 py-2 bg-blue-100 hover:bg-blue-200 rounded text-sm transition";

// add click handler to render chart for the selected region
      btn.addEventListener("click", () => renderRegionChart(year, island, region));
      regionButtonsContainer.appendChild(btn);
    });

// if there are regions, render chart for the first one by default
    if (regions.length > 0) {
      renderRegionChart(year, island, regions[0]);
    }
  };

// function to render the main chart for a specific region  
  const renderRegionChart = (year, island, region) => {
// get data for the selected region
    const regionData = programData.campus[year][island][region];
    const labels = Object.keys(regionData); // campus names
    const values = Object.values(regionData); // enrollment numbers

//const backgroundColors = labels.map(campus => campusColorMap[campus] || "#CCCCCC"); (just in case u want diff color)

    const backgroundColors = labels.map(() => "#2B6CB0"); // set uniform blue color for all bars

    if (currentChart) currentChart.destroy(); // destroy previous chart if it exists
    currentChart = new Chart(ctx, { // create new chart
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: `Enrollees - ${region}, ${island} (${year})`,
          data: values,
          backgroundColor: backgroundColors
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }, // hide legend
          datalabels: {
            anchor: "end",
            align: "top",
            formatter: value => value,
            font: { weight: 'bold' }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 50 }
          }
        }
      }
    });
  };

// add event listeners for dropdown changes
  yearSelect.addEventListener("change", updateRegionButtons);
  islandSelect.addEventListener("change", updateRegionButtons);
  updateRegionButtons();

// mini chart for container 5 preview 
  const miniCtx = document.getElementById("miniCampusChart").getContext("2d");
  let miniChart; // variable to store the mini chart instance

 // function to render the mini preview chart
  function renderMiniCampusChart() {

    // use fixed values for the preview
    const year = "2024";
    const island = "Luzon";
    const data = programData?.campus?.[year]?.[island];
    if (!data) return;

// aggregate campus enrollments across all regions
    const campusEnrollments = {};
    for (const region in data) {
      for (const campus in data[region]) {
        campusEnrollments[campus] = (campusEnrollments[campus] || 0) + data[region][campus];
      }
    }

// get top 5 campuses by enrollment
    const top5 = Object.entries(campusEnrollments)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    const labels = top5.map(([campus]) => campus);
    const values = top5.map(([, count]) => count);

// destroy previous mini chart if it exists
    if (miniChart) miniChart.destroy();

// create new mini chart
    miniChart = new Chart(miniCtx, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: "Enrollees",
          data: values,
          backgroundColor: "#2B6CB0" // same blue color as main chart
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false } // disable tooltips for cleaner look
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

  renderMiniCampusChart();
});
