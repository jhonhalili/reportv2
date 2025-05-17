
  function openPanel(id) { // function to open a panel and apply the fade-in animation
    document.getElementById('dashboard-grid').classList.add('hidden'); // hide the main dashboard grid to focus on the panel
    const panel = document.getElementById(id); // get reference to the panel element using the provided ID
    panel.classList.remove('hidden'); // make the panel visible by removing hidden class
    panel.classList.add('fade-shadow-in'); // apply fade-in animation by adding animation class
  }

// function to close the panel and apply the fade-out animation
    function closePanel() {

// find the currently visible panel (the one without 'hidden' class)
      const visiblePanel = document.querySelector('#fullscreen-panels > div:not(.hidden)');
        if (visiblePanel) {

// remove fade-in animation and apply fade-out animation
          visiblePanel.classList.remove('fade-shadow-in');
          visiblePanel.classList.add('fade-shadow-out');
  
// wait for the fade-out animation to finish before hiding it
      setTimeout(() => {
// hide the panel and clean up animation classes
        visiblePanel.classList.add('hidden');
        visiblePanel.classList.remove('fade-shadow-out');
        document.getElementById('dashboard-grid').classList.remove('hidden'); // show the main dashboard grid again
      }, 300); 
    }
  }

// initialize the dashboard when DOM content is loaded
  document.addEventListener("DOMContentLoaded", () => {
// check if required enrollment data exists
  if (!programData || !programData.enrollment) {
    console.error("Enrollment data is missing");
    return;
  }

// extract available academic years from the data
  const years = Object.keys(programData.enrollment);
  const yearSelector = document.getElementById("yearSelector");

  let mainChart; // variable to store the current chart instance

  years.forEach((year) => { // populate the year dropdown selector with options
    const option = document.createElement("option");
    option.value = year;
    option.textContent = `${year}-${parseInt(year) + 1}`;
    yearSelector.appendChild(option);
  });

  const updateProgramList = (year) => { // function to update the program list display for a selected year
    const programList = document.getElementById("programList");
    programList.innerHTML = ""; // clear previous entries

// create a list entry for each program in the selected year
    programData.enrollment[year].forEach((item) => {
      const color = colorMap[item.program] || "#999999"; // get the color for this program from the color map

      const entry = document.createElement("div"); // create container for program entry
      entry.className = "flex items-center gap-2 mb-3 text-base font-medium"; // <-- Larger font

      const colorDot = document.createElement("span");  // create colored dot indicator
      colorDot.className = "inline-block w-3 h-3 rounded-full";
      colorDot.style.backgroundColor = color;

      const label = document.createElement("span"); // create text label showing program name and enrollment count
      label.textContent = `${item.name}: ${item.value}`;

// assemble the entry
      entry.appendChild(colorDot);
      entry.appendChild(label);
      programList.appendChild(entry);
    });
  };

// function to update the donut chart for a selected year
  const updateDonutChart = (year) => {
    const ctx = document.getElementById("donutChart").getContext("2d");
    const data = programData.enrollment[year];

// prepare chart data
    const labels = data.map((item) => item.program);
    const values = data.map((item) => item.value);
    const colors = data.map((item) => colorMap[item.program] || "#999999");

// chart configuration options
    const chartData = {
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: colors,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 800,
        easing: "easeInOutCubic",
      },
      plugins: {
        legend: { display: false }, // hide default legend
        tooltip: {
          callbacks: {
            // custom tooltip format showing program and student count
            label: (context) => {
              const label = context.label || "";
              const value = context.raw;
              return `${label}: ${value} students`;
            },
          },
        },
        datalabels: {
          color: "#fff",
          font: {
            weight: "bold",
          },
          // show percentage values in the chart segments
          formatter: (value, ctx) => {
            const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${percentage}%`;
          },
        },
      },
    };

// update existing chart if it exists, otherwise create new one
    if (mainChart) {
      mainChart.data = chartData;
      mainChart.options = chartOptions;
      mainChart.update(); // smooth transition
    } else {
      mainChart = new Chart(ctx, {
        type: "doughnut",
        data: chartData,
        options: chartOptions,
        plugins: [ChartDataLabels], // add datalabels plugin
      });
    }
  };

// add event listener for year selection changes
  yearSelector.addEventListener("change", (e) => {
    const selectedYear = e.target.value;
    updateProgramList(selectedYear);
    updateDonutChart(selectedYear);
  });

// initialize with the first available year
  const defaultYear = years[0];
  yearSelector.value = defaultYear;
  updateProgramList(defaultYear);
  updateDonutChart(defaultYear);
});



// creates a smaller preview donut chart 
function createPreviewChart() {
  const ctx = document.getElementById('previewDonutChart').getContext('2d');
  new Chart(ctx, { // create new chart with sample data
    type: 'doughnut',
    data: {
      labels: ['Sample A', 'Sample B', 'Sample C','Sample D', 'Sample E', 'Sample F',
              'Sample G', 'Sample H', 'Sample I','Sample J', 'Sample K', 'Sample L'],
      datasets: [{
        data: [25, 30, 20, 5, 15, 18, 21, 10, 13, 19, 10, 12, 17, 23],
        backgroundColor: ["#4F46E5", "#EC4899", "#22D3EE", "#F59E0B", "#10B981",
                          "#EF4444", "#6366F1", "#3B82F6", "#06B6D4", "#F43F5E",
                          "#8B5CF6", "#14B8A6", "#F97316", "#0EA5E9"],
        borderWidth: 1
      }]
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
      cutout: '70%'
    }
  });
}

// initialize the preview chart when the page loads
window.addEventListener('DOMContentLoaded', createPreviewChart);
