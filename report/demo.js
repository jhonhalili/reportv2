document.addEventListener("DOMContentLoaded", function () {

// 1. default fallback values - define default data structure in case no data is available
// this ensures charts will always have something to display even if no real data is loaded  
  const defaultData = {
  age: [
    { category: "17-19", value: 0 },
    { category: "20-22", value: 0 },
    { category: "23-25", value: 0 },
    { category: "26+", value: 0 }
  ],
  gender: [
    { category: "Male", value: 0 },
    { category: "Female", value: 0 },
    { category: "Other", value: 0 }
  ],
  yearLevel: [
    { category: "1st Year", value: 0 },
    { category: "2nd Year", value: 0 },
    { category: "3rd Year", value: 0 },
    { category: "4th Year", value: 0 }
  ],
  admissionType: [
    { category: "New", value: 0 },
    { category: "Transferee", value: 0 },
    { category: "Returnee", value: 0 }
  ]
};

// try to get demographic data from global window object, fall back to empty object if not available
  const demographicData = window.demographics || {};

// 2. DOM elements - get references to all the HTML elements we need to work with
  const yearSelect = document.getElementById("filterYear");
  const campusSelect = document.getElementById("filterCampus");
  const programSelect = document.getElementById("filterProgram");

 // get chart contexts (the canvases where charts will be drawn)
  const ctxAdmissionType = document.getElementById("admissionChart")?.getContext("2d");
  const ctxAge = document.getElementById("ageChart")?.getContext("2d");
  const ctxGender = document.getElementById("genderChart")?.getContext("2d");
  const ctxYearLevel = document.getElementById("yearLevelChart")?.getContext("2d");

// error handling: check if all chart canvases were found
  if (!ctxAge || !ctxGender || !ctxYearLevel || !ctxAdmissionType) {
    console.error("One or more chart canvases not found. Check your HTML IDs.");
    return;
  }

// 3. helper functions - utilities to extract data in the format needed by charts
  function extractLabels(dataArray) {
    // safely extract category labels from data objects
    return Array.isArray(dataArray)
      ? dataArray.map(obj => obj.category || "")
      : [];
  }

  function extractValues(dataArray) {
    // safely extract numerical values from data objects (default to 0 if missing)
    return Array.isArray(dataArray)
      ? dataArray.map(obj => obj.value ?? 0)
      : [];
  }

// 4. chart instances - create all charts with initial dummy data
// this ensures charts are rendered immediately, even before real data loads

  // age chart (line chart)
  const ageChart = new Chart(ctxAge, {
    type: 'line',
    data: {
      labels: extractLabels(defaultData.age),
      datasets: [{
        label: 'Age Group',
        data: extractValues(defaultData.age),
        fill: false,
        borderColor: '#4CAF50',
        backgroundColor: '#4CAF50',
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  // gender chart (doughnut chart)
  const genderChart = new Chart(ctxGender, {
    type: 'doughnut',
    data: {
      labels: extractLabels(defaultData.gender),
      datasets: [{
        data: extractValues(defaultData.gender),
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56']
      }]
    },
    options: { responsive: true }
  });

  // year Level chart (horizontal bar chart)
  const yearLevelChart = new Chart(ctxYearLevel, {
    type: 'bar',
    data: {
      labels: extractLabels(defaultData.yearLevel),
      datasets: [{
        label: 'Year Level',
        data: extractValues(defaultData.yearLevel),
        backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#9C27B0']
      }]
    },
    options: {
      responsive: true,
      indexAxis: 'y',
      scales: {
        x: { beginAtZero: true }
      }
    }
  });

  // admission Type chart (pie chart)
  const admissionTypeChart = new Chart(ctxAdmissionType, {
    type: 'pie',
    data: {
      labels: extractLabels(defaultData.admissionType),
      datasets: [{
        data: extractValues(defaultData.admissionType),
        backgroundColor: ['#8BC34A', '#00BCD4', '#FF9800']
      }]
    },
    options: { responsive: true }
  });

// 5. chart updater function - updates all charts with new data based on current filter selections
  function updateCharts() {

// get current filter values
    const year = yearSelect.value;
    const campus = campusSelect.value;
    const program = programSelect.value;

// get data for current filters, falling back to default if no data exists
// uses optional chaining to safely navigate nested data structure
  
    const data = demographicData?.[year]?.[campus]?.[program] || defaultData;

// update each chart with new data:

    // AGE
    ageChart.data.labels = extractLabels(data.age);
    ageChart.data.datasets[0].data = extractValues(data.age);
    ageChart.update();

    // GENDER
    genderChart.data.labels = extractLabels(data.gender);
    genderChart.data.datasets[0].data = extractValues(data.gender);
    genderChart.update();

    // YEAR LEVEL
    yearLevelChart.data.labels = extractLabels(data.yearLevel);
    yearLevelChart.data.datasets[0].data = extractValues(data.yearLevel);
    yearLevelChart.update();

    // ADMISSION TYPE
    admissionTypeChart.data.labels = extractLabels(data.admissionType);
    admissionTypeChart.data.datasets[0].data = extractValues(data.admissionType);
    admissionTypeChart.update();
  }

// 6. event listeners - Set up filters to update charts when selection changes
  yearSelect.addEventListener("change", updateCharts);
  campusSelect.addEventListener("change", updateCharts);
  programSelect.addEventListener("change", updateCharts);

// 7. initial draw - Update charts with initial data when page loads
  updateCharts();
});
