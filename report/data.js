const programData = {
  enrollment: {
    2024: [
      { program: "ASCT", name: "Associate in Computer Technology", value: 100 },
      { program: "ART", name: "Associate in Retail Technology", value: 90 },
      {
        program: "BSRTCS",
        name: "Bachelor of Science in Retail Technology and Consumer Science",
        value: 80,
      },
      {
        program: "BACOMM",
        name: "Bachelor of Arts in Communication",
        value: 60,
      },
      { program: "BAMMA", name: "Bachelor of Multimedia Arts", value: 50 },
      {
        program: "BSA",
        name: "Bachelor of Science in Accountancy",
        value: 100,
      },
      {
        program: "BSAIS",
        name: "Bachelor of Science in Accounting Information System",
        value: 70,
      },
      {
        program: "BSCPE",
        name: "Bachelor of Science in Computer Engineering",
        value: 95,
      },
      {
        program: "BSCS",
        name: "Bachelor of Science in Computer Science",
        value: 85,
      },
      {
        program: "BSHM",
        name: "Bachelor of Science in Hospitality Management",
        value: 40,
      },
      {
        program: "BSIS",
        name: "Bachelor of Science in Information Systems",
        value: 65,
      },
      {
        program: "BSIT",
        name: "Bachelor of Science in Information Technology",
        value: 110,
      },
      {
        program: "BSMA",
        name: "Bachelor of Science in Management Accounting",
        value: 55,
      },
      {
        program: "BSOA",
        name: "Bachelor of Science in Office Administration",
        value: 75,
      },
    ],
    2025: [
      { program: "ASCT", name: "Associate in Computer Technology", value: 130 },
      { program: "ART", name: "Associate in Retail Technology", value: 95 },
      {
        program: "BSRTCS",
        name: "Bachelor of Science in Retail Technology and Consumer Science",
        value: 85,
      },
      {
        program: "BACOMM",
        name: "Bachelor of Arts in Communication",
        value: 65,
      },
      { program: "BAMMA", name: "Bachelor of Multimedia Arts", value: 55 },
      {
        program: "BSA",
        name: "Bachelor of Science in Accountancy",
        value: 105,
      },
      {
        program: "BSAIS",
        name: "Bachelor of Science in Accounting Information System",
        value: 75,
      },
      {
        program: "BSCPE",
        name: "Bachelor of Science in Computer Engineering",
        value: 100,
      },
      {
        program: "BSCS",
        name: "Bachelor of Science in Computer Science",
        value: 90,
      },
      {
        program: "BSHM",
        name: "Bachelor of Science in Hospitality Management",
        value: 45,
      },
      {
        program: "BSIS",
        name: "Bachelor of Science in Information Systems",
        value: 70,
      },
      {
        program: "BSIT",
        name: "Bachelor of Science in Information Technology",
        value: 115,
      },
      {
        program: "BSMA",
        name: "Bachelor of Science in Management Accounting",
        value: 60,
      },
      {
        program: "BSOA",
        name: "Bachelor of Science in Office Administration",
        value: 80,
      },
    ],
    2026: [
      { program: "ASCT", name: "Associate in Computer Technology", value: 160 },
      { program: "ART", name: "Associate in Retail Technology", value: 75 },
      {
        program: "BSRTCS",
        name: "Bachelor of Science in Retail Technology and Consumer Science",
        value: 65,
      },
      {
        program: "BACOMM",
        name: "Bachelor of Arts in Communication",
        value: 65,
      },
      { program: "BAMMA", name: "Bachelor of Multimedia Arts", value: 65 },
      {
        program: "BSA",
        name: "Bachelor of Science in Accountancy",
        value: 190,
      },
      {
        program: "BSAIS",
        name: "Bachelor of Science in Accounting Information System",
        value: 100,
      },
      {
        program: "BSCPE",
        name: "Bachelor of Science in Computer Engineering",
        value: 150,
      },
      {
        program: "BSCS",
        name: "Bachelor of Science in Computer Science",
        value: 130,
      },
      {
        program: "BSHM",
        name: "Bachelor of Science in Hospitality Management",
        value: 130,
      },
      {
        program: "BSIS",
        name: "Bachelor of Science in Information Systems",
        value: 150,
      },
      {
        program: "BSIT",
        name: "Bachelor of Science in Information Technology",
        value: 240,
      },
      {
        program: "BSMA",
        name: "Bachelor of Science in Management Accounting",
        value: 115,
      },
      {
        program: "BSOA",
        name: "Bachelor of Science in Office Administration",
        value: 85,
      },
    ],
  },
  conversion: {
    2024: [
      { stage: "Inquiries", value: 1000 },
      { stage: "Applications", value: 600 },
      { stage: "Admissions", value: 400 },
      { stage: "Enrollments", value: 300 },
    ],
    2025: [
      { stage: "Inquiries", value: 1200 },
      { stage: "Applications", value: 700 },
      { stage: "Admissions", value: 450 },
      { stage: "Enrollments", value: 320 },
    ],
  },
  campus: {
    2024: [
      { campus: "Main Campus", programs: { ASCT: 50, BSCS: 40, BSIT: 60 } },
      { campus: "South Campus", programs: { BSA: 30, BSHM: 20, BSIS: 25 } },
      { campus: "East Campus", programs: { BAMMA: 20, BACOMM: 15 } },
    ],
    2025: [
      { campus: "Main Campus", programs: { ASCT: 60, BSCS: 50, BSIT: 65 } },
      { campus: "South Campus", programs: { BSA: 35, BSHM: 25, BSIS: 30 } },
      { campus: "East Campus", programs: { BAMMA: 25, BACOMM: 20 } },
    ],
  },
  demographics: {
    2024: [
      { category: "Male", value: 450 },
      { category: "Female", value: 500 },
      { category: "18-20", value: 600 },
      { category: "21-25", value: 300 },
      { category: "Other", value: 50 },
    ],
    2025: [
      { category: "Male", value: 480 },
      { category: "Female", value: 520 },
      { category: "18-20", value: 620 },
      { category: "21-25", value: 320 },
      { category: "Other", value: 60 },
    ],
  },
  // Backward compatibility for existing scripts
  get enrollmentData() {
    return this.enrollment;
  },
  get conversionData() {
    return this.conversion;
  },
  get campusData() {
    return this.campus;
  },
  get demographicData() {
    return this.demographics;
  },
};

const colorMap = {
  ASCT: "#FF6384",
  ART: "#36A2EB",
  BSRTCS: "#FFCE56",
  BACOMM: "#4BC0C0",
  BAMMA: "#9966FF",
  BSA: "#FF9F40",
  BSAIS: "#8AC926",
  BSCPE: "#00BFA6",
  BSCS: "#F94144",
  BSHM: "#577590",
  BSIS: "#FF6B6B",
  BSIT: "#1982C4",
  BSMA: "#6A4C93",
  BSOA: "#D7263D",
};
