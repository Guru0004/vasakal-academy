// Vasakal Academy - Source Data
export const ENROLLMENT_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdqwaJCV6PYrWeO8Y-uPP88BhlrdhZU2rp50mZbRrRs-RyUMA/viewform";

export const ACADEMY_INFO = {
  name: "VASAKAL ACADEMY",
  tagline: "Turning Aspirants into Achievers",
  seminarTitle: "Seminar for Life Goal - Shaping the Real Professionals",
  mission: "Vasakal Academy is founded in an effort to give students a competitive edge in all their future endeavours and prepare them for Global context.",
  subMission: "Through specially crafted live instructions and individualized analysis, Vasakal academy's experts will be with you every step of the way.",
  learningApproach: "High Quality Personalized Learning",
  philosophy: "Learning should combine strong fundamentals, application, practice, assessment and continuous improvement.",
  motto: "Empowering minds. Building futures. Creating leaders of tomorrow.",
  contacts: {
    phones: ["9842863113", "9944789783"],
    email: "vasakalacademy@gmail.com",
    address: "Thasildar Office Road, Bodinayakanur - 625513",
    mapQuery: "Thasildar Office Road, Bodinayakanur, Tamil Nadu 625513"
  }
};

export const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Aspirations", href: "#aspirations" },
  { label: "Challenges & Solution", href: "#challenges" },
  { label: "Foundation", href: "#foundation" },
  { label: "Programs", href: "#programs" },
  { label: "Our Approach", href: "#approach" },
  { label: "Faculty", href: "#faculty" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" }
];

export const ASPIRATIONS = [
  {
    id: "engineer",
    title: "Engineer",
    tag: "IIT-JEE / Premier Engineering",
    description: "Master advanced problem-solving, physics, chemistry, and calculus for admission into IITs, NITs, and top engineering institutions.",
    icon: "Cpu",
    gradient: "from-blue-600 to-indigo-700",
    exams: ["IIT JEE Advanced", "JEE Mains", "State CETs"]
  },
  {
    id: "doctor",
    title: "Doctor",
    tag: "NEET UG / Medical Excellence",
    description: "Deep conceptual command in Biology, Chemistry, and Physics with high-speed accuracy training for top government medical colleges.",
    icon: "Stethoscope",
    gradient: "from-teal-600 to-emerald-700",
    exams: ["NEET UG", "AIIMS", "JIPMER"]
  },
  {
    id: "ca",
    title: "Chartered Accountant",
    tag: "ICAI Foundation / Commerce",
    description: "Analytical rigor, quantitative aptitude, and structured critical thinking required for the prestigious CA curriculum.",
    icon: "Calculator",
    gradient: "from-amber-600 to-orange-700",
    exams: ["CA Foundation", "Logical Reasoning", "Quantitative Aptitude"]
  },
  {
    id: "civil-servant",
    title: "Civil Servant",
    tag: "UPSC / Administrative Leadership",
    description: "Holistic knowledge framework, enquiry-based understanding, and leadership acumen for IAS, IPS, and state civil services.",
    icon: "Landmark",
    gradient: "from-rose-600 to-purple-800",
    exams: ["UPSC Foundation", "State PSCs", "General Studies Mastery"]
  }
];

export const CHALLENGES_VS_SOLUTION = {
  challenges: [
    {
      title: "Generalized Board-Specific Learning",
      description: "Traditional schooling confines teaching to narrow board boundaries without competitive alignment."
    },
    {
      title: "Curriculum Bandwidth Chasm",
      description: "Sudden leap between Class 10th and 11th causes steep drops in comprehension, grades, and confidence."
    },
    {
      title: "Lack of Application & Skill-Based Learning",
      description: "Rote memorization replaces experiential and enquiry-based problem solving."
    },
    {
      title: "Minimal Personalized Attention",
      description: "One-size-fits-all classrooms neglect individual learning speeds and diagnostic analysis."
    },
    {
      title: "Below International Benchmarks",
      description: "Lack of exposure to multi-correct, matrix matching, and analytical question formats."
    },
    {
      title: "Minimal Research & Innovation",
      description: "Absence of trans-disciplinary integration leaves students unequipped for global requirements."
    }
  ],
  solution: [
    {
      title: "Strong Foundation for Competitive Exams",
      description: "Early conceptual fortification designed specifically to crack premier engineering and medical entrance tests.",
      icon: "ShieldCheck"
    },
    {
      title: "Comprehensive Multi-Board Coverage",
      description: "Complete mastery across Math, Physics, Chemistry, and Biology covering State, CBSE, and ICSE syllabi seamlessly.",
      icon: "Layers"
    },
    {
      title: "Offline & Online Integrated Practice",
      description: "Structured practice material with step-by-step solutions, offline reference manuals, and concept reinforcement worksheets.",
      icon: "BookOpenCheck"
    },
    {
      title: "Trans-Disciplinary & CCE Methodologies",
      description: "Integrated syllabus aligned with NEET, IIT JEE Mains/Advanced, Olympiad, and NTSE patterns.",
      icon: "Award"
    },
    {
      title: "Systemized Teaching, Practice & Testing",
      description: "OMR-based granular analytics, regular testing mechanism, and continuous academic engagement.",
      icon: "CheckCircle2"
    },
    {
      title: "Dedicated Weekday Support & Mentorship",
      description: "Direct telephonic academic doubt resolution on weekdays and personalized hand-holding throughout the academic year.",
      icon: "PhoneCall"
    }
  ]
};

