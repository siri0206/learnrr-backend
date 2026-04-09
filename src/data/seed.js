const mongoose = require('mongoose');
const University = require('../models/University');
const Course = require('../models/Course');
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });

const universities = [
  {
    name: "University of Hyderabad",
    shortName: "UoH",
    location: "Gachibowli, Hyderabad, Telangana",
    type: "Central University",
    established: 1974,
    logo: "https://upload.wikimedia.org/wikipedia/en/0/0d/University_of_Hyderabad_logo.png",
    rating: 4.5,
    ranking: 12,
    description: "A premier central university known for research and interdisciplinary studies. Ranked among India's top universities by NIRF.",
    facilities: ["Library", "Hostels", "Sports Complex", "Research Labs", "Cafeteria", "Health Centre"],
    accreditation: "NAAC A++",
    website: "https://uohyd.ac.in",
    phone: "+91-40-23132100",
    email: "registrar@uohyd.ac.in",
    imageUrl: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800",
    totalStudents: 5200,
    placementRate: 88,
    avgPackage: 8.5
  },
  {
    name: "Osmania University",
    shortName: "OU",
    location: "Amberpet, Hyderabad, Telangana",
    type: "State University",
    established: 1918,
    logo: "",
    rating: 4.2,
    ranking: 28,
    description: "One of the oldest and largest universities in India, Osmania University offers a wide range of programs across all disciplines.",
    facilities: ["Central Library", "Hostels", "Stadium", "Laboratories", "Canteen"],
    accreditation: "NAAC A",
    website: "https://osmania.ac.in",
    phone: "+91-40-27682363",
    email: "registrar@osmania.ac.in",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=800",
    totalStudents: 12000,
    placementRate: 82,
    avgPackage: 6.8
  },
  {
    name: "JNTU Hyderabad",
    shortName: "JNTUH",
    location: "Kukatpally, Hyderabad, Telangana",
    type: "Technical University",
    established: 1972,
    logo: "",
    rating: 4.3,
    ranking: 35,
    description: "Jawaharlal Nehru Technological University Hyderabad is the apex technical university in Telangana, affiliating over 700 colleges.",
    facilities: ["Advanced Labs", "Hostels", "Sports Ground", "Library", "Placement Cell"],
    accreditation: "NAAC A",
    website: "https://jntuh.ac.in",
    phone: "+91-40-23158661",
    email: "registrar@jntuh.ac.in",
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800",
    totalStudents: 9500,
    placementRate: 90,
    avgPackage: 9.2
  },
  {
    name: "BITS Pilani - Hyderabad Campus",
    shortName: "BITS Hyderabad",
    location: "Shameerpet, Hyderabad, Telangana",
    type: "Deemed University",
    established: 2008,
    logo: "",
    rating: 4.7,
    ranking: 8,
    description: "A premier deemed university offering top-tier engineering and science programs with strong industry connections and research culture.",
    facilities: ["World-class Labs", "AC Hostels", "Olympic Pool", "Library", "Innovation Hub"],
    accreditation: "NAAC A",
    website: "https://www.bits-pilani.ac.in/hyderabad",
    phone: "+91-40-66303503",
    email: "admissions@hyderabad.bits-pilani.ac.in",
    imageUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d977758?w=800",
    totalStudents: 4800,
    placementRate: 96,
    avgPackage: 18.5
  },
  {
    name: "ICFAI Foundation for Higher Education",
    shortName: "IFHE",
    location: "Donthanapally, Hyderabad, Telangana",
    type: "Deemed University",
    established: 1994,
    logo: "",
    rating: 4.1,
    ranking: 45,
    description: "IFHE is renowned for its business and law programs with a strong focus on practical learning and industry exposure.",
    facilities: ["Business Labs", "Moot Court", "Hostels", "Cafeteria", "Sports Facilities"],
    accreditation: "NAAC B++",
    website: "https://ifheindia.org",
    phone: "+91-40-68304000",
    email: "admissions@ifheindia.org",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
    totalStudents: 6200,
    placementRate: 85,
    avgPackage: 7.5
  },
  {
    name: "IIT Hyderabad",
    shortName: "IITH",
    location: "Kandi, Sangareddy, Telangana",
    type: "Institute of National Importance",
    established: 2008,
    logo: "",
    rating: 4.9,
    ranking: 3,
    description: "IIT Hyderabad is among India's premier technology institutes with a focus on innovation, research, and cutting-edge engineering education.",
    facilities: ["State-of-art Labs", "AI Research Centre", "Hostels", "Sports Complex", "Innovation Hub"],
    accreditation: "NBA Accredited",
    website: "https://iith.ac.in",
    phone: "+91-40-23016000",
    email: "admissions@iith.ac.in",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    totalStudents: 3200,
    placementRate: 98,
    avgPackage: 28.5
  }
];

