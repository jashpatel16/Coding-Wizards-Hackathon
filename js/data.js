/* CareerCompass Data: 9 dimensions, 12 questions, 10 careers */
const DIMENSIONS = ["technical","analytical","creative","communication","leadership","problemSolving","data","technology","socialImpact"];

const DIMENSION_LABELS = {
  technical: "Technical",
  analytical: "Analytical",
  creative: "Creative",
  communication: "Communication",
  leadership: "Leadership",
  problemSolving: "Problem Solving",
  data: "Data",
  technology: "Technology",
  socialImpact: "Social Impact"
};

const QUESTIONS = [
  { id:1, text:"On a free weekend, what would you most enjoy?", options:[
    { text:"Build an app, website or robot", weights:{technical:3, technology:2, problemSolving:1} },
    { text:"Solve puzzles or analyse cricket / game stats", weights:{analytical:3, data:2, problemSolving:1} },
    { text:"Design a poster, video or story", weights:{creative:3, communication:1, technology:1} },
    { text:"Organise a community drive or campaign", weights:{leadership:2, communication:2, socialImpact:3} }
  ]},
  { id:2, text:"Which subject excites you the most?", options:[
    { text:"Maths / Physics / Computer Science", weights:{technical:3, analytical:2, problemSolving:1} },
    { text:"Biology / Economics (with data & research)", weights:{data:2, analytical:2, socialImpact:2} },
    { text:"Art / Literature / Design", weights:{creative:3, communication:2} },
    { text:"Civics / Business / Social Studies", weights:{leadership:2, communication:2, socialImpact:1} }
  ]},
  { id:3, text:"In a team project, what role do you naturally take?", options:[
    { text:"Builder — I make the working prototype", weights:{technical:3, technology:2, problemSolving:1} },
    { text:"Analyst — I research and find patterns", weights:{analytical:3, data:2} },
    { text:"Designer — I make it look great & clear", weights:{creative:3, communication:1, technology:1} },
    { text:"Leader — I plan, motivate and present", weights:{leadership:3, communication:2, socialImpact:1} }
  ]},
  { id:4, text:"Which problem would you love to solve?", options:[
    { text:"Slow apps, bugs, broken gadgets", weights:{technical:3, technology:2, problemSolving:2} },
    { text:"Fake news, confusing data, bad decisions", weights:{analytical:3, data:3} },
    { text:"Boring designs, dull content", weights:{creative:3, communication:2, technology:1} },
    { text:"Poverty, illiteracy, unfair systems", weights:{socialImpact:3, leadership:2, communication:1} }
  ]},
  { id:5, text:"How do you feel about coding & technology?", options:[
    { text:"Love it — I code for fun", weights:{technical:3, technology:3} },
    { text:"Like it for data / AI / analysis", weights:{data:3, analytical:2, technology:2} },
    { text:"Like it only for creative tools (editing, design)", weights:{creative:2, technology:2, communication:1} },
    { text:"Prefer working with people directly", weights:{communication:3, socialImpact:2, leadership:1} }
  ]},
  { id:6, text:"Which statement describes you best?", options:[
    { text:"Logical — I break big problems into steps", weights:{problemSolving:3, analytical:2, technical:1} },
    { text:"Curious with numbers — I love charts & trends", weights:{data:3, analytical:2, problemSolving:1} },
    { text:"Imaginative — I think of new ideas & visuals", weights:{creative:3, problemSolving:1} },
    { text:"Empathetic — I understand people & society", weights:{socialImpact:3, communication:2, leadership:1} }
  ]},
  { id:7, text:"Pick a school club:", options:[
    { text:"Robotics / Coding club", weights:{technical:3, technology:2, problemSolving:1} },
    { text:"Maths / Science Olympiad / Quiz", weights:{analytical:3, problemSolving:2, data:1} },
    { text:"Art / Music / Content creation", weights:{creative:3, communication:2} },
    { text:"NSS / Student council / Debate", weights:{leadership:3, communication:2, socialImpact:2} }
  ]},
  { id:8, text:"What kind of work environment attracts you?", options:[
    { text:"Tech lab / startup with new gadgets", weights:{technology:3, technical:2, problemSolving:1} },
    { text:"Research / analytics team", weights:{data:3, analytical:2} },
    { text:"Studio / creative agency", weights:{creative:3, communication:1, technology:1} },
    { text:"Field / community / government service", weights:{socialImpact:3, leadership:2, communication:1} }
  ]},
  { id:9, text:"How do you handle a difficult problem?", options:[
    { text:"Try, debug, rebuild until it works", weights:{problemSolving:3, technical:2, technology:1} },
    { text:"Collect data, compare options, then decide", weights:{analytical:3, data:2, problemSolving:1} },
    { text:"Brainstorm wild ideas and prototype fast", weights:{creative:3, problemSolving:1, technology:1} },
    { text:"Talk to people, build consensus, lead", weights:{communication:2, leadership:3, socialImpact:1} }
  ]},
  { id:10, text:"Which success story inspires you most?", options:[
    { text:"Engineer who built a top app", weights:{technical:3, technology:2} },
    { text:"Scientist who found insight in data", weights:{data:3, analytical:2, problemSolving:1} },
    { text:"Designer / YouTuber with millions of fans", weights:{creative:3, communication:2, technology:1} },
    { text:"IAS officer / teacher / founder changing lives", weights:{socialImpact:3, leadership:2, communication:1} }
  ]},
  { id:11, text:"Choose a mini-task for today:", options:[
    { text:"Fix a laptop / set up Wi-Fi / automate a sheet", weights:{technical:2, technology:3, problemSolving:1} },
    { text:"Make a survey report with graphs", weights:{data:3, analytical:2, communication:1} },
    { text:"Make a logo / reel / presentation", weights:{creative:3, communication:2, technology:1} },
    { text:"Teach juniors / lead an event", weights:{leadership:3, communication:2, socialImpact:2} }
  ]},
  { id:12, text:"What is your long-term goal?", options:[
    { text:"Build products & deep tech expertise", weights:{technical:3, technology:2, problemSolving:1} },
    { text:"Become expert in decisions backed by data", weights:{data:3, analytical:2} },
    { text:"Express ideas beautifully to the world", weights:{creative:3, communication:2} },
    { text:"Lead people & create large social impact", weights:{leadership:3, socialImpact:3, communication:1} }
  ]}
];

