
// for the mini line chart canvas
  document.addEventListener('DOMContentLoaded', () => {
    const ctxMini = document.getElementById('miniLineChart')?.getContext('2d');

// render a mini line chart showing a basic trend (for dashboard preview or summary)
  new Chart(ctxMini, {
    type: 'line',
    data: {
      labels: ['2024', '2025', '2026'], // years on minichart
      datasets: [{
        label: 'Enrollment',
        data: [1, 4, 3], // for demonstration
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4, // for smooth curve
        pointRadius: 3, // dot size
        pointBackgroundColor: '#3b82f6', // dot color
        fill: true // show shaded area under the line
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // for flexible height/width
      scales: {
        y: {
          beginAtZero: true, // y-axis starts at 0
          ticks: {
            precision: 0
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.raw} enrollees`
          }
        }
      }
    }
  });
});


// dummy data used for demonstration purposes only
  const dummyData = {
    "2024-2025": {
      "2024": {
        "ASCT": 40,
        "ART": 30,
        "BSRTCS": 45,
        "BACOMM": 22,
        "BAMMA": 28,
        "BSA": 35,
        "BSAIS": 25,
        "BSCpE": 32,
        "BSCS": 42,
        "BSHM": 37,
        "BSIS": 30,
        "BSIT": 50,
        "BSMA": 20,
        "BSOA": 25
      },
      "2025": {
        "ASCT": 40,
        "ART": 30,
        "BSRTCS": 45,
        "BACOMM": 23,
        "BAMMA": 27,
        "BSA": 35,
        "BSAIS": 25,
        "BSCpE": 33,
        "BSCS": 43,
        "BSHM": 38,
        "BSIS": 30,
        "BSIT": 45,
        "BSMA": 20,
        "BSOA": 25
      }
    },
    "2025-2026": {
      "2025": {
        "ASCT": 45,
        "ART": 35,
        "BSRTCS": 50,
        "BACOMM": 25,
        "BAMMA": 30,
        "BSA": 40,
        "BSAIS": 27,
        "BSCpE": 35,
        "BSCS": 47,
        "BSHM": 40,
        "BSIS": 32,
        "BSIT": 90,
        "BSMA": 22,
        "BSOA": 35
      },
      "2026": {
        "ASCT": 45,
        "ART": 35,
        "BSRTCS": 50,
        "BACOMM": 25,
        "BAMMA": 35,
        "BSA": 40,
        "BSAIS": 28,
        "BSCpE": 35,
        "BSCS": 48,
        "BSHM": 45,
        "BSIS": 38,
        "BSIT": 90,
        "BSMA": 23,
        "BSOA": 40
      }
    }
  };  

// color for each year to visually differentiate lines
  const colors = {
    "2024": "#3B82F6",  // Blue
    "2025": "#FBBF24",  // Yellow
    "2026": "#10B981"   // Green 
};

// for year selector and display label
  const selectedYearLabel = document.getElementById('selected-year');
  const yearSelect = document.getElementById('yearSelect');

// default: "2024-2025"
  let currentAcademicYear = yearSelect.value; 

// this will hold our main comparison line chart instance
  let lineChart; 

// update the chart whenever a new academic year is selected
  yearSelect.addEventListener("change", () => {
    currentAcademicYear = yearSelect.value;
    updateChart();
  });

// updates the main line chart based on selected year
  function updateChart() {
    const yearGroups = dummyData[currentAcademicYear]; // get data for selected academic year

 // extract list of programs from the first year in the selected academic year
  const programs = Object.keys(yearGroups[Object.keys(yearGroups)[0]]); // get from first year (2024)
  
// build datasets for each year in the selected academic year
  const datasets = Object.entries(yearGroups).map(([year, data]) => ({
    label: year,
    data: programs.map(program => data[program]), // data points for each program
    borderColor: colors[year],
    backgroundColor: colors[year],
    fill: false,
    borderWidth: 2,
    tension: 0.4, // for smooth lines
    pointRadius: 5,
    pointBackgroundColor: colors[year],
    pointBorderColor: "#fff"
  }));

  if (lineChart) {

// if chart already exists, just update the data and redraw
    lineChart.data.labels = programs;
    lineChart.data.datasets = datasets;
    lineChart.update();
  } else {

// create chart 
    const ctx = document.getElementById('lineCharty').getContext('2d');
    lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: programs,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#374151'
            }
          },
          x: {
            ticks: {
              color: '#374151'
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#374151'
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.dataset.label}: ${context.parsed.y} enrollees`
            }
          }
        }
      }
    });
  }

  selectedYearLabel.innerText = `Selected Year: ${currentAcademicYear}`;
}


// Initial render
updateChart();

//////////////