const courses = [
  // Engineering Courses
  {
    name: "B.Tech Computer Science & Engineering",
    shortName: "B.Tech CSE",
    category: "Engineering",
    duration: "4 Years",
    mode: "Full-time",
    level: "Undergraduate",
    eligibility: "10+2 with PCM, JEE Main Score",
    fees: { total: 480000, perSemester: 60000, currency: "INR" },
    seats: 120,
    rating: 4.8,
    description: "A comprehensive 4-year undergraduate program covering core CS fundamentals, AI/ML, data structures, algorithms, and software engineering.",
    highlights: ["AI/ML Specialization", "Industry Internships", "Hackathons", "Top Placements"],
    careers: ["Software Engineer", "Data Scientist", "AI Engineer", "Cloud Architect", "Product Manager"],
    syllabus: [
      { semester: 1, subjects: ["Engineering Mathematics I", "Physics", "C Programming", "Engineering Graphics", "Communication Skills"] },
      { semester: 2, subjects: ["Engineering Mathematics II", "Chemistry", "Data Structures", "Digital Logic", "Python Programming"] },
      { semester: 3, subjects: ["Algorithms", "DBMS", "Operating Systems", "Computer Networks", "OOP with Java"] },
      { semester: 4, subjects: ["Software Engineering", "Web Technologies", "Computer Architecture", "Statistics", "Mini Project"] },
      { semester: 5, subjects: ["Machine Learning", "Cloud Computing", "Cybersecurity", "Elective I", "Industrial Training"] },
      { semester: 6, subjects: ["Deep Learning", "Blockchain", "Mobile Computing", "Elective II", "Project I"] },
      { semester: 7, subjects: ["AI Applications", "Big Data Analytics", "IoT", "Elective III", "Internship"] },
      { semester: 8, subjects: ["Project II", "Seminar", "Elective IV", "Entrepreneurship"] }
    ],
    universityName: "IIT Hyderabad",
    avgPlacementPackage: 28.5,
    topRecruiters: ["Google", "Microsoft", "Amazon", "Goldman Sachs", "Uber"]
  },
  {
    name: "B.Tech Artificial Intelligence & Data Science",
    shortName: "B.Tech AI&DS",
    category: "Engineering",
    duration: "4 Years",
    mode: "Full-time",
    level: "Undergraduate",
    eligibility: "10+2 with PCM, JEE Main Score",
    fees: { total: 520000, perSemester: 65000, currency: "INR" },
    seats: 60,
    rating: 4.9,
    description: "Cutting-edge program focused on Artificial Intelligence, Machine Learning, Data Science, and Deep Learning with real-world applications.",
    highlights: ["AI Lab Access", "Research Projects", "Industry Mentors", "International Exposure"],
    careers: ["AI Researcher", "Data Scientist", "ML Engineer", "Business Analyst", "AI Product Manager"],
    syllabus: [
      { semester: 1, subjects: ["Linear Algebra", "Calculus", "Python for AI", "Probability & Statistics", "Communication"] },
      { semester: 2, subjects: ["Data Structures", "Algorithms", "R Programming", "Discrete Mathematics", "Physics"] },
      { semester: 3, subjects: ["Machine Learning", "Database Management", "Signal Processing", "NLP Basics", "Elective I"] },
      { semester: 4, subjects: ["Deep Learning", "Computer Vision", "Big Data Technologies", "Cloud Platforms", "Mini Project"] },
      { semester: 5, subjects: ["Advanced ML", "Reinforcement Learning", "AI Ethics", "Time Series Analysis", "Internship"] },
      { semester: 6, subjects: ["Generative AI", "MLOps", "Edge AI", "Elective II", "Project I"] },
      { semester: 7, subjects: ["AI in Healthcare", "Autonomous Systems", "Elective III", "Research Methodology"] },
      { semester: 8, subjects: ["Capstone Project", "Seminar", "Elective IV"] }
    ],
    universityName: "BITS Pilani - Hyderabad Campus",
    avgPlacementPackage: 22.0,
    topRecruiters: ["Google DeepMind", "OpenAI", "Amazon", "Flipkart", "Razorpay"]
  },
  {
    name: "B.Tech Electronics & Communication Engineering",
    shortName: "B.Tech ECE",
    category: "Engineering",
    duration: "4 Years",
    mode: "Full-time",
    level: "Undergraduate",
    eligibility: "10+2 with PCM, JEE Main / EAMCET",
    fees: { total: 360000, perSemester: 45000, currency: "INR" },
    seats: 90,
    rating: 4.4,
    description: "Program covering electronics, VLSI, embedded systems, communication networks, and signal processing with state-of-art labs.",
    highlights: ["VLSI Design Lab", "Embedded Systems", "IoT Projects", "Industry Visits"],
    careers: ["VLSI Engineer", "Embedded Systems Developer", "RF Engineer", "Network Engineer", "R&D Scientist"],
    syllabus: [
      { semester: 1, subjects: ["Mathematics I", "Physics", "Basic Electronics", "C Programming", "Workshop"] },
      { semester: 2, subjects: ["Mathematics II", "Signals & Systems", "Circuit Theory", "Electronic Devices", "Python"] },
      { semester: 3, subjects: ["Digital Electronics", "Electromagnetic Theory", "Analog Circuits", "Microprocessors", "Data Structures"] },
      { semester: 4, subjects: ["Communication Systems", "VLSI Design", "Control Systems", "Digital Signal Processing", "Lab"] },
      { semester: 5, subjects: ["Wireless Communications", "Embedded Systems", "OOPS", "Antenna Theory", "Elective I"] },
      { semester: 6, subjects: ["5G Networks", "IoT", "Image Processing", "Elective II", "Project I"] },
      { semester: 7, subjects: ["Advanced Communication", "MEMS", "Elective III", "Internship"] },
      { semester: 8, subjects: ["Final Project", "Seminar", "Elective IV"] }
    ],
    universityName: "JNTU Hyderabad",
    avgPlacementPackage: 9.2,
    topRecruiters: ["Qualcomm", "Intel", "DRDO", "TCS", "Infosys"]
  },
  // MBA Courses
  {
    name: "Master of Business Administration",
    shortName: "MBA",
    category: "Management",
    duration: "2 Years",
    mode: "Full-time",
    level: "Postgraduate",
    eligibility: "Any Graduation with 50%, CAT/MAT/GMAT Score",
    fees: { total: 680000, perSemester: 170000, currency: "INR" },
    seats: 180,
    rating: 4.5,
    description: "A flagship 2-year MBA program with specializations in Finance, Marketing, HR, Operations, and IT. Strong alumni network and placement record.",
    highlights: ["International Exchange Programs", "Case-based Learning", "CEO Talks", "Placement 100%"],
    careers: ["Manager", "Consultant", "Analyst", "Entrepreneur", "Business Development Executive"],
    syllabus: [
      { semester: 1, subjects: ["Management Principles", "Financial Accounting", "Marketing Management", "Organizational Behavior", "Statistics"] },
      { semester: 2, subjects: ["Financial Management", "Human Resource Management", "Operations Management", "Business Law", "Research Methods"] },
      { semester: 3, subjects: ["Strategic Management", "Elective I", "Elective II", "Summer Internship Review", "Business Ethics"] },
      { semester: 4, subjects: ["Elective III", "Elective IV", "Industry Project", "Entrepreneurship", "Leadership"] }
    ],
    universityName: "ICFAI Foundation for Higher Education",
    avgPlacementPackage: 9.5,
    topRecruiters: ["Deloitte", "KPMG", "Accenture", "HDFC Bank", "Asian Paints"]
  },
  {
    name: "MBA Finance & Banking",
    shortName: "MBA Finance",
    category: "Management",
    duration: "2 Years",
    mode: "Full-time",
    level: "Postgraduate",
    eligibility: "Graduation with 50%, CAT/MAT Score",
    fees: { total: 580000, perSemester: 145000, currency: "INR" },
    seats: 60,
    rating: 4.3,
    description: "Specialized MBA in Finance and Banking preparing students for careers in investment banking, financial analysis, and fintech.",
    highlights: ["Bloomberg Terminal Access", "CFA Prep Integration", "Live Trading Lab", "Bank Internships"],
    careers: ["Investment Banker", "Financial Analyst", "Risk Manager", "Portfolio Manager", "CFO"],
    syllabus: [
      { semester: 1, subjects: ["Financial Markets", "Accounting & Auditing", "Corporate Finance", "Macroeconomics", "Quantitative Methods"] },
      { semester: 2, subjects: ["Investment Analysis", "Banking Regulations", "Derivatives", "Insurance Management", "Research"] },
      { semester: 3, subjects: ["Portfolio Management", "Mergers & Acquisitions", "Fintech", "International Finance", "Project Finance"] },
      { semester: 4, subjects: ["Risk Management", "Venture Capital", "Thesis/Industry Project", "Leadership"] }
    ],
    universityName: "Osmania University",
    avgPlacementPackage: 8.5,
    topRecruiters: ["Goldman Sachs", "ICICI Bank", "Paytm", "Zerodha", "SEBI"]
  },
  // Medical Courses
  {
    name: "Bachelor of Medicine & Bachelor of Surgery",
    shortName: "MBBS",
    category: "Medical",
    duration: "5.5 Years",
    mode: "Full-time",
    level: "Undergraduate",
    eligibility: "10+2 with PCB, NEET Score",
    fees: { total: 2500000, perSemester: 208333, currency: "INR" },
    seats: 150,
    rating: 4.6,
    description: "India's most prestigious medical degree covering all aspects of medicine, surgery, and clinical practice with hospital internship included.",
    highlights: ["Teaching Hospital", "Cadaver Lab", "Clinical Rotations", "Research Opportunities"],
    careers: ["Doctor (General Physician)", "Surgeon", "Specialist", "Medical Researcher", "Hospital Administrator"],
    syllabus: [
      { semester: 1, subjects: ["Anatomy", "Physiology", "Biochemistry", "Community Medicine", "Foundation Course"] },
      { semester: 2, subjects: ["Anatomy II", "Physiology II", "Biochemistry II", "Community Medicine II"] },
      { semester: 3, subjects: ["Pathology", "Microbiology", "Pharmacology", "Forensic Medicine"] },
      { semester: 4, subjects: ["Pathology II", "Microbiology II", "Pharmacology II", "Community Medicine III"] },
      { semester: 5, subjects: ["Medicine", "Surgery", "Obstetrics & Gynecology", "Pediatrics"] },
      { semester: 6, subjects: ["Medicine II", "Surgery II", "ENT", "Ophthalmology", "Orthopedics"] },
      { semester: 7, subjects: ["Clinical Rotations", "Emergency Medicine", "Radiology", "Psychiatry"] },
      { semester: 8, subjects: ["Internship Rotations", "Final Clinicals"] }
    ],
    universityName: "Osmania University",
    avgPlacementPackage: 12.0,
    topRecruiters: ["AIIMS", "Apollo Hospitals", "Yashoda Hospitals", "Care Hospitals", "NHS UK"]
  },
  // Science Courses
  {
    name: "M.Sc. Data Science & Machine Learning",
    shortName: "M.Sc. DSML",
    category: "Science",
    duration: "2 Years",
    mode: "Full-time",
    level: "Postgraduate",
    eligibility: "B.Sc./B.Tech with 55%, strong mathematics background",
    fees: { total: 240000, perSemester: 60000, currency: "INR" },
    seats: 40,
    rating: 4.7,
    description: "Intensive postgraduate program in Data Science, Machine Learning, and Statistical Computing with hands-on projects and industry collaboration.",
    highlights: ["Research Publications", "Industry Projects", "HPC Cluster Access", "Startup Incubation"],
    careers: ["Data Scientist", "ML Engineer", "Research Scientist", "AI Consultant", "Data Engineer"],
    syllabus: [
      { semester: 1, subjects: ["Advanced Statistics", "Machine Learning", "Python for Data Science", "Linear Algebra", "Database Systems"] },
      { semester: 2, subjects: ["Deep Learning", "Natural Language Processing", "Cloud Computing", "Data Visualization", "Research Methods"] },
      { semester: 3, subjects: ["Advanced ML", "Computer Vision", "Time Series", "MLOps", "Seminar"] },
      { semester: 4, subjects: ["Dissertation", "Elective I", "Elective II"] }
    ],
    universityName: "University of Hyderabad",
    avgPlacementPackage: 14.5,
    topRecruiters: ["Google", "Microsoft Research", "IBM", "Mu Sigma", "Tiger Analytics"]
  },
  {
    name: "B.Sc. Computer Science (Honours)",
    shortName: "B.Sc. CS (H)",
    category: "Science",
    duration: "3 Years",
    mode: "Full-time",
    level: "Undergraduate",
    eligibility: "10+2 with Mathematics, 60% aggregate",
    fees: { total: 120000, perSemester: 20000, currency: "INR" },
    seats: 80,
    rating: 4.2,
    description: "Comprehensive Honours degree in Computer Science covering programming, algorithms, databases, and emerging technologies at affordable fees.",
    highlights: ["Affordable Fees", "Research Opportunities", "Coding Clubs", "Internship Support"],
    careers: ["Software Developer", "Database Admin", "System Analyst", "IT Support", "Programmer"],
    syllabus: [
      { semester: 1, subjects: ["C Programming", "Mathematics I", "Physics", "Digital Logic", "English"] },
      { semester: 2, subjects: ["Data Structures", "Mathematics II", "OOPS with C++", "Operating Systems", "Lab"] },
      { semester: 3, subjects: ["Algorithms", "DBMS", "Computer Networks", "Web Technologies", "Elective I"] },
      { semester: 4, subjects: ["Software Engineering", "Python", "Mobile Apps", "Elective II", "Mini Project"] },
      { semester: 5, subjects: ["Machine Learning Basics", "Cloud Computing", "Cybersecurity", "Elective III", "Internship"] },
      { semester: 6, subjects: ["Final Project", "Seminar", "Elective IV", "Career Skills"] }
    ],
    universityName: "Osmania University",
    avgPlacementPackage: 5.8,
    topRecruiters: ["TCS", "Wipro", "Infosys", "Tech Mahindra", "Cognizant"]
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27018/learnrr', { directConnection: true, serverSelectionTimeoutMS: 10000 });
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await University.deleteMany({});
    await Course.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert universities
    const insertedUniversities = await University.insertMany(universities);
    console.log(`✅ Seeded ${insertedUniversities.length} universities`);

    // Map university names to IDs
    const uniMap = {};
    insertedUniversities.forEach(u => { uniMap[u.name] = u._id; });

    // Attach university IDs to courses
    const coursesWithUni = courses.map(c => ({
      ...c,
      university: uniMap[c.universityName] || insertedUniversities[0]._id
    }));

    const insertedCourses = await Course.insertMany(coursesWithUni);
    console.log(`✅ Seeded ${insertedCourses.length} courses`);

    // Update universities with their courses
    for (const course of insertedCourses) {
      await University.findByIdAndUpdate(course.university, {
        $push: { courses: course._id }
      });
    }

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
}

seedDatabase();
