import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "scuuz9jw",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-03-10",
  token: "skwwTHmFilJhGvyPMZmxm8qwTiybFuEOaodJpSXMWlGIytsvWdtP47J5wQCc56ionK9M4GDDNbZacnZrb1lUrCWHFATdquSUk9LUlALx9knbkm9MCqPPO0ON7gXTyqMsg87WdnbtjgJFvI4YyDGf07EMpuZZCMk7NH8pNk27GaR9UXMLDFxH",
});

const pricingData = [
  {
    _type: "pricingCategory",
    id: "8-9",
    label: "8-9 Students",
    section: "standard",
    plans: [
      {
        name: "Discover",
        price: 5500,
        description: "Standard career discovery program for young students",
        isPremium: false,
        paymentButtonId: "pl_RwDuOx96VYrsyN",
        features: ["Career Interest Assessment", "Aptitude Testing", "Basic Career Report", "1 Counselling Session (30 min)", "Email Support"],
      },
      {
        name: "Discover Plus+",
        price: 15000,
        description: "Comprehensive career discovery with premium support",
        isPremium: true,
        paymentButtonId: "pl_RwDq8XpK76OhB3",
        features: ["Career Interest Assessment", "Aptitude Testing", "Detailed Career Report", "3 Counselling Sessions (60 min each)", "Priority Email & Call Support", "Detailed Personality Analysis", "Stream Selection Guidance", "Parent Consultation Session", "3 Follow-up Sessions", "Personalized Career Roadmap"],
      },
    ],
  },
  {
    _type: "pricingCategory",
    id: "10-12",
    label: "10-12 Students",
    section: "standard",
    plans: [
      {
        name: "Achieve Online",
        price: 5999,
        description: "Standard program for senior secondary students",
        isPremium: false,
        paymentButtonId: "pl_RwDxvLPQP7j4rG",
        features: ["Psychometric Assessment", "Stream/Subject Selection", "Basic Career Report", "1 Counselling Session (45 min)", "Email Support"],
      },
      {
        name: "Achieve Plus+",
        price: 10599,
        description: "Premium guidance for career-focused students",
        isPremium: true,
        paymentButtonId: "pl_RwDzfVkQYEdAIf",
        features: ["Psychometric Assessment", "Stream/Subject Selection", "Comprehensive Career Report", "3 Counselling Sessions (60 min each)", "Priority Support (Call & Email)", "Entrance Exam Guidance", "Top College Selection Support", "Parent Consultation Session", "6 Follow-up Sessions", "Application Strategy Document"],
      },
    ],
  },
  {
    _type: "pricingCategory",
    id: "graduates",
    label: "Graduates",
    section: "standard",
    plans: [
      {
        name: "Ascend Online",
        price: 6499,
        description: "Career launch program for recent graduates",
        isPremium: false,
        paymentButtonId: "pl_RwE1evNHrHWJDW",
        features: ["Career Path Discovery", "Resume Building", "Interview Skills", "1 Counselling Session", "Job Search Strategy"],
      },
      {
        name: "Ascend Plus+",
        price: 10599,
        description: "Complete career placement guidance",
        isPremium: true,
        paymentButtonId: "pl_RwE3WEILWB9WeJ",
        features: ["Career Path Discovery", "Premium Resume Makeover", "Mock Interviews", "3 Counselling Sessions", "Priority Support", "Networking Strategy", "Portfolio Building", "Soft Skills Training", "Industry Connect", "Placement Assistance"],
      },
    ],
  },
  {
    _type: "pricingCategory",
    id: "professionals",
    label: "Working Professionals",
    section: "standard",
    plans: [
      {
        name: "Ascend Online",
        price: 6499,
        description: "Career growth program for professionals",
        isPremium: false,
        paymentButtonId: "pl_RwE1evNHrHWJDW",
        features: ["Skill Gap Analysis", "Career Transition Support", "Mid-career Mentoring", "1 Counselling Session", "Professional Branding"],
      },
      {
        name: "Ascend Plus+",
        price: 10599,
        description: "Leadership and career advancement guidance",
        isPremium: true,
        paymentButtonId: "pl_RwE3WEILWB9WeJ",
        features: ["Leadership Coaching", "Executive Presence", "Advanced Strategy", "3 Counselling Sessions", "Priority Support", "Personal Branding", "Executive Resume", "LinkedIn Optimization", "Management Guidance", "Long-term Planning"],
      },
    ],
  },
  {
    _type: "pricingCategory",
    id: "custom",
    label: "Custom Mentorship Plans",
    section: "custom",
    plans: [
      {
        name: "Career Report",
        price: 1500,
        description: "Get a detailed report of your psychometric assessment for a scientific analysis of your interests.",
        isPremium: false,
        features: ["Psychometric assessment report", "Scientific interest analysis", "Future path suggestions"],
      },
      {
        name: "Career Report + Counselling",
        price: 3000,
        description: "Connect with India's top career coaches to analyse your report and shortlist top paths.",
        isPremium: true,
        features: ["Psychometric report", "1-on-1 coach session", "Shortlist top 3 paths"],
      },
      {
        name: "Knowledge Gateway",
        price: 100,
        description: "Unlock holistic information on your career path through our knowledge portal.",
        isPremium: false,
        features: ["Portal access", "Career helpline access"],
      },
      {
        name: "Course & College Selection",
        price: 2500,
        description: "Select the most appropriate course and college that is appropriate for your interests.",
        isPremium: false,
        features: ["College list", "Course alignment"],
      },
      {
        name: "Skill Set Development",
        price: 3000,
        description: "Identify & resolve skill gaps through a personalised skill set development program.",
        isPremium: false,
        features: ["Gap analysis", "Learning roadmap"],
      },
      {
        name: "Alumni Interaction",
        price: 500,
        description: "Connect with alumni from your dream companies and colleges.",
        isPremium: false,
        features: ["1 session with alumni", "Industry insights"],
      },
      {
        name: "Resume & Portfolio Building",
        price: 3000,
        description: "Get a professional resume and portfolio built by India's top mentors.",
        isPremium: false,
        features: ["Professional resume", "Portfolio setup"],
      },
    ],
  },
];

