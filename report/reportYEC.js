  
// color mapping for different years to maintain consistent styling across charts
  const yearColorMap = {
    "2024": {
      borderColor: "#3B82F6", // Blue
      backgroundColor: "rgba(59, 130, 246, 0.2)" // semi-transparent blue
    },
    "2025": {
      borderColor: "#FACC15", // Yellow
      backgroundColor: "rgba(250, 204, 21, 0.2)" // semi-transparent yellow
    },
    "2026": {
      borderColor: "#FB923C", // Orange
      backgroundColor: "rgba(251, 146, 60, 0.2)" // semi-transparent orange
    }
  };

document.addEventListener("DOMContentLoaded", () => {
  
// check if required data is available
  if (!programData || !programData.enrollment) {
    console.error("Enrollment data is missing");
    return;
  }

// get sorted list of years from enrollment data
  const years = Object.keys(programData.enrollment).sort(); // ensure chronological order
  const yearSelect = document.getElementById("yearSelect");

  let lineChartInstance; // variable to store chart instance for later updates

// populate dropdown with year range options
  for (let i = 0; i < years.length - 1; i++) {
    const year = years[i];
    const nextYear = years[i + 1];
    const option = document.createElement("option");
    option.value = `${year}-${nextYear}`;
    option.textContent = `${year}-${nextYear}`;
    yearSelect.appendChild(option);
  }

  const updateLineChart = (range) => {
    const [year1, year2] = range.split("-"); 

// get enrollment data for both years
    const data1 = programData.enrollment[year1] || [];
    const data2 = programData.enrollment[year2] || [];

// get unique program names from both years
    const programs = [...new Set([
      ...data1.map(d => d.program),
      ...data2.map(d => d.program)
    ])];

// create datasets by matching program names with enrollment values
    const dataset1 = programs.map(program => {
      const item = data1.find(d => d.program === program);
      return item ? item.value : 0; // use 0 if program not found in year
    });

    const dataset2 = programs.map(program => {
      const item = data2.find(d => d.program === program);
      return item ? item.value : 0; // use 0 if program not found in year
    });

    if (lineChartInstance) lineChartInstance.destroy(); // destroy previous chart instance if it exists

    const ctx = document.getElementById("lineCharty").getContext("2d"); // create new chart instance

    lineChartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: programs, // x-axis labels (program names)
        datasets: [
          {
            label: year1,
            data: dataset1,
            borderColor: yearColorMap[year1]?.borderColor || "#999", // use mapped color or default
            backgroundColor: yearColorMap[year1]?.backgroundColor || "rgba(153, 153, 153, 0.2)",
            fill: false,
            tension: 0.4 // makes lines slightly curved
          },
          {
            label: year2,
            data: dataset2,
            borderColor: yearColorMap[year2]?.borderColor || "#999",
            backgroundColor: yearColorMap[year2]?.backgroundColor || "rgba(153, 153, 153, 0.2)",
            fill: false,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          datalabels: { display: false }, // disable data labels on points
          legend: { display: true } // show legend
        },
        scales: {
          x: {
            title: {
              display: true // show x-axis title if configured
            }
          },
          y: {
            title: {
              display: true,
              text: "Enrollees" // y-axis label
            }
          }
        }
      }
    });
  };

// event listener for dropdown changes
  yearSelect.addEventListener("change", (e) => {
    updateLineChart(e.target.value);
  });

// initial chart load with first available year range
  if (yearSelect.options.length > 0) {
    yearSelect.value = yearSelect.options[0].value;
    updateLineChart(yearSelect.value);
  }
});

// mini chart
  function renderMiniLineChart() {
    const canvas = document.getElementById("miniLineChart");

// check if required elements and data exist
  if (!canvas || !programData || !programData.enrollment) return;

  const ctx = canvas.getContext("2d");

  const years = Object.keys(programData.enrollment).sort();
  if (years.length < 2) return; // need at least two years for comparison

// get the two most recent years
  const latestYearIndex = years.length - 2;
  const year1 = years[latestYearIndex];
  const year2 = years[latestYearIndex + 1];

 // get enrollment data for both years
  const data1 = programData.enrollment[year1] || [];
  const data2 = programData.enrollment[year2] || [];

// get program names from both years
  const programs = [...new Set([
    ...data1.map(d => d.program),
    ...data2.map(d => d.program)
  ])];

// create datasets for the chart
  const dataset1 = programs.map(program => {
    const item = data1.find(d => d.program === program);
    return item ? item.value : 0;
  });

  const dataset2 = programs.map(program => {
    const item = data2.find(d => d.program === program);
    return item ? item.value : 0;
  });

// create the mini chart with simplified options
  new Chart(ctx, {
    type: "line",
    data: {
      labels: programs,
      datasets: [
        {
          label: year1,
          data: dataset1,
          borderColor: yearColorMap[year1]?.borderColor || "#999",
          backgroundColor: yearColorMap[year1]?.backgroundColor || "rgba(153, 153, 153, 0.2)",
          fill: false,
          tension: 0.4
        },
        {
          label: year2,
          data: dataset2,
          borderColor: yearColorMap[year2]?.borderColor || "#999",
          backgroundColor: yearColorMap[year2]?.backgroundColor || "rgba(153, 153, 153, 0.2)",
          fill: false,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }, // hide legend in mini chart
        tooltip: { enabled: false } // disable tooltips
      },
      scales: {
        x: {
          display: true,
          grid: {
            display: true,
            color: "rgba(0,0,0,0.05)" // very light grid lines
          },
          ticks: {
            display: false // hide program names to save space
          }
        },
        y: {
          display: true,
          grid: {
            display: true,
            color: "rgba(0,0,0,0.05)"
          },
          ticks: {
            display: false // hide enrollment numbers to save space
          }
        }
      },
      elements: {
        point: { radius: 0 } // hide data points to simplify the visual
      }
    }
  });
}

renderMiniLineChart();
