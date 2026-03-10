import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "scuuz9jw",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-03-10",
  token: "skv67jYYnd1SYMqdsDgf0j9ixTlG4b3KcybBSe0tqXM2QQbuOl3ufk13alY1dMc8lGPQ2eQQKY8IV7Nh6GOUJ64bufbAYNkS1DnvPiEFJU1VZJxa6uUcCpp35YJw0mk1OpcL9Zw8HxYl43RzWBRsVmxoVcIqCOIxQW4EWFMQuAGBuaYnEZed",
});

const heroData = {
  _type: "heroSection",
  _id: "hero-main",
  title: "Transform Your Career",
  subtitle: "With Expert Guidance",
  taglines: ["Ex Army Physician", "Career Counsellor", "Guiding Your Journey to Fulfillment"],
  description: "With years of experience as an Army Physician and career counsellor, I help students, professionals, and organizations discover their true potential and make informed career decisions.",
  experienceText: "15+ Years Experience",
};

const aboutData = {
  _type: "aboutSection",
  _id: "about-main",
  title: "About Me",
  subtitle: "Ex Army Physician with extensive experience working with school-going children and professionals facing career changes",
  description1: "As an Ex Army Physician, I bring a unique perspective to career counselling. My years of service taught me discipline, empathy, and the importance of making decisions that align with one's true calling.",
  description2: "Having worked extensively with school-going children, young adults, and professionals seeking career transitions, I understand the nuances of career development at every stage of life.",
  timeline: [
    { year: "2005", title: "Army Medical Corps", description: "Began service as Army Physician" },
    { year: "2012", title: "Career Counselling", description: "Started counselling army families" },
    { year: "2018", title: "Private Practice", description: "Expanded to schools and colleges" },
    { year: "2024", title: "Nationwide Impact", description: "Helping thousands find their path" },
  ],
  traits: [
    { title: "Empathy", description: "Understanding your unique journey and challenges with compassion", icon: "Heart" },
    { title: "Deep Understanding", description: "Comprehensive insight into career dynamics and opportunities", icon: "Brain" },
    { title: "Career Expertise", description: "Proven strategies for career success and fulfillment", icon: "Target" },
  ],
};

const statsData = {
  _type: "statsSection",
  _id: "stats-main",
  title: "Why Choose Me",
  subtitle: "Numbers that speak for the impact and trust built over years of dedicated service",
  stats: [
    { value: 15, suffix: "+", label: "Years Experience", icon: "Clock" },
    { value: 10000, suffix: "+", label: "Students Helped", icon: "Users" },
    { value: 98, suffix: "%", label: "Success Rate", icon: "Award" },
    { value: 500, suffix: "+", label: "Workshops Conducted", icon: "TrendingUp" },
  ],
  philosophy: "Early choice of appropriate career can define one's level of success and happiness",
  philosophyAuthor: "My Guiding Philosophy",
};

const mentoriaData = {
  _type: "mentoriaSection",
  _id: "mentoria-main",
  title: "Powered by Mentoria's",
  subtitle: "Career Discovery Platform",
  description: "Every consultation includes lifetime access to Mentoria: India's most trusted platform for career discovery, mentorship, and lifelong upskilling.",
  stats: [
    { value: "350,000+", label: "Students and Professionals Mentored", icon: "Users", bgColor: "bg-purple-100 dark:bg-purple-900/30", iconColor: "text-purple-500" },
    { value: "240+", label: "Corporate Partners", icon: "Building2", bgColor: "bg-teal-100 dark:bg-teal-900/30", iconColor: "text-teal-500" },
    { value: "350+", label: "Schools and College Partners", icon: "GraduationCap", bgColor: "bg-orange-100 dark:bg-orange-900/30", iconColor: "text-orange-500" },
    { value: "1,000+", label: "Hours of Career Webinars", icon: "Video", bgColor: "bg-yellow-100 dark:bg-yellow-900/30", iconColor: "text-yellow-600" },
  ],
};

const ctaData = {
  _type: "ctaSection",
  _id: "cta-main",
  title: "Ready to Transform Your Career?",
  description: "Take the first step towards a fulfilling career. Book a free consultation and let's discuss how I can help you achieve your professional goals.",
  email: "vivekupadhyay2005@gmail.com",
  phone: "+91 7030502200",
  whatsapp: "917030502200",
};