const testimonials = [
  {
    _type: "testimonial",
    name: "Priya Sharma",
    role: "Engineering Student",
    rating: 5,
    text: "Dr. Upadhyay's guidance was transformative. I was confused between multiple career paths, but his structured approach helped me discover my true passion in biotechnology. Now I'm pursuing my dream career!",
  },
  {
    _type: "testimonial",
    name: "Rajesh Kumar",
    role: "Corporate Professional",
    rating: 5,
    text: "After 10 years in IT, I felt stuck. The counselling sessions helped me identify transferable skills and transition into product management. Best investment in my career!",
  },
];

const services = [
  {
    _type: "service",
    title: "Career Guidance",
    price: "Starting from ₹2,500",
    description: "Comprehensive career assessment and personalized guidance to discover your ideal career path.",
    features: ["Psychometric Assessment", "Interest & Aptitude Analysis", "Career Path Mapping", "Industry Insights", "Action Plan Development"],
  },
];

const blogPosts = [
  {
    _type: "blogPost",
    title: "10 Tips for Choosing the Right Career Path",
    excerpt: "Discover practical strategies to identify your ideal career based on your strengths, interests, and market opportunities.",
    category: "Career Tips",
    date: "2024-12-10",
    readTime: "5 min read",
  },
];

async function migrate() {
  console.log("Starting migration...");
  
  for (const item of pricingData) {
    const doc = {
      ...item,
      _id: `pricing-${item.id}`,
    };
    await client.createOrReplace(doc);
    console.log(`Created/Updated pricing category: ${item.label}`);
  }
  
  for (const item of testimonials) {
    await client.create(item);
    console.log(`Created testimonial: ${item.name}`);
  }
  
  for (const item of services) {
    await client.create(item);
    console.log(`Created service: ${item.title}`);
  }
  
  for (const item of blogPosts) {
    await client.create(item);
    console.log(`Created blog post: ${item.title}`);
  }
  
  console.log("Migration complete!");
}

migrate().catch(console.error);