export const FOUNDATION_DATA = {
  intro: "Foundation courses help students nourish their skills at early stages and strengthen concepts and fundamental capabilities.",
  timelineComparison: {
    afterTenth: {
      tenure: "2 Years Only",
      coverage: "Compressed subject coverage under high pressure",
      exams: "Very low exposure to talent and competitive formats",
      confidence: "High anxiety, lower confidence levels",
      successRate: "Significantly lower success rate"
    },
    fromClassSix: {
      tenure: "Long 7-Year Structured Tenure",
      coverage: "Subjects bifurcated with clear, definite progression",
      exams: "Continuous exposure to Olympiads, NTSE, and mock patterns",
      confidence: "Optimum mind maturity and high self-belief",
      successRate: "Success rate increases remarkably"
    }
  },
  comparisonMatrix: [
    {
      parameter: "Subject Coverage",
      withoutFoundation: "Less subject coverage & shallow depth",
      withFoundation: "Comprehensive coverage to the required competitive level"
    },
    {
      parameter: "Evaluation Techniques",
      withoutFoundation: "Fewer evaluation methods (rote tests)",
      withFoundation: "Multi-dimensional evaluation (OMR, analytical, matrix-match)"
    },
    {
      parameter: "Competitive Exam Exposure",
      withoutFoundation: "Minimal or delayed exposure after 10th",
      withFoundation: "Extensive exposure from middle school onward"
    },
    {
      parameter: "Student Confidence",
      withoutFoundation: "Low self-esteem & struggle to cope in 11th",
      withFoundation: "High confidence and natural conceptual maturity"
    },
    {
      parameter: "Success Potential",
      withoutFoundation: "Lower success rate in national entrances",
      withFoundation: "Maximum success potential for premier institutions"
    }
  ],
  stakeholderBenefits: [
    {
      forWhom: "For Students",
      points: [
        "Nourishes skills and fundamental capabilities at early stages",
        "Integrated syllabus develops time management early",
        "Experience with single-correct, multi-correct, and matrix-matching questions develops multi-perspective reasoning"
      ]
    },
    {
      forWhom: "For Parents",
      points: [
        "Complete peace of mind knowing wards are prepared for national-level professional courses",
        "Continuous transparent progress updates and personalized mentor guidance",
        "Eliminates panic and crisis during Class 11th and 12th board transitions"
      ]
    },
    {
      forWhom: "For Teachers",
      points: [
        "Empowers teachers with structured course designs and diagnostic toolkits",
        "Faculty Improvement Programs (FIP) enhance pedagogy and subject depth",
        "Systematic feedback loop to address weak areas immediately"
      ]
    },
    {
      forWhom: "For School Management",
      points: [
        "Builds prestigious institutional brand value when students secure state and national ranks",
        "Elevates school academic benchmarks well above standard board requirements",
        "Seamless offline/online academic curriculum partnership"
      ]
    }
  ],
  spiralDesign: {
    title: "Vasakal Foundation Design Architecture",
    steps: [
      {
        stage: "7th Class",
        label: "Revision of Earlier Class",
        desc: "Strengthen pre-requisites and bridge conceptual gaps from previous years."
      },
      {
        stage: "8th Class",
        label: "Core Topic Mastery",
        desc: "In-depth concept immersion, objective problem solving, and analytical reasoning."
      },
      {
        stage: "9th Class",
        label: "Basics of Next Class",
        desc: "Early introduction to higher-level concepts, preparing ahead for advanced board and competitive curricula."
      }
    ]
  }
};

