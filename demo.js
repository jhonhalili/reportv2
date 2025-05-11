const demographicData = {
  "2024": {
    "Ortigas-Cainta": {
      "BSIT": {
        "gender": { "Male": 100, "Female": 80, "Prefer not to say": 5 },
        "age": { "18-20": 50, "21-23": 80, "24-26": 55 },
        "yearLevel": { "1st Year": 60, "2nd Year": 50, "3rd Year": 40, "4th Year": 35 }
      },
      "BSCS": {
        "gender": { "Male": 90, "Female": 70, "Prefer not to say": 3 },
        "age": { "18-20": 40, "21-23": 70, "24-26": 53 },
        "yearLevel": { "1st Year": 50, "2nd Year": 40, "3rd Year": 30, "4th Year": 20 }
      }
    },
    "Cubao": {
      "BSIT": {
        "gender": { "Male": 60, "Female": 45, "Prefer not to say": 2 },
        "age": { "18-20": 40, "21-23": 45, "24-26": 22 },
        "yearLevel": { "1st Year": 40, "2nd Year": 30, "3rd Year": 25, "4th Year": 12 }
      },
      "BSCS": {
        "gender": { "Male": 80, "Female": 80, "Prefer not to say": 2 },
        "age": { "18-20": 45, "21-23": 75, "24-26": 63 },
        "yearLevel": { "1st Year": 90, "2nd Year": 60, "3rd Year": 40, "4th Year": 30 }
      }
    }
  },
  "2025": {
    "Ortigas-Cainta": {
      "BSIT": {
        "gender": { "Male": 150, "Female": 70, "Prefer not to say": 5 },
        "age": { "18-20": 60, "21-23": 90, "24-26": 65 },
        "yearLevel": { "1st Year": 80, "2nd Year": 80, "3rd Year": 40, "4th Year": 35 }
      },
      "BSCS": {
        "gender": { "Male": 120, "Female": 60, "Prefer not to say": 3 },
        "age": { "18-20": 70, "21-23": 130, "24-26": 50 },
        "yearLevel": { "1st Year": 100, "2nd Year": 80, "3rd Year": 60, "4th Year": 20 }
      }
    },
    "Cubao": {
      "BSIT": {
        "gender": { "Male": 90, "Female": 35, "Prefer not to say": 2 },
        "age": { "18-20": 90, "21-23": 125, "24-26": 22 },
        "yearLevel": { "1st Year": 140, "2nd Year": 130, "3rd Year": 105, "4th Year": 92 }
      },
      "BSCS": {
        "gender": { "Male": 190, "Female": 120, "Prefer not to say": 2 },
        "age": { "18-20": 80, "21-23": 55, "24-26": 43 },
        "yearLevel": { "1st Year": 190, "2nd Year": 160, "3rd Year": 140, "4th Year": 30 }
      }
    }
  }
};

const yearSelectus = document.getElementById("filterYearsss");
const campusSelect = document.getElementById("filterCampusss");
const programSelect = document.getElementById("filterProgramsss");

[yearSelectus, campusSelect, programSelect].forEach(select => {
  select.addEventListener("change", updateCharts);
});

let genderChart, ageChart, yearLevelChart, programChart;

function accumulateData(target, source) {
  for (const key in source) {
    target[key] = (target[key] || 0) + source[key];
  }
}

function updateChart(chart, data, label = "") {
  chart.data.labels = Object.keys(data);
  chart.data.datasets[0].data = Object.values(data);
  if (label) chart.data.datasets[0].label = label;
  chart.update();
}

function updateCharts() {
  const year = yearSelectus.value;
  const campus = campusSelect.value;
  const program = programSelect.value;

  let gender = {};
  let age = {};
  let yearLevel = {};
  let programYearData = {};

  if (demographicData[year]) {
    const campusData = campus === "All" ? demographicData[year] : { [campus]: demographicData[year][campus] };

    Object.entries(campusData).forEach(([campusName, programs]) => {
      const programsData = program === "All" ? programs : { [program]: programs[program] };

      Object.entries(programsData).forEach(([programName, p]) => {
        accumulateData(gender, p.gender);
        accumulateData(age, p.age);
        accumulateData(yearLevel, p.yearLevel);

        if (!programYearData[programName]) programYearData[programName] = {};
        accumulateData(programYearData[programName], p.yearLevel);
      });
    });
  }

  updateChart(genderChart, gender);
  updateChart(ageChart, age);
  updateChart(yearLevelChart, yearLevel);
  renderProgramChart(programYearData, program);
}

function renderProgramChart(programData, selectedProgram = null) {
  const ctxProgram = document.getElementById("programChart").getContext("2d");

  let data;
  if (selectedProgram !== "All" && selectedProgram && programData[selectedProgram]) {
    data = {
      labels: Object.keys(programData[selectedProgram]),
      datasets: [{
        label: `Year Levels for ${selectedProgram}`,
        data: Object.values(programData[selectedProgram]),
        backgroundColor: ["#4BC0C0", "#36A2EB", "#FFCE56", "#FF6384"]
      }]
    };
  } else {
    const labels = Object.keys(programData);
    const values = labels.map(prog =>
      Object.values(programData[prog]).reduce((a, b) => a + b, 0)
    );
    data = {
      labels,
      datasets: [{
        label: "Total Enrollees per Program",
        data: values,
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"]
      }]
    };
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      
    }
  };

  if (programChart) programChart.destroy();
  programChart = new Chart(ctxProgram, {
    type: selectedProgram !== "All" && selectedProgram ? "bar" : "pie",
    data,
    options
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const ctxGender = document.getElementById("genderChart").getContext("2d");
  genderChart = new Chart(ctxGender, {
    type: 'doughnut',
    data: {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: ["#36A2EB", "#FF6384", "#CCCCCC"]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right'
        }
      }
    }
  });

  const ctxAge = document.getElementById("ageChart").getContext("2d");
  ageChart = new Chart(ctxAge, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Age Distribution',
        data: [],
        backgroundColor: "#4bc0c0"
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  const ctxYearLevel = document.getElementById("yearLevelChart").getContext("2d");
  yearLevelChart = new Chart(ctxYearLevel, {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: "Number of Students",
        data: [],
        backgroundColor: ["#4BC0C0", "#36A2EB", "#FFCE56", "#FF6384"],
        maxBarThickness: 40
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { beginAtZero: true },
        y: {
          ticks: { font: { weight: 'bold' } }
        }
      }
    }
  });

  updateCharts(); // Initial render
});
