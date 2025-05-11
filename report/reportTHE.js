document.addEventListener("DOMContentLoaded", function () {
// enrollment data for each year (top 14 programs, we'll extract top 5 later)
    const top5Data = {
      "2024": { ASCT: 210, BSCS: 180, BSIT: 300, BAMM: 160, BSAIS: 130, BSA: 220, BSOA: 100, BSIS: 175, BSRTCS: 145, ART: 95, BACOMM: 80, BSHM: 150, BSMA: 135, BSCE: 190 },
      "2025": { ASCT: 180, BSCS: 150, BSIT: 260, BAMM: 140, BSAIS: 110, BSA: 200, BSOA: 90, BSIS: 160, BSRTCS: 130, ART: 85, BACOMM: 75, BSHM: 140, BSMA: 125, BSCE: 170 },
      "2026": { ASCT: 160, BSCS: 130, BSIT: 240, BAMM: 120, BSAIS: 100, BSA: 190, BSOA: 85, BSIS: 150, BSRTCS: 110, ART: 75, BACOMM: 65, BSHM: 130, BSMA: 115, BSCE: 150 }
    };

// color mapping per program (acronym-based)  
    const colorMap = {
      ASCT: '#FF6384', ART: '#36A2EB', BSRTCS: '#FFCE56', BACOMM: '#4BC0C0',
      BAMM: '#9966FF', BSA: '#FF9F40', BSAIS: '#8AC926', BSCE: '#00BFA6',
      BSCS: '#F94144', BSHM: '#577590', BSIS: '#FF6B6B', BSIT: '#1982C4',
      BSMA: '#6A4C93', BSOA: '#D7263D'
    };
  
    let top5Chart;
    const canvas = document.getElementById('top5BarChart');
    if (!canvas) return; // stop if the canvas doesn't exist
    const ctxTop5 = canvas.getContext('2d');

// highlight top bar, fade others by adding transparency    
    function getEnhancedColors(labels) {
      return labels.map((acr, index) => {
        const baseColor = colorMap[acr] || '#ccc';
        return index === 0 ? baseColor : baseColor + '88'; // fade others
      });
    }

// create/update chart for selected year
    function updateTop5Chart(year) {
      const yearData = top5Data[year];
// get top 5 programs based on enrollees (desc order)
      const sortedEntries = Object.entries(yearData).sort((a, b) => b[1] - a[1]).slice(0, 5);

      const labels = sortedEntries.map(entry => entry[0]);
      const data = sortedEntries.map(entry => entry[1]);
      const bgColors = getEnhancedColors(labels);

      if (top5Chart) {

// for update existing chart
        top5Chart.data.labels = labels;
        top5Chart.data.datasets[0].data = data;
        top5Chart.data.datasets[0].backgroundColor = bgColors;
        top5Chart.options.plugins.title.text = `Top 5 Programs in ${year}`;
        top5Chart.update();
      } else {
      
 // initialize chart if it doesn't exist        
        top5Chart = new Chart(ctxTop5, {
          type: 'bar',
          data: {
            labels,
            datasets: [{
              label: 'Enrollees',
              data,
              backgroundColor: bgColors,
              borderRadius: 10 // rounded bars
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 800,
              easing: 'easeOutQuart'
            },
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (ctx) => `${ctx.parsed.y} enrollees`
                }
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: { precision: 0 }
              }
            }
          }
        });
      }
    }
  
// year dropdown selector    
    const yearSelector = document.getElementById('top5YearSelector');
    if (yearSelector) {
      yearSelector.addEventListener('change', (e) => {
        updateTop5Chart(e.target.value);
      });
    }
  
// render default year (2024) on load
    updateTop5Chart("2024");
  });

// mini chart
  document.addEventListener("DOMContentLoaded", function () {
    const miniTop5Ctx = document.getElementById('miniTop5Chart')?.getContext('2d');
    if (!miniTop5Ctx) return;
  
// top 5 data for 2024 only
    const miniTop5Data2024 = {
      ASCT: 210, BSCS: 180, BSIT: 300, BAMM: 160, BSAIS: 130, BSA: 220, BSOA: 100,
      BSIS: 175, BSRTCS: 145, ART: 95, BACOMM: 80, BSHM: 150, BSMA: 135, BSCE: 190
    };
  
// color map
    const colorMap = {
      ASCT: '#FF6384', ART: '#36A2EB', BSRTCS: '#FFCE56', BACOMM: '#4BC0C0',
      BAMM: '#9966FF', BSA: '#FF9F40', BSAIS: '#8AC926', BSCE: '#00BFA6',
      BSCS: '#F94144', BSHM: '#577590', BSIS: '#FF6B6B', BSIT: '#1982C4',
      BSMA: '#6A4C93', BSOA: '#D7263D'
    };
  
// extract top 5 programs by highest values
    const top5 = Object.entries(miniTop5Data2024)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  
    const labels = top5.map(item => item[0]);
    const values = top5.map(item => item[1]);
    const bgColors = labels.map(label => colorMap[label] || '#ccc');
  
// initialize the mini bar chart
    new Chart(miniTop5Ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          data: values,
          backgroundColor: bgColors,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.parsed.y} enrollees`
            }
          }
        },
        scales: {
          x: {
            ticks: { color: '#333' },
             display: false // hide x-axis labels
          },
          y: {
            beginAtZero: true,
            ticks: { precision: 0 },
            grid: { display: false } // for cleaner look
          }
        }
      }
    });
  });
  
