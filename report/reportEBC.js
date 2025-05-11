const regionsByIsland = {

// region by island group
  "Luzon": ["NCR", "Region I", "Region II", "Region III", "Region IV-A", "Region IV-B", "Region V"],
  "Visayas": ["Region VI", "Region VII", "Region VIII"],
  "Mindanao": ["Region X", "Region XI", "Region XII", "Region XIII"]
};


// purpose: used to categorize STI regions under their respective island clusters (Luzon, Visayas, Mindanao).
// this helps when filtering, visualizing, or grouping data


// campuses grouped by their respective regions
const campusesByRegion = {
  "NCR": ["Alabang", "Caloocan", "Cubao", "Fairview", "Global City", "Las Piñas", "Marikina",
          "Munoz-EDSA", "Novaliches", "Pasay-EDSA", "Sta. Mesa", "NAMEI"],
  "Region I": ["Alaminos","Dagupan", "Laoag", "Vigan"],
  "Region II": ["Cauayan"],
  "Region III": ["Balagtas", "Baliuag", "Malolos", "Meycauayan", "San Fernando", "San Jose Del Monte",
                "San Jose Nueva Ecija", "Sta. Maria", "Tarlac"],
  "Region IV-A": ["Bacoor", "Balayan", "Batangas", "Calamba", "Carmona", "Dasmariñas", "Lipa", "Lucena",
                "Ortigas-Cainta","Rosario","San Pablo","Santa Rosa","Sta. Cruz","Tagaytay","Tanauan","Tanay"],
  "Region IV-B": ["Puerto Princesa"],
  "Region V": ["Legazpi", "Naga"],
  "Region VI": ["Bacolod - West Negros University", "Kalibo"],
  "Region VII": ["Dumaguete"],
  "Region VIII": ["Calbayog", "Maasin", "Ormoc"],
  "Region X": ["Cagayan de Oro", "Iligan", "Malaybalay", "Valencia"],
  "Region XI": ["Davao", "Tagum"],
  "Region XII": ["General Santos", "Koronadal", "Tacurong"],
  "Region XIII": ["Surigao"]
};

// purpose: maps each region to its corresponding STI campuses, essential for filtering and data grouping
// define a unique color for each campus to use consistently in visualizations (charts, legends, maps, etc.)

const campusColors = {
  "Alabang": "#60A5FA", "Caloocan": "#A78BFA", "Cubao": "#F87171", "Fairview": "#34D399", "Global City": "#FBBF24",
  "Las Piñas": "#F472B6", "Marikina": "#38BDF8", "Munoz-EDSA": "#C084FC", "Novaliches": "#FACC15", "Pasay-EDSA": "#4ADE80",
  "Sta. Mesa": "#FB923C", "NAMEI": "#F87171", "Alaminos": "#60A5FA", "Dagupan": "#A78BFA", "Laoag": "#F87171", "Vigan": "#34D399",
  "Cauayan": "#FBBF24", "Balagtas": "#F472B6", "Baliuag": "#38BDF8", "Malolos": "#C084FC", "Meycauayan": "#FACC15",
  "San Fernando": "#4ADE80", "San Jose Del Monte": "#FB923C", "San Jose Nueva Ecija": "#F87171", "Sta. Maria": "#60A5FA",
  "Tarlac": "#A78BFA", "Bacoor": "#F87171", "Balayan": "#34D399", "Batangas": "#FBBF24", "Calamba": "#F472B6", "Carmona": "#38BDF8",
  "Dasmariñas": "#C084FC", "Lipa": "#FACC15", "Lucena": "#4ADE80", "Ortigas-Cainta": "#FB923C", "Rosario": "#F87171",
  "San Pablo": "#60A5FA", "Santa Rosa": "#A78BFA", "Sta. Cruz": "#F87171", "Tagaytay": "#34D399", "Tanauan": "#FBBF24",
  "Tanay": "#F472B6", "Puerto Princesa": "#38BDF8", "Legazpi": "#C084FC", "Naga": "#FACC15",
  "Bacolod - West Negros University": "#4ADE80", "Kalibo": "#FB923C", "Dumaguete": "#F87171", "Calbayog": "#60A5FA",
  "Maasin": "#A78BFA", "Ormoc": "#F87171", "Cagayan de Oro": "#34D399", "Iligan": "#FBBF24", "Malaybalay": "#F472B6",
  "Valencia": "#38BDF8", "Davao": "#C084FC", "Tagum": "#FACC15", "General Santos": "#4ADE80", "Koronadal": "#FB923C",
  "Tacurong": "#F87171", "Surigao": "#60A5FA"
};

