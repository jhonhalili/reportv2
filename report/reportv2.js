// Function to open a panel and apply the fade-in animation
function openPanel(id) {
    document.getElementById('dashboard-grid').classList.add('hidden');
  
    const panel = document.getElementById(id);
    panel.classList.remove('hidden');
    panel.classList.add('fade-shadow-in');
  }
  

// Function to close the panel and apply the fade-out animation
function closePanel() {
    const visiblePanel = document.querySelector('#fullscreen-panels > div:not(.hidden)');
    if (visiblePanel) {
      visiblePanel.classList.remove('fade-shadow-in');
      visiblePanel.classList.add('fade-shadow-out');
  
      // Wait for the fade-out animation to finish before hiding it
      setTimeout(() => {
        visiblePanel.classList.add('hidden');
        visiblePanel.classList.remove('fade-shadow-out');
        document.getElementById('dashboard-grid').classList.remove('hidden');
      }, 300); // Match the duration of the fade out animation (0.3s)
    }
  }

  let donutChart;
  let programData = {};
  
  function createDonutChart(labels, data, backgroundColors) {
    const ctx = document.getElementById('donutChart').getContext('2d');
    if (donutChart) donutChart.destroy(); // Destroy previous chart
  
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
        maintainAspectRatio: false, // Important!
        responsive: true,
        plugins: {
          legend: { display: false },
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
      plugins: [ChartDataLabels]
    });
  }
  
  function generateColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(`hsl(${(i * 360 / count)}, 70%, 60%)`);
    }
    return colors;
  }
  
  function populateYearSelector(years) {
    const selector = document.getElementById('yearSelector');
    selector.innerHTML = ''; // Clear first
    years.forEach(year => {
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      selector.appendChild(option);
    });
  }
  
  function updateChart() {
    const selectedYear = document.getElementById('yearSelector').value;
    const programs = programData[selectedYear];
  
    if (!programs) return;
  
    const labels = programs.map(p => p.program);
    const values = programs.map(p => p.value);
    const colors = generateColors(labels.length);
  
    createDonutChart(labels, values, colors);
  
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

// mini chart

function createPreviewChart() {
  const ctx = document.getElementById('previewDonutChart').getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Sample A', 'Sample B', 'Sample C'],
      datasets: [{
        data: [30, 50, 20],
        backgroundColor: ['#4F46E5', '#10B981', '#F59E0B'],
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

// Run after page loads
window.addEventListener('DOMContentLoaded', createPreviewChart);
