const dummyData = {
  "2024-2025": {
    "ASCT": 80,
    "ART": 60,
    "BSRTCS": 90,
    "BACOMM": 45,
    "BAMMA": 55,
    "BSA": 70,
    "BSAIS": 50,
    "BSCpE": 65,
    "BSCS": 85,
    "BSHM": 75,
    "BSIS": 60,
    "BSIT": 95,
    "BSMA": 40,
    "BSOA": 50
  },
  "2025-2026": {
    "ASCT": 90,
    "ART": 70,
    "BSRTCS": 100,
    "BACOMM": 50,
    "BAMMA": 65,
    "BSA": 80,
    "BSAIS": 55,
    "BSCpE": 70,
    "BSCS": 95,
    "BSHM": 85,
    "BSIS": 70,
    "BSIT": 180,
    "BSMA": 45,
    "BSOA": 75
  }
};

// Color list (reuse same as Panel 1)
const colors = [
  "#4F46E5", "#EC4899", "#22D3EE", "#F59E0B", "#10B981",
  "#EF4444", "#6366F1", "#3B82F6", "#06B6D4", "#F43F5E",
  "#8B5CF6", "#14B8A6", "#F97316", "#0EA5E9"
];

// Generate Year Buttons
const yearButtonsContainer = document.getElementById('year-buttons');
const selectedYearLabel = document.getElementById('selected-year');
let currentYear = "2024-2025"; // Default

Object.keys(dummyData).forEach((year, index) => {
  const button = document.createElement('button');
  button.innerText = year;
  button.className = `text-sm px-4 py-2 rounded ${
    year === currentYear ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
  } transition`;
  button.onclick = () => {
    currentYear = year;
    updateChart();
    updateYearButtons();
  };
  yearButtonsContainer.appendChild(button);
});

function updateYearButtons() {
  Array.from(yearButtonsContainer.children).forEach(btn => {
    btn.className = `text-sm px-4 py-2 rounded ${
      btn.innerText === currentYear ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    } transition`;
  });
  selectedYearLabel.innerText = `Selected Year: ${currentYear}`;
}

// Setup Line Chart
let lineChart;
const ctx = document.getElementById('lineChart').getContext('2d');

function updateChart() {
  const yearData = dummyData[currentYear];
  const programs = Object.keys(yearData);
  const values = Object.values(yearData);

  if (lineChart) {
    lineChart.data.labels = programs;
    lineChart.data.datasets[0].data = values;
    lineChart.update();
    return;
  }

  lineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: programs,
      datasets: [{
        label: 'Enrollees',
        data: values,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: colors,
        pointBorderColor: '#fff',
        pointHoverRadius: 6,
        pointRadius: 4,
      }]
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
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.parsed.y} enrollees`;
            }
          }
        }
      }
    }
  });

  selectedYearLabel.innerText = `Selected Year: ${currentYear}`;
}

updateChart();
updateYearButtons();

// mini line graph

const ctxMini = document.getElementById('miniLineChart').getContext('2d');

new Chart(ctxMini, {
  type: 'line',
  data: {
    labels: ['2024', '2025', '2026'],
    datasets: [{
      label: 'Enrollment',
      data: [1, 4, 3],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      tension: 0.4,
      pointRadius: 3,
      pointBackgroundColor: '#3b82f6',
      fill: true
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
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
          label: (ctx) => `${ctx.raw}  enrollees`
        }
      }
    }
  }
});