// purpose: to make sure that each campus has a visually 
// distinct and consistent color for charting purposes (e.g., donut chart segments, bar colors).
// dummy data for campus enrollment by academic year

const dummyEnrollmentData = {
  "2024-2025": {

 // each key is a campus name; value is number of enrollees

    //NCR
    "Alabang": 120, "Caloocan": 95, "Cubao": 110, "Fairview": 130, "Global City": 200,
    "Las Piñas": 100, "Marikina": 150, "Munoz-EDSA": 175,
    "Novaliches": 140, "Pasay-EDSA": 132, "Sta. Mesa": 191, "NAMEI": 230,
  //region I
    "Alaminos": 60, "Dagupan": 100, "Laoag": 80, "Vigan": 70,
  //region II
    "Cauayan": 50,
  //region III
    "Balagtas": 75, "Baliuag": 90, "Malolos": 150, "Meycauayan": 105, "San Fernando": 144, "San Jose Del Monte": 190,
    "San Jose Nueva Ecija": 140, "Sta. Maria": 150, "Tarlac": 80,
  //region IV-A
    "Bacoor": 75, "Balayan": 25, "Batangas": 150, "Calamba": 200, "Carmona": 40, "Dasmariñas": 140, "Lipa": 100,
    "Lucena": 110, "Ortigas-Cainta": 500,  "Rosario": 205, "San Pablo": 170, "Santa Rosa": 160, "Sta. Cruz": 90,
    "Tagaytay": 320, "Tanauan": 290, "Tanay": 315,
  //region IV-B
    "Puerto Princesa": 100,
  //region V 
    "Legazpi": 50, "Naga": 75,
  //Region VI
    "Bacolod - West Negros University": 500, "Kalibo": 390,
  //Region VII 
    "Dumaguete": 75,
  //Region VIII
    "Calbayog": 75, "Maasin": 50, "Ormoc": 60,
  //Region X
    "Cagayan de Oro": 250, "Iligan": 100, "Malaybalay": 175, "Valencia": 150,
  //Region XI
    "Davao": 250, "Tagum": 175,
  //Region XII
    "General Santos": 350, "Koronadal": 200, "Tacurong": 150,
  //Region XIII
    "Surigao": 78
  },
  "2025-2026": {
    //NCR
    "Alabang": 220, "Caloocan": 295, "Cubao": 210, "Fairview": 230, "Global City": 250,
    "Las Piñas": 200, "Marikina": 250, "Munoz-EDSA": 275,
    "Novaliches": 240, "Pasay-EDSA": 232, "Sta. Mesa": 291, "NAMEI": 200,
  //region I
    "Alaminos": 160, "Dagupan": 200, "Laoag": 180, "Vigan": 170,
  //region II
    "Cauayan": 150,
  //region III
    "Balagtas": 175, "Baliuag": 190, "Malolos": 150, "Meycauayan": 155, "San Fernando": 244, "San Jose Del Monte": 290,
    "San Jose Nueva Ecija": 240, "Sta. Maria": 250, "Tarlac": 180,
  //region IV-A
    "Bacoor": 175, "Balayan": 125, "Batangas": 250, "Calamba": 260, "Carmona": 140, "Dasmariñas": 150, "Lipa": 200,
    "Lucena": 210, "Ortigas-Cainta": 700,  "Rosario": 255, "San Pablo": 170, "Santa Rosa": 160, "Sta. Cruz": 330,
    "Tagaytay": 360, "Tanauan": 290, "Tanay": 215,
  //region IV-B
    "Puerto Princesa": 170,
  //region V 
    "Legazpi": 150, "Naga": 175,
  //Region VI
    "Bacolod - West Negros University": 500, "Kalibo": 490,
  //Region VII 
    "Dumaguete": 95,
  //Region VIII
    "Calbayog": 155, "Maasin": 100, "Ormoc": 80,
  //Region X
    "Cagayan de Oro": 230, "Iligan": 150, "Malaybalay": 195, "Valencia": 250,
  //Region XI
    "Davao": 200, "Tagum": 275,
  //Region XII
    "General Santos": 450, "Koronadal": 300, "Tacurong": 250,
  //Region XIII
    "Surigao": 80
  }
};

