
// Function to open a panel and apply the fade-in animation
    function openPanel(id) {

// hide dashboard grid  
    document.getElementById('dashboard-grid').classList.add('hidden'); 

// get the target panel
    const panel = document.getElementById(id); 
    
// show panel
    panel.classList.remove('hidden');
    
// fade-in animation
    panel.classList.add('fade-shadow-in'); 
  }

// function to close the panel and apply the fade-out animation
    function closePanel() {
      const visiblePanel = document.querySelector('#fullscreen-panels > div:not(.hidden)');
        if (visiblePanel) {
          visiblePanel.classList.remove('fade-shadow-in');
          visiblePanel.classList.add('fade-shadow-out');
  
// wait for the fade-out animation to finish before hiding it
      setTimeout(() => {
        visiblePanel.classList.add('hidden');
        visiblePanel.classList.remove('fade-shadow-out');
        document.getElementById('dashboard-grid').classList.remove('hidden');
      }, 300); 
    }
  }

// donut chart (program chart distribution)
// holds reference to the Chart.js donut chart
  let donutChart;

// stores loaded data from JSON file
  let programData = {};
  
// creates a new donut chart with given labels, data, and colors
  function createDonutChart(labels, data, backgroundColors) {
    const ctx = document.getElementById('donutChart').getContext('2d');

// destroy existing chart instance before creating new one
    if (donutChart) donutChart.destroy(); 
  
    donutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: backgroundColors,
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false, // important!
        responsive: true,
        plugins: {
          legend: { display: false }, // hide legend for cleaner UI
          datalabels: {
            formatter: (value, ctx) => {
              const dataArr = ctx.chart.data.datasets[0].data;
              const total = dataArr.reduce((acc, val) => acc + val, 0);
              const percentage = (value / total * 100).toFixed(1);
              return `${percentage}%`;
            },
            color: '#333',
            font: {
              weight: 'bold'
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                return `${context.label}: ${context.parsed} students`;
              }
            }
          }
        },
        cutout: '65%'
      },
      plugins: [ChartDataLabels] // enables data labels plugin
    });
  }
  
// generates HSL-based distinct colors for chart slices
  function generateColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(`hsl(${(i * 360 / count)}, 70%, 60%)`);
    }
    return colors;
  }
  
// populates the year selector dropdown with available years
  function populateYearSelector(years) {
    const selector = document.getElementById('yearSelector');
    selector.innerHTML = ''; // clear existing options
    years.forEach(year => {
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      selector.appendChild(option);
    });
  }
  
// updates the donut chart based on selected year
  function updateChart() {
    const selectedYear = document.getElementById('yearSelector').value;
    const programs = programData[selectedYear];
  
    if (!programs) return;
  
    const labels = programs.map(p => p.program);
    const values = programs.map(p => p.value);
    const colors = generateColors(labels.length);
  
    createDonutChart(labels, values, colors);
  
  // update legend list below the chart
    const programList = document.getElementById('programList');
    programList.innerHTML = '';
  
    programs.forEach((program, index) => {
      const item = document.createElement('div');
      item.className = "flex items-center mb-2";
      item.innerHTML = `
        <div class="w-4 h-4 mr-2 rounded-full" style="background-color:${colors[index]}"></div>
        <span>${program.program}</span>
      `;
      programList.appendChild(item);
    });
  }
  
  // Load JSON
  fetch('programData.json')
    .then(response => response.json())
    .then(data => {
      programData = data;
      const availableYears = Object.keys(programData);
      populateYearSelector(availableYears);
      updateChart();
    })
    .catch(error => console.error('Error loading program data:', error));
  
  document.getElementById('yearSelector').addEventListener('change', updateChart);

// mini donut chart
function createPreviewChart() {
  const ctx = document.getElementById('previewDonutChart').getContext('2d');
  new Chart(ctx, {
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