const CAREERS = [
  { id:"software", title:"Software Engineer", icon:"💻", tagline:"Build apps, systems & the future of tech",
    description:"Design and build websites, apps and systems. Best if you love coding, debugging and problem solving.",
    weights:{technical:5, analytical:4, creative:2, communication:2, leadership:2, problemSolving:5, data:3, technology:5, socialImpact:1},
    skills:["Programming (Python/JS)","DSA & Problem Solving","Git & Databases","System Design basics"],
    courses:["CS Degree / BCA / Self-track + DSA","Full-stack (MERN) course","DSA on LeetCode/CodeChef","Internship + GitHub projects"],
    roadmap:["Class 11-12: Maths + CS, learn Python","Year 1-2: DSA, Web Dev, 3 projects","Year 3: Internship, Open Source, CP","Year 4: Placements / Product startups","Growth: SDE-2 → Senior → Architect"],
    salary:"₹4–25 LPA", growth:"Very High", education:"B.Tech/BCA or skills route", workLife:"Flexible / Hybrid", demand:5 },
  { id:"data", title:"Data Scientist / AI Engineer", icon:"📊", tagline:"Turn data into decisions & intelligent apps",
    description:"Analyse data, build ML models and AI features. Best if you love maths, stats and patterns.",
    weights:{technical:4, analytical:5, creative:2, communication:3, leadership:2, problemSolving:5, data:5, technology:4, socialImpact:2},
    skills:["Python + SQL","Statistics & ML","Data Viz & Storytelling","AI / LLM tools"],
    courses:["Maths/Stats + Python","Machine Learning Specialization","Kaggle projects + SQL","AI/GenAI + MLOps"],
    roadmap:["Foundation: Python, Maths, SQL","Intermediate: Pandas, Viz, Stats","Advanced: ML, Deep Learning, Kaggle","Portfolio: 4 end-to-end projects","Growth: Analyst → DS → Lead AI"],
    salary:"₹6–30 LPA", growth:"Very High", education:"Any degree + Maths/Stats", workLife:"Hybrid / Research", demand:5 },
  { id:"uiux", title:"UI/UX Designer", icon:"🎨", tagline:"Design beautiful, easy-to-use experiences",
    description:"Research users and design apps/websites that feel effortless. Best if you are creative + empathetic.",
    weights:{technical:2, analytical:3, creative:5, communication:4, leadership:2, problemSolving:4, data:2, technology:4, socialImpact:3},
    skills:["Figma & Design Systems","User Research","Wireframing & Prototyping","Visual storytelling"],
    courses:["Design fundamentals","Figma + UX (Coursera/Google)","3 case studies + portfolio","Internship with startup"],
    roadmap:["Learn design basics + Figma","Clone 5 apps, do UX teardowns","3 real case studies","Freelance → Intern → Full-time","Growth: Designer → Lead → Product Design"],
    salary:"₹3–18 LPA", growth:"High", education:"Any stream + portfolio", workLife:"Creative / Flexible", demand:4 },
  { id:"cyber", title:"Cybersecurity Analyst", icon:"🛡️", tagline:"Protect systems from hackers",
    description:"Secure networks, find vulnerabilities and stop attacks. Best if you are logical, technical and alert.",
    weights:{technical:5, analytical:5, creative:2, communication:2, leadership:2, problemSolving:5, data:3, technology:5, socialImpact:3},
    skills:["Networks & Linux","Ethical Hacking","Risk & Forensics","Security tools"],
    courses:["Computer networks + Linux","CEH / CompTIA Security+","TryHackMe / CTF practice","SOC internship"],
    roadmap:["Basics: Networks, OS, Python","Security certs + labs","CTFs + bug bounty","SOC Analyst role","Growth: Analyst → Pentester → Architect"],
    salary:"₹5–22 LPA", growth:"Very High", education:"CS/IT + Certs", workLife:"Shift / On-site mix", demand:5 },
  { id:"doctor", title:"Doctor / Medical Professional", icon:"🩺", tagline:"Heal lives with science & care",
    description:"Diagnose and treat patients. Best if you love biology, hard work and serving society.",
    weights:{technical:3, analytical:4, creative:1, communication:5, leadership:3, problemSolving:4, data:3, technology:2, socialImpact:5},
    skills:["Biology & Patience","Diagnostics","Empathy & Communication","Stamina for long study"],
    courses:["Class 11-12 PCB + NEET","MBBS (5.5 yrs)","MD/MS specialization","Residency + practice"],
    roadmap:["NEET prep (Bio + Chem + Phy)","MBBS + clinical postings","Internship + PG prep","MD/MS + residency","Growth: Doctor → Specialist → Surgeon/Consultant"],
    salary:"₹6–40 LPA", growth:"Stable High", education:"NEET + MBBS", workLife:"Demanding / Noble", demand:5 },
  { id:"teacher", title:"Teacher / Educator", icon:"📚", tagline:"Shape futures through teaching",
    description:"Teach, mentor and inspire. Best if you love explaining and social impact.",
    weights:{technical:1, analytical:3, creative:4, communication:5, leadership:4, problemSolving:3, data:1, technology:2, socialImpact:5},
    skills:["Subject mastery","Public speaking","Mentoring","Content creation"],
    courses:["Bachelor in subject","B.Ed / D.El.Ed","CTET / State TET","EdTech / YouTube teaching"],
    roadmap:["Master your subject","B.Ed + classroom practice","Clear TET / join school","Build digital classes","Growth: Teacher → HOD → Principal/Creator"],
    salary:"₹2–12 LPA", growth:"Stable", education:"Degree + B.Ed", workLife:"Balanced / Fulfilling", demand:4 },
  { id:"founder", title:"Entrepreneur / Startup Founder", icon:"🚀", tagline:"Start up, solve problems, lead teams",
    description:"Start your own venture. Best if you are risk-taking, leadership-driven and creative.",
    weights:{technical:2, analytical:4, creative:4, communication:5, leadership:5, problemSolving:5, data:3, technology:3, socialImpact:3},
    skills:["Idea validation","Leadership & Sales","Finance basics","Resilience"],
    courses:["Any degree + business basics","Startup / marketing course","Build MVP + get users","Pitch + incubator"],
    roadmap:["Find problem + talk to users","Build MVP in 30 days","Get 100 users","Raise / bootstrap & scale","Growth: Founder → CEO → Investor"],
    salary:"Variable (₹0–Cr)", growth:"High risk/high reward", education:"Any + skills", workLife:"Intense / Free", demand:4 },
  { id:"marketing", title:"Digital Marketing Specialist", icon:"📣", tagline:"Grow brands with content & data",
    description:"Run ads, SEO, social media and content. Best if you are creative + analytical.",
    weights:{technical:1, analytical:3, creative:5, communication:5, leadership:3, problemSolving:3, data:4, technology:4, socialImpact:2},
    skills:["Content & Copywriting","SEO + Ads (Meta/Google)","Analytics","Video/Reels"],
    courses:["Marketing basics (Google/Digital)","Ads + SEO hands-on","2 brand projects + internship","Freelance → Agency"],
    roadmap:["Learn content + Canva","SEO + Ads + Analytics","Grow 2 pages/accounts","Agency / brand job","Growth: Executive → Manager → CMO"],
    salary:"₹2.5–15 LPA", growth:"High", education:"Any stream", workLife:"Flexible / Target-based", demand:4 },
  { id:"civil", title:"Civil Services Officer (IAS/IPS)", icon:"🏛️", tagline:"Serve the nation, lead change",
    description:"Clear UPSC and administer districts, policy and law & order. Best for leadership + social impact.",
    weights:{technical:1, analytical:4, creative:2, communication:5, leadership:5, problemSolving:4, data:2, technology:1, socialImpact:5},
    skills:["GS + Current Affairs","Answer writing","Discipline & Stamina","Leadership & Ethics"],
    courses:["Any degree + NCERTs","UPSC GS + Optional","Test series + Mains writing","Interview prep"],
    roadmap:["Degree + NCERT foundation","Prelims + Mains prep (12-18 mo)","Clear Prelims → Mains → Interview","LBSNAA training","Growth: SDM → DM → Secretary"],
    salary:"₹12 LPA + perks", growth:"Prestigious/Stable", education:"Any degree + UPSC", workLife:"Powerful / Service", demand:5 },
  { id:"pm", title:"Product Manager", icon:"🧭", tagline:"Own the product from idea to launch",
    description:"Decide what to build, work with engineers & designers. Best if you are all-round: tech + business + people.",
    weights:{technical:3, analytical:4, creative:3, communication:5, leadership:5, problemSolving:5, data:4, technology:3, socialImpact:3},
    skills:["Roadmapping","Data & User empathy","Tech + Design basics","Stakeholder management"],
    courses:["Any degree + Excel/SQL","Product / Agile course","PRD + case + internship","APM programs"],
    roadmap:["Learn business + tech basics","Ship 2 mini-projects","APM / analyst role","PM → Senior PM","Growth: PM → Group PM → CPO"],
    salary:"₹8–35 LPA", growth:"Very High", education:"Any + MBA optional", workLife:"Meetings / Ownership", demand:5 }
];
