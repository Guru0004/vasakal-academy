// Vasakal Academy AI Knowledge & Navigation Engine
// Strictly restricted to Vasakal Academy website offerings and guidance.

import { ACADEMY_INFO, ENROLLMENT_FORM_URL, FACULTY, PROGRAMS } from "./academyData";

// Navigation helper that smoothly scrolls and highlights the target section
export const navigateToSection = (sectionId) => {
  const cleanId = sectionId.replace("#", "");
  const target = document.getElementById(cleanId);
  if (target) {
    const navOffset = 80;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });

    // Add brief pulsing glow highlight to the section
    target.classList.add("ring-4", "ring-blue-500/60", "transition-all", "duration-500", "rounded-2xl");
    setTimeout(() => {
      target.classList.remove("ring-4", "ring-blue-500/60");
    }, 2200);
    return true;
  }
  return false;
};

// Generates time & user-specific initial greeting
export const getPersonalizedGreeting = (timeGreeting, isNewVisitor) => {
  if (isNewVisitor) {
    return {
      text: `👋 **${timeGreeting.greeting}!** ${timeGreeting.emoji}\n\nWelcome to **Vasakal Academy**! I am your AI Navigator, dedicated **exclusively** to helping you explore our academy's programs, hostel life, faculty experts, and admissions.\n\n${timeGreeting.description}\n\nSelect a topic below or type your question:`,
      actions: [
        { label: "🚀 Super 30 (NEET & JEE)", targetId: "super30" },
        { label: "📚 Foundation (Class 4-10)", targetId: "programs" },
        { label: "🏠 Boys & Girls Hostel", targetId: "hostel" },
        { label: "📝 How to Enroll", externalUrl: ENROLLMENT_FORM_URL }
      ]
    };
  } else {
    return {
      text: `🌟 **Welcome back to Vasakal Academy!** ${timeGreeting.greeting}! ${timeGreeting.emoji}\n\nGreat to have you revisit our website. Looking to explore our Super 30 repeaters batch, hostel facilities, faculty, or admissions?\n\nHow may I direct you on the website today?`,
      actions: [
        { label: "🚀 Super 30 Program", targetId: "super30" },
        { label: "🏠 Campus & Hostel", targetId: "hostel" },
        { label: "👨‍🏫 Our Faculty", targetId: "faculty" },
        { label: "📞 Call Academy", phoneUrl: `tel:${ACADEMY_INFO.contacts.phones[0]}` }
      ]
    };
  }
};

// Check if a query is clearly out of bounds for the academy
const OUT_OF_SCOPE_PATTERNS = [
  /\b(python|javascript|coding|html|css|react|sql|java|c\+\+|programming|script)\b/i,
  /\b(capital of|president of|prime minister|who is the king|weather in|movie|actor|actress|cinema|song|lyrics)\b/i,
  /\b(ipl|cricket score|fifa|world cup|football match|bitcoin|crypto|stock market)\b/i,
  /\b(recipe|cook|pasta|pizza|biryani|restaurant near|hotel in paris)\b/i,
  /\b(tell me a joke|write a poem|write an essay on love|sing a song)\b/i,
  /\b(chatgpt|openai|gemini model|deepmind|anthropic)\b/i,
  /\b(allen|aakash|fiitjee|resonance|sri chaitanya|narayana coaching)\b/i
];