export const PROGRAMS = [
  {
    id: "foundation-middle",
    badge: "Class 4th to 10th",
    title: "Foundation-Focused Academic Program",
    description: "Concept reinforcement, bifurcated syllabus, analytical reasoning, and early talent exam orientation for CBSE, ICSE, and State board students.",
    features: [
      "Deep concept grounding in Mathematics, Physics, Chemistry & Biology",
      "Experiential learning and hands-on activities",
      "Regular question papers and OMR-based performance analysis",
      "Exposure to Olympiads and talent examinations",
      "Continuous engagement throughout the academic year"
    ],
    icon: "BookOpen"
  },
  {
    id: "advanced-secondary",
    badge: "Class 11th to 12th",
    title: "Advanced Academic & Concept Reinforcement",
    description: "High-intensity conceptual coaching bridging board excellence with premier competitive exam requirements.",
    features: [
      "Rigorous alignment of subjective board syllabus with objective patterns",
      "Subject-matter specialist faculty mentorship",
      "Time management & question classification strategies",
      "Comprehensive chapter-wise worksheets and mock test series",
      "Individual doubt resolution and performance counseling"
    ],
    icon: "GraduationCap"
  },
  {
    id: "competitive-career",
    badge: "Competitive Exams",
    title: "NEET / IIT-JEE / Olympiad & NTSE Track",
    description: "Targeted competitive training engineered to convert ambitious aspirants into top-tier national achievers.",
    features: [
      "IIT-JEE Mains & Advanced integrated syllabus",
      "NEET UG comprehensive medical coaching",
      "NTSE & National Olympiad preparation module",
      "Single-correct, multi-correct & matrix-matching drills",
      "Weekday telephonic academic support & mentorship"
    ],
    icon: "Trophy"
  }
];

export const LEARNING_APPROACH = {
  pillars: [
    {
      title: "Creative Thinking",
      desc: "Encouraging original perspectives and out-of-the-box analytical reasoning beyond rote formulas.",
      icon: "Lightbulb"
    },
    {
      title: "Enquiry Based Learning",
      desc: "Guiding students to ask questions, explore hypotheses, and arrive at scientific deductions.",
      icon: "Search"
    },
    {
      title: "Problem Solving",
      desc: "Equipping learners with structured, systematic approaches to untangle multi-layered complex problems.",
      icon: "Puzzle"
    },
    {
      title: "Experiential Learning",
      desc: "Learning by doing in a personalized way that solidifies abstract theory into tangible understanding.",
      icon: "FlaskConical"
    }
  ],
  corePrinciple: "Subjective + Objective learning are given equal importance.",
  courseDesign: [
    {
      number: "01",
      title: "Objective",
      question: "What should my students know?",
      detail: "Clear target outcomes defining core concepts and factual depth."
    },
    {
      number: "02",
      title: "Skills",
      question: "What should they be able to do?",
      detail: "Analytical, computational, and synthesis skills to apply concepts."
    },
    {
      number: "03",
      title: "Activities",
      question: "What activities can help students achieve learning objectives?",
      detail: "Interactive classroom drills, guided problem sets, and experiential demos."
    },
    {
      number: "04",
      title: "Assessments",
      question: "How will we know that the student has achieved learning objectives?",
      detail: "Continuous evaluation via OMR tests, subjective papers, and granular analytics."
    }
  ],
  capabilities: [
    {
      title: "Hand-Holding Approach",
      desc: "Direct personalized guidance where faculty mentors mentor every student through individual learning hurdles.",
      icon: "HeartHandshake"
    },
    {
      title: "Continuous Engagement",
      desc: "Active academic involvement throughout the year with steady schedules, regular reviews, and milestones.",
      icon: "CalendarSync"
    },
    {
      title: "Regular Question Papers",
      desc: "Standardized papers covering State, CBSE, and ICSE patterns along with Olympiad and competitive formats.",
      icon: "FileSpreadsheet"
    },
    {
      title: "Faculty Improvement Program (FIP)",
      desc: "Need-based faculty enhancement workshops maintaining pedagogical excellence and curriculum updates.",
      icon: "Users"
    },
    {
      title: "OMR-Based Granular Analysis",
      desc: "Detailed topic-wise, speed, and accuracy analysis pinpointing exact misconceptions after every test.",
      icon: "BarChart3"
    },
    {
      title: "Weekday Phone Support",
      desc: "Direct academic doubt resolution accessible to students via telephone throughout all weekdays.",
      icon: "Headphones"
    }
  ]
};

