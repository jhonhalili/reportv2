document.addEventListener("DOMContentLoaded", function () {

 // dummy data representing conversion funnel: [Online, Walk-in, Registrants, Enrollees]
  const dummyConversionData = {
    "2024": {
      ASCT: [200, 180, 150, 130], BSCS: [180, 160, 140, 120], BSIT: [220, 200, 180, 160],
      BAMM: [140, 120, 110, 100], BSAIS: [120, 100, 90, 80], BSA: [210, 190, 170, 150],
      BSOA: [100, 90, 80, 70], BSIS: [170, 150, 130, 120], BSRTCS: [150, 130, 120, 110],
      ART: [90, 80, 70, 60], BACOMM: [80, 70, 60, 50], BSHM: [160, 140, 120, 100],
      BSMA: [140, 120, 110, 90], BSCE: [190, 170, 150, 130]
    },
    "2025": {
      ASCT: [220, 200, 170, 150], BSCS: [200, 180, 160, 140], BSIT: [250, 230, 210, 190],
      BAMM: [150, 130, 120, 110], BSAIS: [130, 110, 100, 90], BSA: [230, 210, 190, 170],
      BSOA: [110, 100, 90, 80], BSIS: [180, 160, 140, 130], BSRTCS: [160, 140, 130, 120],
      ART: [100, 90, 80, 70], BACOMM: [90, 80, 70, 60], BSHM: [170, 150, 130, 110],
      BSMA: [150, 130, 120, 100], BSCE: [200, 180, 160, 140]
    },
    "2026": {
      ASCT: [240, 220, 190, 170], BSCS: [220, 200, 180, 160], BSIT: [270, 250, 230, 210],
      BAMM: [160, 140, 130, 120], BSAIS: [140, 120, 110, 100], BSA: [250, 230, 210, 190],
      BSOA: [120, 110, 100, 90], BSIS: [190, 170, 150, 140], BSRTCS: [170, 150, 140, 130],
      ART: [110, 100, 90, 80], BACOMM: [100, 90, 80, 70], BSHM: [180, 160, 140, 120],
      BSMA: [160, 140, 130, 110], BSCE: [210, 190, 170, 150]
    }
  };

  const categoryLabels = ["Online", "Walk-in", "Registrants", "Enrollees"];
  const colorPalette = ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"];
  let conversionChart;
  const ctx = document.getElementById("conversionChart").getContext("2d");

// function to get the top 5 programs based on 'Enrollees' count (last index in array)
  function getTop5Programs(data) {
    return Object.entries(data)
      .map(([prog, vals]) => [prog, vals[3]]) // sort by enrollees (index 3)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(entry => entry[0]);
  }

// updates the stacked bar chart based on year and view mode (all or top 5)
  function updateConversionChart(year, mode) {
    const yearData = dummyConversionData[year];
    const labels = mode === 'top5' ? getTop5Programs(yearData) : Object.keys(yearData);

// each dataset represents a stage in the funnel (online, walk-in, etc.)
    const datasets = categoryLabels.map((label, i) => ({
      label,
      data: labels.map(prog => yearData[prog][i]),
      backgroundColor: colorPalette[i],
      stack: 'stack1',
      borderRadius: 4
    }));

    if (conversionChart) {

// if chart exists, update its data
      conversionChart.data.labels = labels;
      conversionChart.data.datasets = datasets;
      conversionChart.update();
    } else {

// create the chart for the first time
      conversionChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 800,
            easing: 'easeOutQuart'
          },
          plugins: {
            title: {
              display: true,
            },
            tooltip: {
              callbacks: {
                label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}`
              }
            }
          },
          scales: {
            x: { stacked: true },
            y: { stacked: true, beginAtZero: true, ticks: { precision: 0 } }
          }
        }
      });
    }
  }

  // select elements for controlling year and view mode
  const yearSelector = document.getElementById('conversionYearSelector');
  const viewSelector = document.getElementById('conversionViewSelector');

// event listeners: Update chart when selectors change
  [yearSelector, viewSelector].forEach(el => {
    el.addEventListener('change', () => {
      updateConversionChart(yearSelector.value, viewSelector.value);
    });
  });

 // initial chart render using default values
  updateConversionChart("2024", "all");
});

// mini bar

// labels and colors used in mini conversion chart
const categoryLabels = ['Online Inquirers', 'Walk-in Inquirers', 'Registrants', 'Enrollees'];
const colorPalette = ['#60A5FA', '#34D399', '#FBBF24', '#F87171'];

// small dataset for demo/testing purposes
const dummyConversionData = {
  "2024": {
    "Program A": [1, 2, 1, 1],
    "Program B": [1, 1, 3, 1],
    "Program C": [5, 1, 1, 1],
    "Program D": [1, 3, 1, 1]
  }
};

window.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("miniConversionChart").getContext("2d");

  const aggregate = [0, 0, 0, 0];
  Object.values(dummyConversionData["2024"]).forEach(arr => {
    arr.forEach((num, i) => aggregate[i] += num);
  });

 // create a minimalist bar chart to show total conversions across all programs 
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: categoryLabels,
      datasets: [{
        data: aggregate,
        backgroundColor: colorPalette,
        borderRadius: 10,
        barPercentage: 0.6,
        categoryPercentage: 1.0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.label}: ${ctx.parsed.y}`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            display: false 
          }
        },
        y: {
          beginAtZero: true,
          grid: { display: false },
          ticks: { precision: 0 }
        }
      }
    }
  });
});