// Query responder strictly bound to Vasakal Academy
export const processAcademyQuery = (rawQuery) => {
  const query = rawQuery.trim().toLowerCase();

  if (!query) {
    return {
      text: "Please enter a question regarding Vasakal Academy's courses, Super 30 batch, hostel facilities, faculty, or admissions.",
      actions: [
        { label: "🚀 Super 30", targetId: "super30" },
        { label: "🏠 Hostel Life", targetId: "hostel" },
        { label: "📚 Programs", targetId: "programs" }
      ]
    };
  }

  // 1. STRICT DOMAIN GUARD CHECK
  const isOutOfScope = OUT_OF_SCOPE_PATTERNS.some(regex => regex.test(query));
  // Exceptions if they mention academy/exam context together
  const hasAcademyContext = /\b(vasakal|super 30|super30|neet|jee|hostel|bodinayakanur|narayana|foundation|admission|enroll|faculty|syllabus)\b/i.test(query);

  if (isOutOfScope && !hasAcademyContext) {
    return {
      text: `🛡️ **Vasakal Academy Domain Notice**:
I am the **Vasakal Academy AI Assistant**, dedicated **strictly and exclusively** to information about **Vasakal Academy** (our courses, Super 30 program, hostel amenities, faculty experts, admissions, and Bodinayakanur campus).

I am not permitted to answer general trivia, programming, or external topics.

**Here is what I can direct you to on this website:**
- 🚀 **Super 30 Batch** for NEET & JEE Repeaters
- 📚 **Foundation Academic Program** (Class 4th to 10th)
- 🏠 **Separate Hostels** for Boys and Girls with food & 24/7 security
- 👨‍🏫 **Senior Faculty Mentors** (Math, Physics, Chemistry, Biology)
- 📝 **Admissions & Online Enrollment Form**
- 📍 **Campus Location** (Bodinayakanur) & Direct Phone Support

What would you like to explore regarding Vasakal Academy?`,
      actions: [
        { label: "🚀 Super 30 Details", targetId: "super30" },
        { label: "🏠 Hostel Facilities", targetId: "hostel" },
        { label: "📚 View Programs", targetId: "programs" },
        { label: "📝 Enroll Online", externalUrl: ENROLLMENT_FORM_URL }
      ],
      isGuardrailTriggered: true
    };
  }

  // 2. SUPER 30 / NEET / JEE REPEATERS
  if (
    query.includes("super 30") ||
    query.includes("super30") ||
    query.includes("repeater") ||
    query.includes("dropper") ||
    (query.includes("neet") && query.includes("repeat")) ||
    (query.includes("jee") && query.includes("repeat")) ||
    query.includes("30 seats")
  ) {
    return {
      text: `🚀 **Vasakal Super 30 Program (NEET & JEE Repeaters)**

The **Super 30** program is our flagship, highly rigorous intensive coaching module specifically tailored for NEET and JEE repeaters/droppers:

- 🎯 **Strictly 30 Seats Only:** We cap the batch at 30 aspirants to guarantee 100% individual mentorship and direct faculty supervision.
- 📈 **Daily Intensive Testing:** Daily OMR-based mock tests, granular error analysis, and targeted concept reinforcement.
- 🤝 **Dedicated Mentorship:** One-on-one doubt resolution and daily performance tracking by senior academic directors.
- 🏆 **Maximized Success Rate:** Designed to transform repeater aspirants into top-rankers in government medical colleges and premier IITs/NITs.

Would you like me to take you directly to the Super 30 section or open the enrollment form?`,
      actions: [
        { label: "👉 Go to Super 30 Section", targetId: "super30" },
        { label: "📝 Fill Google Enrollment Form", externalUrl: ENROLLMENT_FORM_URL },
        { label: "📞 Call Academy: 9842863113", phoneUrl: "tel:9842863113" }
      ]
    };
  }

  // 3. HOSTEL / ACCOMMODATION / FOOD / ROOMS
  if (
    query.includes("hostel") ||
    query.includes("stay") ||
    query.includes("accommodation") ||
    query.includes("food") ||
    query.includes("canteen") ||
    query.includes("cafeteria") ||
    query.includes("room") ||
    query.includes("mess") ||
    query.includes("girls hostel") ||
    query.includes("boys hostel") ||
    query.includes("living")
  ) {
    return {
      text: `🏠 **Vasakal Academy Premium Hostel Facilities**

We provide comfortable, disciplined, and secure residential living for outstation students:

- 👦 **Separate Boys Hostel:** Spacious, airy rooms with structured study hours, disciplined atmosphere, and dedicated male warden supervision.
- 👧 **Separate Girls Hostel:** Maximum safety and comfort with **24/7 dedicated female security guards** and resident female wardens.
- 🍲 **Nutritious & Hygienic Food:** Healthy meals planned for students' stamina and mental focus.
- 📶 **High-Speed Internet:** For academic reference and online resources.
- 📖 **Dedicated Silent Study Rooms:** Distraction-free spaces optimized for late-night and early-morning study.
- ☕ **Recreation Areas:** Safe spaces to decompress between intensive study sessions.

Let me take you to the Hostel section to view photos and details!`,
      actions: [
        { label: "👉 View Hostel & Rooms Section", targetId: "hostel" },
        { label: "📞 Inquire Hostel Vacancies", phoneUrl: "tel:9842863113" },
        { label: "📍 View Campus Location", targetId: "contact" }
      ]
    };
  }

  // 4. FOUNDATION COURSES / CLASS 4 TO 10
  if (
    query.includes("foundation") ||
    query.includes("class 6") ||
    query.includes("class 7") ||
    query.includes("class 8") ||
    query.includes("class 9") ||
    query.includes("class 10") ||
    query.includes("class 4") ||
    query.includes("class 5") ||
    query.includes("middle school") ||
    query.includes("spiral") ||
    query.includes("cbse") ||
    query.includes("icse") ||
    query.includes("state board")
  ) {
    return {
      text: `📚 **Vasakal Foundation Program (Classes 4th to 10th)**

Our Foundation curriculum is structured to build competitive mindset early:

- ⏳ **7-Year Progression vs 2-Year Rush:** Starting from middle school gives students optimum mind maturity, eliminating the huge leap/shock in Class 11th.
- 🌀 **Spiral Curriculum Architecture:**
  - *7th Class:* Revision & prerequisite strengthening.
  - *8th Class:* In-depth core topic mastery and analytical deduction.
  - *9th Class:* Early preview and bridge basics of 10th & 11th concepts.
- 🌐 **Multi-Board Synergy:** Integrates CBSE, ICSE, and Tamil Nadu State Board syllabi with competitive orientation (NEET, JEE, NTSE, Olympiads).
- 📊 **OMR & Multi-Perspective Testing:** Single-correct, multi-correct, and matrix-matching formats to master competitive thinking.

Shall I take you to the Foundation section or Programs section?`,
      actions: [
        { label: "👉 View Foundation Details", targetId: "foundation" },
        { label: "👉 View All Programs", targetId: "programs" },
        { label: "📝 Apply for Foundation Batch", externalUrl: ENROLLMENT_FORM_URL }
      ]
    };
  }

  // 5. NEET & MEDICAL / JEE & ENGINEERING
  if (
    query.includes("neet") ||
    query.includes("medical") ||
    query.includes("doctor") ||
    query.includes("mbbs") ||
    query.includes("jee") ||
    query.includes("iit") ||
    query.includes("engineering") ||
    query.includes("nit") ||
    query.includes("aiims")
  ) {
    return {
      text: `🎯 **NEET & IIT-JEE Excellence Tracks at Vasakal Academy**

- 🩺 **Doctor / NEET Track:**
  Deep conceptual command across Biology (Botany & Zoology), Chemistry, and Physics. High-speed accuracy training, visual synthesis, and mock drills targeted at premier government medical colleges and AIIMS.
- ⚙️ **Engineer / IIT-JEE Track:**
  Mastery in advanced problem solving, multi-concept physics mechanics, electrodynamics, advanced calculus, and organic reaction mechanisms for IIT JEE Mains & Advanced.
- 👥 **Programs Available:**
  1. *Foundation Track (Class 4th-10th)*
  2. *Integrated Academic Program (Class 11th-12th)*
  3. *Super 30 Dedicated Repeaters Batch (30 Seats)*

Where would you like to navigate?`,
      actions: [
        { label: "👉 Explore Super 30 (Repeaters)", targetId: "super30" },
        { label: "👉 Explore Programs (11th-12th)", targetId: "programs" },
        { label: "👉 View Aspirations", targetId: "aspirations" },
        { label: "📝 Direct Enrollment", externalUrl: ENROLLMENT_FORM_URL }
      ]
    };
  }

  // 6. FACULTY & TEACHERS & EXPERTS
  if (
    query.includes("faculty") ||
    query.includes("teacher") ||
    query.includes("sir") ||
    query.includes("mentor") ||
    query.includes("staff") ||
    query.includes("narayana") ||
    query.includes("anil") ||
    query.includes("bhuvana") ||
    query.includes("malakondaiah") ||
    query.includes("rasheed")
  ) {
    const facultyNames = FACULTY.map(f => `• **${f.name}** (${f.subject}) - *${f.role}*`).join("\n");
    return {
      text: `👨‍🏫 **Vasakal Academy Senior Academic Panel**

Our students are guided by veteran academic experts with decades of national-level training experience:

${facultyNames}

- **Personalized Mentorship:** Hand-holding approach with direct weekday telephonic doubt clearance.
- **Faculty Improvement Program (FIP):** Constant pedagogy enhancements aligned with updated NTA & IIT patterns.

Let me navigate you directly to meet the faculty!`,
      actions: [
        { label: "👉 View Faculty Section", targetId: "faculty" },
        { label: "📞 Speak to Faculty Coordinator", phoneUrl: "tel:9842863113" }
      ]
    };
  }

  // 7. ADMISSIONS / ENROLLMENT / FEES / HOW TO JOIN / REGISTRATION
  if (
    query.includes("admit") ||
    query.includes("admission") ||
    query.includes("enroll") ||
    query.includes("join") ||
    query.includes("apply") ||
    query.includes("form") ||
    query.includes("fee") ||
    query.includes("cost") ||
    query.includes("price") ||
    query.includes("register")
  ) {
    return {
      text: `📝 **Admissions & Enrollment Process**

Joining Vasakal Academy is simple and transparent:

1. 📄 **Fill the Online Enrollment Form:** Submit your details directly through our official Google Form.
2. 📞 **Diagnostic Counseling:** Our academic mentors will contact you to evaluate student goals and recommend the optimal batch (Foundation, Class 11-12, or Super 30).
3. 🏫 **Campus Visit & Confirmation:** Visit our Bodinayakanur center to complete admission formalities and tour hostel facilities.

*Note on Fees:* Course and hostel fee structures depend on the selected program (Foundation, 11th/12th, or Super 30) and scholarship evaluations. Please call our admission desk for current fee charts.`,
      actions: [
        { label: "📝 Open Official Enrollment Form", externalUrl: ENROLLMENT_FORM_URL },
        { label: "📞 Call Admissions (9842863113)", phoneUrl: "tel:9842863113" },
        { label: "👉 Contact & Location Info", targetId: "contact" }
      ]
    };
  }

  // 8. CONTACT / PHONE / ADDRESS / LOCATION / MAP / TIMINGS
  if (
    query.includes("contact") ||
    query.includes("phone") ||
    query.includes("mobile") ||
    query.includes("number") ||
    query.includes("call") ||
    query.includes("address") ||
    query.includes("location") ||
    query.includes("where") ||
    query.includes("map") ||
    query.includes("bodinayakanur") ||
    query.includes("email")
  ) {
    return {
      text: `📍 **Vasakal Academy Contact & Campus Location**

- 🏢 **Address:** ${ACADEMY_INFO.contacts.address}
- 📞 **Helpline Numbers:**
  - **9842863113** (Primary Admissions)
  - **+91 4546 462773** (Office)
  - **9944789783** (Student Support)
- ✉️ **Email:** ${ACADEMY_INFO.contacts.email}
- 🕒 **Weekday Support:** Dedicated academic telephonic doubt resolution and offline counseling during weekdays.

I can scroll you down to our campus interactive map and contact inquiry form!`,
      actions: [
        { label: "👉 Jump to Contact Section & Map", targetId: "contact" },
        { label: "📞 Call Now: 9842863113", phoneUrl: "tel:9842863113" },
        { label: "✉️ Send an Email", phoneUrl: `mailto:${ACADEMY_INFO.contacts.email}` }
      ]
    };
  }

  // 9. APPROACH, METHODOLOGY, PILLARS
  if (
    query.includes("approach") ||
    query.includes("method") ||
    query.includes("pedagogy") ||
    query.includes("pillar") ||
    query.includes("study") ||
    query.includes("how do you teach") ||
    query.includes("technique")
  ) {
    return {
      text: `💡 **Vasakal Academy 4 Pillars of Learning**

1. 🌟 **Creative Thinking:** Out-of-the-box analytical problem solving beyond simple memorization.
2. 🔍 **Enquiry Based Learning:** Developing hypotheses and logical deductions.
3. 🧩 **Problem Solving:** Structured techniques for complex multi-layered questions.
4. 🔬 **Experiential Learning:** Hands-on activities that make abstract theory crystal clear.

**Core Academic Principle:** *Equal weightage is given to Subjective board theory + Objective competitive mastery!*`,
      actions: [
        { label: "👉 Explore Our Approach Section", targetId: "approach" },
        { label: "👉 View Challenges & Solutions", targetId: "challenges" },
        { label: "👉 View Faculty Team", targetId: "faculty" }
      ]
    };
  }

  // 10. GALLERY, PHOTOS, INFRASTRUCTURE, STUDY ROOM
  if (
    query.includes("gallery") ||
    query.includes("photo") ||
    query.includes("image") ||
    query.includes("picture") ||
    query.includes("smart room") ||
    query.includes("campus") ||
    query.includes("infrastructure")
  ) {
    return {
      text: `🖼️ **Vasakal Academy Campus & Facilities**

Our Bodinayakanur campus offers state-of-the-art infrastructure:
- 💻 **Smart Teaching Classrooms** equipped for interactive digital pedagogy.
- 📚 **Dedicated Aspirant Study Rooms** providing quiet, distraction-free atmosphere for focused revision.
- 🏆 Seminars and career guidance sessions for students and parents.

Check out our campus photo gallery!`,
      actions: [
        { label: "👉 View Gallery Section", targetId: "gallery" },
        { label: "👉 View Hostel Facilities", targetId: "hostel" },
        { label: "📍 Campus Map & Location", targetId: "contact" }
      ]
    };
  }

  // 11. ABOUT / MISSION / LIFE GOAL SEMINAR
  if (
    query.includes("about") ||
    query.includes("mission") ||
    query.includes("vasakal") ||
    query.includes("who are you") ||
    query.includes("history") ||
    query.includes("why vasakal")
  ) {
    return {
      text: `🏛️ **About Vasakal Academy**

*"${ACADEMY_INFO.tagline}"*

- **Mission:** ${ACADEMY_INFO.mission}
- **Seminar for Life Goal:** Shaping real professionals through early conceptual clarity, individualized diagnostic analysis, and continuous mentorship.
- **Philosophy:** ${ACADEMY_INFO.philosophy}
- **Location:** Bodinayakanur, Tamil Nadu.

Explore our mission and student achievements below:`,
      actions: [
        { label: "👉 About / Mission Section", targetId: "about" },
        { label: "👉 Explore Programs", targetId: "programs" },
        { label: "🚀 Super 30 Program", targetId: "super30" }
      ]
    };
  }

  // 12. FALLBACK FOR GENERAL SITE-RELATED QUERY
  return {
    text: `I'm happy to help you with that! Here is a summary of what Vasakal Academy provides for your question:

Vasakal Academy in Bodinayakanur is dedicated to **competitive academic excellence** (NEET, IIT-JEE, and Foundation Class 4-10). With our **Super 30** batch, experienced faculty panel, separate hostels with 24/7 security, and personalized doubt clearance, we ensure comprehensive student success.

Where on our website can I direct you?`,
    actions: [
      { label: "🚀 Super 30 (NEET & JEE)", targetId: "super30" },
      { label: "📚 Academic Programs", targetId: "programs" },
      { label: "🏠 Hostel Facilities", targetId: "hostel" },
      { label: "👨‍🏫 Faculty Experts", targetId: "faculty" },
      { label: "📞 Contact / Campus Center", targetId: "contact" },
      { label: "📝 Online Enrollment Form", externalUrl: ENROLLMENT_FORM_URL }
    ]
  };
};

export const QUICK_SUGGESTIONS = [
  "What is the Super 30 program?",
  "Tell me about hostel & food facilities",
  "Foundation course for Class 6th to 10th",
  "How to enroll and apply?",
  "Who are the faculty experts?",
  "Where is the campus located?"
];
