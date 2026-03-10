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
        planId: "pkg-1",
        name: "Discover",
        price: 5500,
        description: "Standard career discovery program for young students",
        isPremium: false,
        features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Live webinar invites"],
      },
      {
        planId: "pkg-2",
        name: "Discover Plus+",
        price: 15000,
        description: "Comprehensive career discovery with premium support",
        isPremium: true,
        features: ["Psychometric assessments", "8 career counselling sessions (1/year)", "Custom reports & study abroad guidance", "CV building"],
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
        planId: "pkg-3",
        name: "Achieve Online",
        price: 5999,
        description: "Standard program for senior secondary students",
        isPremium: false,
        features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"],
      },
      {
        planId: "pkg-4",
        name: "Achieve Plus+",
        price: 10599,
        description: "Premium guidance for career-focused students",
        isPremium: true,
        features: ["Psychometric assessment", "4 career counselling sessions", "Custom reports & study abroad guidance", "CV reviews"],
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
        planId: "pkg-5",
        name: "Ascend Online",
        price: 6499,
        description: "Career launch program for recent graduates",
        isPremium: false,
        features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"],
      },
      {
        planId: "pkg-6",
        name: "Ascend Plus+",
        price: 10599,
        description: "Complete career placement guidance",
        isPremium: true,
        features: ["Psychometric assessment", "3 career counselling sessions", "Certificate/online course info", "CV reviews for jobs"],
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
        planId: "mp-3",
        name: "Ascend Online",
        price: 6499,
        description: "Career growth program for professionals",
        isPremium: false,
        features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"],
      },
      {
        planId: "mp-2",
        name: "Ascend Plus+",
        price: 10599,
        description: "Leadership and career advancement guidance",
        isPremium: true,
        features: ["Psychometric assessment", "3 career counselling sessions", "Certificate/online course info", "CV reviews for jobs"],
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
        planId: "career-report",
        name: "Career Report",
        price: 1500,
        description: "Get a detailed report of your psychometric assessment for a scientific analysis of your interests.",
        isPremium: false,
        features: ["Psychometric assessment report", "Scientific interest analysis", "Future path suggestions"],
      },
      {
        planId: "career-report-counselling",
        name: "Career Report + Career Counselling",
        price: 3000,
        description: "Connect with India's top career coaches to analyse your report and shortlist top paths.",
        isPremium: true,
        features: ["Psychometric report", "1-on-1 coach session", "Shortlist top 3 paths"],
      },
      {
        planId: "knowledge-gateway",
        name: "Knowledge Gateway + Career Helpline Access",
        price: 100,
        description: "Unlock holistic information on your career path and get direct access to experts.",
        isPremium: false,
        features: ["Portal access", "Career helpline access", "Direct expert consultation"],
      },
      {
        planId: "one-to-one-session",
        name: "One-to-One Session with a Career Expert",
        price: 3500,
        description: "Resolve your career queries through a one-on-one session with an expert from your chosen field.",
        isPremium: false,
        features: ["1 session with expert", "Industry insights"],
      },
      {
        planId: "college-admission-planning",
        name: "College Admission Planning",
        price: 3000,
        description: "Get unbiased recommendations and details on your future college options in India and abroad.",
        isPremium: false,
        features: ["College list", "Course alignment", "Resourceful planner"],
      },
      {
        planId: "exam-stress-management",
        name: "Exam Stress Management",
        price: 1000,
        description: "Get expert guidance on tackling exam stress from India's top educators.",
        isPremium: false,
        features: ["Stress management tips", "Study schedule planning", "Revision tips"],
      },
      {
        planId: "cap-100",
        name: "College Admissions Planner - 100 (CAP-100)",
        price: 199,
        description: "Ranked list of the top 100 colleges in your course based on verified cut-offs.",
        isPremium: false,
        features: ["Top 100 colleges", "Four tiers (Ivy, Target, Backup, Safe)", "Expert-curated list"],
      },
    ],
  },
];

const coupons = [
  {
    _type: "coupon",
    _id: "coupon-welcome10",
    code: "WELCOME10",
    discountType: "percentage",
    value: 10,
    isActive: true,
  },
  {
    _type: "coupon",
    _id: "coupon-flat500",
    code: "FLAT500",
    discountType: "flat",
    value: 500,
    isActive: true,
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
    _id: "blog-1",
    title: "10 Tips for Choosing the Right Career Path",
    excerpt: "Discover practical strategies to identify your ideal career based on your strengths, interests, and market opportunities.",
    category: "Career Tips",
    date: "2024-12-10",
    readTime: "5 min read",
  },
  {
    _type: "blogPost",
    _id: "blog-2",
    title: "The Future of AI in Career Counselling",
    excerpt: "How artificial intelligence is personalizing career paths and providing data-driven insights for students and professionals.",
    category: "Technology",
    date: "2024-12-15",
    readTime: "7 min read",
  },
  {
    _type: "blogPost",
    _id: "blog-3",
    title: "Overcoming Exam Stress: A Guide for Students",
    excerpt: "Practical mindfulness and planning techniques to stay calm and perform your best during competitive exams.",
    category: "Student Life",
    date: "2024-12-20",
    readTime: "6 min read",
  },
];

async function migrate() {
  console.log("Starting migration...");
  
  // Migrate Pricing
  for (const item of pricingData) {
    const doc = {
      ...item,
      _id: `pricing-${item.id}`,
    };
    await client.createOrReplace(doc);
    console.log(`Created/Updated pricing category: ${item.label}`);
  }

  // Migrate Coupons
  for (const item of coupons) {
    await client.createOrReplace(item);
    console.log(`Created/Updated coupon: ${item.code}`);
  }
  
  // Migrate Otros (using createOrReplace with generated IDs or stable ones)
  for (const [index, item] of testimonials.entries()) {
    await client.createOrReplace({ ...item, _id: `testimonial-${index}` });
    console.log(`Created testimonial: ${item.name}`);
  }
  
  for (const [index, item] of services.entries()) {
    await client.createOrReplace({ ...item, _id: `service-${index}` });
    console.log(`Created service: ${item.title}`);
  }
  
  for (const item of blogPosts) {
    await client.createOrReplace(item);
    console.log(`Created blog post: ${item.title}`);
  }
  
  console.log("Migration complete!");
}

migrate().catch(console.error);