let campusChart;

// holds the Chart.js instance for the campus enrollment bar chart.
// this ensures we can update it later instead of recreating it

function renderRegionButtons(island, selectedRegion = null) {
  const container = document.getElementById('regionButtons');
  container.innerHTML = '';
  
// for each region under the selected island group (Luzon, Visayas, Mindanao),
// create a button to represent it
  regionsByIsland[island].forEach(region => {
    const btn = document.createElement('button');
    btn.textContent = region;
    
// add different styles depending on whether this region is currently selected
    btn.className = `text-sm px-4 py-2 rounded transition ${
      region === selectedRegion 
        ? 'bg-blue-600 text-white' 
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`;
    
    btn.onclick = () => {
      updateCampusChart(region);  // update chart based on selected region
      renderRegionButtons(island, region); // re-render buttons to update the selected state
    };
    
    container.appendChild(btn); // add button to the region button container
  });
}

function updateCampusChart(region) {
  const year = document.getElementById("campusYearFilter").value; // get selected year
  const campuses = campusesByRegion[region] || []; // get campuses under selected region

  const labels = [];
  const data = [];
  const backgroundColors = [];

// loop through each campus and gather enrollment data
  campuses.forEach(campus => {
    labels.push(campus); // add campus name to chart labels
    data.push(dummyEnrollmentData[year][campus] || 0); // push enrollment value or 0 if missing
    backgroundColors.push(campusColors[campus] || "#f9fafb"); // use assigned color or fallback
  });

// construct the dataset and labels for Chart.js 
  const chartData = {
    labels: labels,
    datasets: [{
      label: 'Enrollees',
      data: data,
      backgroundColor: backgroundColors,
      borderRadius: 6 // rounded corners for bars
    }]
  };

// chart options for appearance and behavior
  const options = {
    indexAxis: 'y', // makes the bar chart horizontal
    responsive: true,
    plugins: {
      legend: { display: false }, // no legend since data is self-explanatory
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.label}: ${ctx.raw}` // show campus and enrollment count
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { precision: 0 } // integers on x-axis
      }
    }
  };

// if the chart already exists, update it with new data
  if (campusChart) {
    campusChart.data = chartData;
    campusChart.options = options;
    campusChart.update();
  } else {
// if not, create a new Chart.js bar chart instance
    const ctx = document.getElementById("campusEnrollmentChart").getContext("2d");
    campusChart = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: options
    });
  }
}

// event listener for island group dropdown (Luzon, Visayas)
document.getElementById("islandGroupFilter").addEventListener("change", () => {
  renderRegionButtons(document.getElementById("islandGroupFilter").value);
});

// event listener for year dropdown filter
document.getElementById("campusYearFilter").addEventListener("change", () => {
  const activeButton = document.querySelector('#regionButtons button.active');
  if (activeButton) updateCampusChart(activeButton.textContent);
});

renderRegionButtons("Luzon");