const pricingData = [
  {
    _type: "pricingCategory",
    id: "8-9",
    label: "8-9 Students",
    section: "standard",
    plans: [
      { planId: "pkg-1", name: "Discover", price: 5500, description: "Standard career discovery program for young students", isPremium: false, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Live webinar invites"] },
      { planId: "pkg-2", name: "Discover Plus+", price: 15000, description: "Comprehensive career discovery with premium support", isPremium: true, features: ["Psychometric assessments", "8 career counselling sessions (1/year)", "Custom reports & study abroad guidance", "CV building"] },
    ],
  },
  {
    _type: "pricingCategory",
    id: "10-12",
    label: "10-12 Students",
    section: "standard",
    plans: [
      { planId: "pkg-3", name: "Achieve Online", price: 5999, description: "Standard program for senior secondary students", isPremium: false, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"] },
      { planId: "pkg-4", name: "Achieve Plus+", price: 10599, description: "Premium guidance for career-focused students", isPremium: true, features: ["Psychometric assessment", "4 career counselling sessions", "Custom reports & study abroad guidance", "CV reviews"] },
    ],
  },
  {
    _type: "pricingCategory",
    id: "graduates",
    label: "Graduates",
    section: "standard",
    plans: [
      { planId: "pkg-5", name: "Ascend Online", price: 6499, description: "Career launch program for recent graduates", isPremium: false, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"] },
      { planId: "pkg-6", name: "Ascend Plus+", price: 10599, description: "Complete career placement guidance", isPremium: true, features: ["Psychometric assessment", "3 career counselling sessions", "Certificate/online course info", "CV reviews for jobs"] },
    ],
  },
  {
    _type: "pricingCategory",
    id: "professionals",
    label: "Working Professionals",
    section: "standard",
    plans: [
      { planId: "mp-3", name: "Ascend Online", price: 6499, description: "Career growth program for professionals", isPremium: false, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"] },
      { planId: "mp-2", name: "Ascend Plus+", price: 10599, description: "Leadership and career advancement guidance", isPremium: true, features: ["Psychometric assessment", "3 career counselling sessions", "Certificate/online course info", "CV reviews for jobs"] },
    ],
  },
  {
    _type: "pricingCategory",
    id: "custom",
    label: "Custom Mentorship Plans",
    section: "custom",
    plans: [
      { planId: "career-report", name: "Career Report", price: 1500, description: "Get a detailed report of your psychometric assessment for a scientific analysis of your interests.", isPremium: false, features: ["Psychometric assessment report", "Scientific interest analysis", "Future path suggestions"] },
      { planId: "career-report-counselling", name: "Career Report + Career Counselling", price: 3000, description: "Connect with India's top career coaches to analyse your report and shortlist top paths.", isPremium: true, features: ["Psychometric report", "1-on-1 coach session", "Shortlist top 3 paths"] },
      { planId: "knowledge-gateway", name: "Knowledge Gateway + Career Helpline Access", price: 100, description: "Unlock holistic information on your career path and get direct access to experts.", isPremium: false, features: ["Portal access", "Career helpline access", "Direct expert consultation"] },
      { planId: "one-to-one-session", name: "One-to-One Session with a Career Expert", price: 3500, description: "Resolve your career queries through a one-on-one session with an expert from your chosen field.", isPremium: false, features: ["1 session with expert", "Industry insights"] },
      { planId: "college-admission-planning", name: "College Admission Planning", price: 3000, description: "Get unbiased recommendations and details on your future college options in India and abroad.", isPremium: false, features: ["College list", "Course alignment", "Resourceful planner"] },
      { planId: "exam-stress-management", name: "Exam Stress Management", price: 1000, description: "Get expert guidance on tackling exam stress from India's top educators.", isPremium: false, features: ["Stress management tips", "Study schedule planning", "Revision tips"] },
      { planId: "cap-100", name: "College Admissions Planner - 100 (CAP-100)", price: 199, description: "Ranked list of the top 100 colleges in your course based on verified cut-offs.", isPremium: false, features: ["Top 100 colleges", "Four tiers (Ivy, Target, Backup, Safe)", "Expert-curated list"] },
    ],
  },
];

const coupons = [
  { _type: "coupon", _id: "coupon-welcome10", code: "WELCOME10", discountType: "percentage", value: 10, isActive: true },
  { _type: "coupon", _id: "coupon-flat500", code: "FLAT500", discountType: "flat", value: 500, isActive: true },
];

const testimonials = [
  { _type: "testimonial", name: "Priya Sharma", role: "Engineering Student", rating: 5, text: "Dr. Upadhyay's guidance was transformative. I was confused between multiple career paths, but his structured approach helped me discover my true passion in biotechnology." },
  { _type: "testimonial", name: "Rajesh Kumar", role: "Corporate Professional", rating: 5, text: "After 10 years in IT, I felt stuck. The counselling sessions helped me identify transferable skills and transition into product management." },
];

const services = [
  { _type: "service", title: "Career Guidance", price: "Starting from ₹2,500", description: "Comprehensive career assessment and personalized guidance to discover your ideal career path.", features: ["Psychometric Assessment", "Interest & Aptitude Analysis", "Career Path Mapping", "Industry Insights", "Action Plan Development"] },
  { _type: "service", title: "Psychometric Testing", price: "Starting from ₹1,500", description: "Scientific analysis of your interests, aptitude, and personality for informed decision making.", features: ["Standardized Tests", "Detailed Interest Report", "Aptitude Mapping", "Personality Profiling", "Expert Interpretation"] },
  { _type: "service", title: "Study Abroad", price: "Consultation based", description: "Expert guidance on international education opportunities, applications, and visa processes.", features: ["University Shortlisting", "Application Support", "Scholarship Guidance", "Visa Assistance", "Pre-departure Briefing"] },
  { _type: "service", title: "College Admissions", price: "Starting from ₹3,000", description: "Navigate the complex college admission process in India with unbiased expert recommendations.", features: ["Course Alignment", "Admission Planning", "Resourceful Planner", "Verified Cut-off Insights", "Selection Strategy"] },
  { _type: "service", title: "Exam Stress Management", price: "₹1,000", description: "Specialized coaching to manage stress and anxiety during competitive examinations.", features: ["Mindfulness Techniques", "Study Schedule Planning", "Revision Strategies", "Performance Optimization", "Expert Mentorship"] },
];

const blogPosts = [
  { _type: "blogPost", _id: "blog-1", title: "10 Tips for Choosing the Right Career Path", excerpt: "Discover practical strategies to identify your ideal career based on your strengths, interests, and market opportunities.", category: "Career Tips", date: "2024-12-10", readTime: "5 min read" },
  { _type: "blogPost", _id: "blog-2", title: "The Future of AI in Career Counselling", excerpt: "How artificial intelligence is personalizing career paths and providing data-driven insights for students and professionals.", category: "Technology", date: "2024-12-15", readTime: "7 min read" },
  { _type: "blogPost", _id: "blog-3", title: "Overcoming Exam Stress: A Guide for Students", excerpt: "Practical mindfulness and planning techniques to stay calm and perform your best during competitive exams.", category: "Student Life", date: "2024-12-20", readTime: "6 min read" },
];

const faqData = [
  { _type: "faq", question: "Who can benefit from career counselling?", answer: "Students, parents, and working professionals can all benefit from career counselling. Whether you're choosing a stream in school, looking for the right college, or considering a career change as a professional, our expert guidance helps you make informed decisions." },
  { _type: "faq", question: "How long is a typical session?", answer: "A typical career counselling session lasts between 45 to 60 minutes. This allows enough time for deep discussion, analysis of assessment reports, and answering all your queries." },
  { _type: "faq", question: "Are the psychometric tests scientific?", answer: "Yes, we use standardized Mentoria assessments that are scientifically validated and reliable. They provide deep insights into your interests, aptitude, and personality." },
  { _type: "faq", question: "Do you provide help with college admissions?", answer: "Absolutely. We provide unbiased recommendations for colleges in India and abroad, help with course alignment, and provide verified cut-off data to plan your applications effectively." },
];

const processStepData = [
  { order: 1, title: "Initial Consultation", description: "Understand your background, goals, and challenges" },
  { order: 2, title: "Assessment", description: "Comprehensive evaluation of interests, aptitudes, and personality" },
  { order: 3, title: "Analysis", description: "Deep dive into career options aligned with your profile" },
  { order: 4, title: "Action Plan", description: "Create a detailed roadmap for your career journey" },
  { order: 5, title: "Follow-up", description: "Ongoing support to ensure successful implementation" },
];

async function migrate() {
  console.log("Starting migration...");
  
  await client.createOrReplace(heroData);
  await client.createOrReplace(aboutData);
  await client.createOrReplace(statsData);
  await client.createOrReplace(mentoriaData);
  await client.createOrReplace(ctaData);
  console.log("Sections migrated!");

  for (const item of faqData) {
    await client.createOrReplace({ ...item, _id: `faq-${item.question.slice(0, 20).replace(/\s+/g, '-').toLowerCase()}` });
    console.log(`Migrated FAQ: ${item.question}`);
  }

  for (const item of processStepData) {
    await client.createOrReplace({ ...item, _type: "processStep", _id: `process-step-${item.order}` });
    console.log(`Migrated Process Step: ${item.title}`);
  }

  for (const item of pricingData) {
    await client.createOrReplace({ ...item, _id: `pricing-${item.id}` });
    console.log(`Migrated pricing: ${item.label}`);
  }

  for (const item of coupons) {
    await client.createOrReplace(item);
    console.log(`Migrated coupon: ${item.code}`);
  }
  
  for (const [index, item] of testimonials.entries()) {
    await client.createOrReplace({ ...item, _id: `testimonial-${index}` });
    console.log(`Migrated testimonial: ${item.name}`);
  }
  
  for (const [index, item] of services.entries()) {
    await client.createOrReplace({ ...item, _id: `service-${index}` });
    console.log(`Migrated service: ${item.title}`);
  }
  
  for (const item of blogPosts) {
    await client.createOrReplace(item);
    console.log(`Migrated blog post: ${item.title}`);
  }
  
  console.log("Migration complete!");
}

migrate().catch(console.error);
