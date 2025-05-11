document.addEventListener("DOMContentLoaded", function () {

// dummy dataset for chart visualization - structured by year > campus > program
  const dummyData = {
    "2024": {
      "Ortigas-Cainta": {
        "BSIT": {
          program: [120],                                   // total enrollees in the program
          age: [30, 60, 20, 10],                      // age group distribution: 17–19, 20–22, 23–25, 26+
          gender: [70, 45, 5],                      // gender distribution: Male, Female, Prefer not to say
          yearLevel: [40, 30, 20, 10]                     // year level distribution: 1st–4th year
        },
        "BSCS": {
          program: [90],
          age: [10, 40, 30, 10],
          gender: [30, 50, 10],
          yearLevel: [25, 25, 25, 15]
        },
      },
      "Cubao": {
        "BSIT": {
          program: [100],
          age: [20, 50, 20, 10],
          gender: [60, 35, 5],
          yearLevel: [35, 25, 25, 15]
        },
        "BSCS": {
          program: [80],
          age: [15, 30, 25, 10],
          gender: [30, 40, 10],
          yearLevel: [25, 20, 20, 15]
        },
      },
    },
    "2025": {
      "Ortigas-Cainta": {
        "BSIT": {
          program: [130],
          age: [40, 70, 30, 10],
          gender: [80, 60, 10],
          yearLevel: [45, 35, 30, 20]
        },
        "BSCS": {
          program: [100],
          age: [20, 50, 20, 10],
          gender: [40, 50, 10],
          yearLevel: [35, 25, 25, 15]
        },
      },
      "Cubao": {
        "BSIT": {
          program: [110],
          age: [30, 60, 25, 10],
          gender: [70, 50, 10],
          yearLevel: [40, 30, 30, 20]
        },
        "BSCS": {
          program: [90],
          age: [25, 40, 15, 10],
          gender: [35, 45, 10],
          yearLevel: [30, 20, 20, 20]
        },
      },
    }
  };

// grab references to the filter dropdowns
  const yearSelect = document.getElementById("filterYear");
  const campusSelect = document.getElementById("filterCampus");
  const programSelect = document.getElementById("filterProgram");

// get chart canvas contexts
  const ctxProgram = document.getElementById("programChart").getContext("2d");
  const ctxAge = document.getElementById("ageChart").getContext("2d");
  const ctxGender = document.getElementById("genderChart").getContext("2d");
  const ctxYearLevel = document.getElementById("yearLevelChart").getContext("2d");

// initialize pie chart for year level (shown under 'Program' label)
  let programChart = new Chart(ctxProgram, {
    type: 'pie',
    data: {
      labels: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
      datasets: [{
        data: [0, 0, 0, 0],
        backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#9C27B0']
      }]
    },
    options: { 
      responsive: true
        } 
  });


// initialize line chart for age group distribution
  let ageChart = new Chart(ctxAge, {
    type: 'line',
    data: {
      labels: ['17-19', '20-22', '23-25', '26+'],
      datasets: [{     
        label: 'Age Group',   
        data: [0, 0, 0, 0],
        backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#9C27B0'],
        borderColor: '#4CAF50',
        tension: 0.5 // smooth curve
      }]
    },
    options: {
      responsive: true}
  });
  
// initialize doughnut chart for gender distribution
  let genderChart = new Chart(ctxGender, {
    type: 'doughnut',
    data: {
      labels: ['Male', 'Female', 'Prefer Not to Say'],
      datasets: [{
        data: [0, 0, 0],
        backgroundColor: ['#36A2EB','#FF6384', '#FFCE56']
      }]
    },
    options: { responsive: true }
  });

// initialize horizontal bar chart for year level
  let yearLevelChart = new Chart(ctxYearLevel, {
    type: 'bar',
    data: {
      labels: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
      datasets: [{
        data: [0, 0, 0, 0],
        backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#9C27B0']
      }]
    },
    options: {
      responsive: true,
      indexAxis: 'y'// horizontal bar direction
    }
  }, 
);

// function to update all charts based on selected filters
  function updateCharts() {
    const year = yearSelect.value;
    const campus = campusSelect.value;
    const program = programSelect.value;
  
// fallback to empty data if selection is invalid or not present
    const data =
      dummyData[year]?.[campus]?.[program] || 
      { program: [], age: [], gender: [], yearLevel: [] };
  
// update data for each chart
    programChart.data.datasets[0].data = data.yearLevel;
    programChart.update();
  
// update Age Range Line
    ageChart.data.datasets[0].data = data.age;
    ageChart.update();
  
// update Gender Doughnut
    genderChart.data.datasets[0].data = data.gender;
    genderChart.update();
  
// update Year Level Horizontal Bar
    yearLevelChart.data.datasets[0].data = data.yearLevel;
    yearLevelChart.update();
  }
  

// attach listeners to dropdown filters so that charts update on change
  yearSelect.addEventListener("change", updateCharts);
  campusSelect.addEventListener("change", updateCharts);
  programSelect.addEventListener("change", updateCharts);

// trigger initial rendering of charts on page load
  updateCharts();
});