export const FACULTY = [
  {
    name: "Mr. RVVS Narayana",
    subject: "Mathematics",
    role: "Senior Academic Expert - Mathematics",
    image: "/assets/faculty/narayana.png",
    bio: "Renowned expert in breaking down abstract mathematical concepts, analytical problem solving, and Olympiad calculus into intuitive logical steps."
  },
  {
    name: "Mr. A. Anil Kumar",
    subject: "Chemistry",
    role: "Senior Academic Expert - Chemistry",
    image: "/assets/faculty/anil_kumar.png",
    bio: "Specialist in Physical and Organic Chemistry with proven techniques for mastering complex reaction mechanisms and numerical chemistry."
  },
  {
    name: "Mrs. M. Bhuvana Latha",
    subject: "Chemistry",
    role: "Senior Academic Expert - Chemistry",
    image: "/assets/faculty/bhuvana_latha.png",
    bio: "Expert mentor focused on Inorganic Chemistry, conceptual clarity, memory retention techniques, and structured competitive practice."
  },
  {
    name: "Mr. Pagadala Malakondaiah",
    subject: "Biology",
    role: "Senior Academic Expert - Biology",
    image: "/assets/faculty/malakondaiah.png",
    bio: "Distinguished biology pedagogue guiding aspirants to score maximum marks in NEET Botany and Zoology through visual and diagrammatic synthesis."
  },
  {
    name: "Mr. Shaik Rasheed",
    subject: "Physics",
    role: "Senior Academic Expert - Physics",
    image: "/assets/faculty/shaik_rasheed.png",
    bio: "Expert physicist passionate about experiential mechanics, electrodynamics, and developing intuitive visualization for NEET and IIT-JEE physics."
  }
];

export const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Seminar for Life Goal - Shaping the Real Professionals",
    category: "Events",
    image: "/assets/slides/slide_1.png",
    description: "Official Vasakal Academy life-goal seminar introducing career pathways for students."
  },
  {
    id: 2,
    title: "Core Academic Faculty Panel",
    category: "Academy",
    image: "/assets/slides/slide_16.png",
    description: "Our dedicated subject matter leaders in Mathematics, Physics, Chemistry, and Biology."
  },
  {
    id: 3,
    title: "Curriculum Integration & Experiential Learning",
    category: "Classes",
    image: "/assets/slides/slide_15.png",
    description: "Subjective and objective frameworks given equal priority in our classroom modules."
  },
  {
    id: 4,
    title: "Interactive Course Design Triangle",
    category: "Activities",
    image: "/assets/slides/slide_11.png",
    description: "Structured alignment of Objectives, Activities, and Assessments."
  },
  {
    id: 5,
    title: "Foundation Spiral Design Architecture",
    category: "Classes",
    image: "/assets/slides/slide_12.png",
    description: "7th revision, 8th core mastery, and 9th bridge basics."
  },
  {
    id: 6,
    title: "Career Aspirations & Pathways",
    category: "Students",
    image: "/assets/slides/slide_3.png",
    description: "Guiding students toward Engineering, Medicine, CA, and Civil Services."
  },
  {
    id: 7,
    title: "Curriculum Bandwidth Analysis",
    category: "Academy",
    image: "/assets/slides/slide_5.png",
    description: "Bridging the gap between secondary school and national entrance levels."
  },
  {
    id: 8,
    title: "When Does a Child Require Foundation?",
    category: "Events",
    image: "/assets/slides/slide_7.png",
    description: "Parent and student seminar discussing the benefits of starting early from Class 6th."
  },
  {
    id: 9,
    title: "Institutional Focus & Learning Atmosphere",
    category: "Academy",
    image: "/assets/slides/slide_6.png",
    description: "Creating a scientifically designed curriculum and conducive atmosphere for practice."
  },
  {
    id: 10,
    title: "Student Comparison Matrix",
    category: "Students",
    image: "/assets/slides/slide_8.png",
    description: "Demonstrating the tangible advantages of early academic foundation training."
  },
  {
    id: 11,
    title: "Comprehensive Competitive Solutions",
    category: "Activities",
    image: "/assets/slides/slide_13.png",
    description: "Integrated syllabus aligned with NEET, IIT JEE Mains/Advanced, and Olympiad standards."
  },
  {
    id: 12,
    title: "Bodinayakanur Offline Campus Center",
    category: "Academy",
    image: "/assets/slides/slide_14.png",
    description: "Thasildar Office Road center providing personalized hand-holding and support."
  }
];

export const STATS = [
  { value: "7 Years", label: "Structured Tenure", sub: "Class 6th to 12th progression" },
  { value: "100%", label: "Personalized Focus", sub: "Individualized analysis & support" },
  { value: "4 Pillars", label: "Integrated Learning", sub: "Creative, Enquiry, Solving & Doing" },
  { value: "5 Experts", label: "Core Academic Panel", sub: "Math, Physics, Chemistry & Bio" }
];
