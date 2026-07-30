export const PROMPT_LIBRARY = [
  {
    id: "biz-1",
    category: "Business",
    title: "Write a Business Proposal",
    description: "Generate a professional business proposal for a new client.",
    text: "Create a formal business proposal for [Client Name] offering [Your Services]. Structure it with an Executive Summary, Scope of Work, Proposed Timeline, and Pricing Breakdown."
  },
  {
    id: "biz-2",
    category: "Business",
    title: "Create an Invoice",
    description: "Automatically generate an invoice in the Finance tab.",
    text: "Create an invoice for [Customer Name] for [Amount] for [Service/Product provided]."
  },
  {
    id: "biz-3",
    category: "Business",
    title: "Draft a Meeting Agenda",
    description: "Create an agenda for an upcoming team or client meeting.",
    text: "Draft a 1-hour meeting agenda for a team sync discussing [Topic]. Include time slots for introduction, main discussion points, Q&A, and action items."
  },
  {
    id: "biz-4",
    category: "Business",
    title: "Negotiation Email",
    description: "Write an email to negotiate better terms or pricing.",
    text: "Write a polite but firm email to a vendor negotiating a 15% discount on their recent quote, highlighting our long-term partnership."
  },
  {
    id: "biz-5",
    category: "Business",
    title: "SWOT Analysis",
    description: "Conduct a SWOT analysis for your business idea.",
    text: "Conduct a comprehensive SWOT (Strengths, Weaknesses, Opportunities, Threats) analysis for a new business that provides [Describe Business Idea]."
  },
  {
    id: "mark-1",
    category: "Marketing",
    title: "Social Media Strategy",
    description: "Plan a 1-month content strategy for social media.",
    text: "Create a 4-week social media content calendar for a [Type of Business]. Include post themes, format (video/image/text), and target audience for each week."
  },
  {
    id: "mark-2",
    category: "Marketing",
    title: "Write Ad Copy",
    description: "Generate persuasive copy for Facebook/Instagram ads.",
    text: "Write three variations of a Facebook ad copy for a [Product/Service]. Focus one on price, one on quality, and one on urgency (limited time offer)."
  },
  {
    id: "mark-3",
    category: "Marketing",
    title: "SEO Blog Outline",
    description: "Create a structured outline for an SEO-optimized blog post.",
    text: "Generate an SEO-optimized blog post outline about [Topic]. Include a catchy title, H2 and H3 headings, and bullet points for the main arguments."
  },
  {
    id: "mark-4",
    category: "Marketing",
    title: "Product Launch Email",
    description: "Draft an email newsletter announcing a new product.",
    text: "Write an exciting email newsletter announcing the launch of our new [Product]. Highlight its top 3 benefits and include a strong call-to-action."
  },
  {
    id: "mark-5",
    category: "Marketing",
    title: "Customer Persona",
    description: "Build a detailed ideal customer profile.",
    text: "Create a detailed buyer persona for a [Type of Product]. Include demographics, pain points, goals, and buying objections."
  },
  {
    id: "health-1",
    category: "Healthcare",
    title: "Patient Intake Form",
    description: "Design a comprehensive patient intake form.",
    text: "Draft a comprehensive new patient intake questionnaire for a local clinic, including sections for medical history, current symptoms, and emergency contacts."
  },
  {
    id: "health-2",
    category: "Healthcare",
    title: "Explain Medical Term",
    description: "Simplify complex medical jargon for a patient.",
    text: "Explain the diagnosis of [Medical Condition] in simple, easy-to-understand language for a patient with no medical background, including basic treatment steps."
  },
  {
    id: "health-3",
    category: "Healthcare",
    title: "Dietary Plan Template",
    description: "Create a basic 7-day meal plan template.",
    text: "Create a generic 7-day healthy meal plan template for a patient looking to manage [Condition, e.g., High Blood Pressure or Diabetes]. Include breakfast, lunch, and dinner."
  },
  {
    id: "health-4",
    category: "Healthcare",
    title: "Clinic Standard Operating Procedure",
    description: "Write an SOP for clinic hygiene or operations.",
    text: "Write a Standard Operating Procedure (SOP) for front-desk staff at a medical clinic covering patient check-in, sanitization, and handling emergencies."
  },
  {
    id: "health-5",
    category: "Healthcare",
    title: "Post-Appointment Follow-up",
    description: "Draft a polite follow-up email/SMS for patients.",
    text: "Draft a friendly post-appointment follow-up message (SMS and Email version) asking the patient how they are feeling and reminding them to take their medication."
  },
  {
    id: "edu-1",
    category: "Education",
    title: "Lesson Plan Generator",
    description: "Create a structured lesson plan for a specific topic.",
    text: "Create a 45-minute lesson plan for [Grade Level] students about [Subject/Topic]. Include objectives, introduction, main activity, and assessment."
  },
  {
    id: "edu-2",
    category: "Education",
    title: "Quiz Creator",
    description: "Generate a multiple-choice quiz.",
    text: "Create a 10-question multiple-choice quiz on [Topic]. Provide the answer key at the bottom with brief explanations for the correct answers."
  },
  {
    id: "edu-3",
    category: "Education",
    title: "Simplify Complex Concept",
    description: "Explain a difficult topic simply to students.",
    text: "Explain the concept of [Complex Topic, e.g., Quantum Computing or Photosynthesis] as if you were talking to a 10-year-old."
  },
  {
    id: "edu-4",
    category: "Education",
    title: "Study Schedule",
    description: "Plan a revision timetable for exams.",
    text: "Create a 4-week study schedule for a student preparing for [Exam Name]. They can study 2 hours a day on weekdays and 4 hours on weekends."
  },
  {
    id: "edu-5",
    category: "Education",
    title: "Recommendation Letter",
    description: "Draft a letter of recommendation for a student.",
    text: "Draft a strong letter of recommendation for my student, [Student Name], who is applying for [University/Scholarship]. Highlight their leadership and academic dedication."
  },
  {
    id: "it-1",
    category: "IT & Tech",
    title: "Code Debugging",
    description: "Help fix an error in a code snippet.",
    text: "I have a bug in my [Language] code. The error message is [Error Message]. Here is the code: [Paste Code]. Please explain what is wrong and how to fix it."
  },
  {
    id: "it-2",
    category: "IT & Tech",
    title: "API Documentation",
    description: "Generate documentation for a REST API.",
    text: "Generate clear REST API documentation for an endpoint that [Describe what the endpoint does]. Include request parameters, headers, and example JSON responses."
  },
  {
    id: "it-3",
    category: "IT & Tech",
    title: "Server Setup Script",
    description: "Write a bash script for server provisioning.",
    text: "Write a bash script for Ubuntu 22.04 that installs Node.js, Nginx, and PM2, and configures a basic reverse proxy for an app running on port 3000."
  },
  {
    id: "it-4",
    category: "IT & Tech",
    title: "Database Schema Design",
    description: "Design SQL tables for a new feature.",
    text: "Design a relational database schema (SQL) for a [Type of App, e.g., E-commerce store]. Provide the CREATE TABLE statements with foreign keys."
  },
  {
    id: "it-5",
    category: "IT & Tech",
    title: "Explain Architecture",
    description: "Summarize a system architecture.",
    text: "Explain the difference between a Monolithic architecture and Microservices to a non-technical project manager. Use a real-world analogy."
  },
  {
    id: "legal-1",
    category: "Legal & Admin",
    title: "Non-Disclosure Agreement",
    description: "Draft a basic NDA template.",
    text: "Draft a standard, mutual Non-Disclosure Agreement (NDA) template between two parties discussing a potential business partnership."
  },
  {
    id: "legal-2",
    category: "Legal & Admin",
    title: "Employment Contract Outline",
    description: "List the essential clauses for an employment contract.",
    text: "List and briefly explain the 10 essential clauses that should be included in a standard full-time employment contract."
  },
  {
    id: "legal-3",
    category: "Legal & Admin",
    title: "Cease and Desist Letter",
    description: "Draft a formal cease and desist notice.",
    text: "Draft a formal Cease and Desist letter to a party that is [Describe the infringing action, e.g., using copyrighted images without permission]."
  },
  {
    id: "hr-1",
    category: "Human Resources",
    title: "Job Description",
    description: "Write a compelling job posting.",
    text: "Write a detailed job description for a [Job Title] role at a [Company Type]. Include responsibilities, requirements, and a section on company culture."
  },
  {
    id: "hr-2",
    category: "Human Resources",
    title: "Interview Questions",
    description: "Generate role-specific interview questions.",
    text: "Generate 10 behavioral and technical interview questions for a candidate applying for the position of [Job Title]. Provide what to look for in a good answer."
  },
  {
    id: "hr-3",
    category: "Human Resources",
    title: "Employee Onboarding Plan",
    description: "Structure a 30-day onboarding experience.",
    text: "Create a 30-day onboarding checklist and schedule for a new hire in the [Department] department. Break it down by Week 1, Week 2, Week 3, and Week 4."
  }
];

