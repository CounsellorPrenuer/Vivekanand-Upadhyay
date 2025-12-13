import { Link } from "wouter";
import { Compass, Users, UserCheck, Check, ArrowRight } from "lucide-react";
import PricingSection from "@/components/PricingSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const services = [
  {
    icon: Compass,
    title: "Career Guidance",
    price: "Starting from ₹2,500",
    description: "Comprehensive career assessment and personalized guidance to discover your ideal career path.",
    features: [
      "Psychometric Assessment",
      "Interest & Aptitude Analysis",
      "Career Path Mapping",
      "Industry Insights",
      "Action Plan Development",
    ],
  },
  {
    icon: Users,
    title: "Workshops & Seminars",
    price: "Custom Pricing",
    description: "Interactive sessions for schools, colleges, and organizations on career planning.",
    features: [
      "Customized Content",
      "Interactive Sessions",
      "Group Activities",
      "Q&A Sessions",
      "Resource Materials",
    ],
  },
  {
    icon: UserCheck,
    title: "One-on-One Counselling",
    price: "₹3,500 per session",
    description: "Personalized counselling sessions tailored to your specific career challenges.",
    features: [
      "60-minute Sessions",
      "Personalized Attention",
      "Follow-up Support",
      "Career Resources",
      "Email Support",
    ],
  },
];

const faqs = [
  {
    question: "How long is a typical counselling session?",
    answer: "A typical one-on-one counselling session lasts 60 minutes. For comprehensive career assessments, we may schedule multiple sessions over a period of time to ensure thorough analysis and guidance.",
  },
  {
    question: "Do you offer online consultations?",
    answer: "Yes, I offer both online and in-person consultations. Online sessions are conducted via video call and are just as effective as in-person meetings. This allows me to help clients from anywhere in India.",
  },
  {
    question: "What age groups do you work with?",
    answer: "I work with individuals of all ages - from school students (Class 8 onwards) to working professionals considering career transitions. Each session is tailored to the specific needs and life stage of the client.",
  },
  {
    question: "How do I book a consultation?",
    answer: "You can book a consultation by filling out the contact form on this website, calling directly at +91 7030502200, or messaging on WhatsApp. I'll respond within 24 hours to schedule your session.",
  },
  {
    question: "What if I'm not satisfied with the session?",
    answer: "Client satisfaction is my priority. If you're not satisfied with the session, we can discuss your concerns and arrange a follow-up session at no additional cost. Your career success is my commitment.",
  },
];

const processSteps = [
  { step: 1, title: "Initial Consultation", description: "Understand your background, goals, and challenges" },
  { step: 2, title: "Assessment", description: "Comprehensive evaluation of interests, aptitudes, and personality" },
  { step: 3, title: "Analysis", description: "Deep dive into career options aligned with your profile" },
  { step: 4, title: "Action Plan", description: "Create a detailed roadmap for your career journey" },
  { step: 5, title: "Follow-up", description: "Ongoing support to ensure successful implementation" },
];

export default function Services() {
  return (
    <main className="pt-20">
      <section className="py-16 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-teal-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Our <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 bg-clip-text text-transparent">Services</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive career counselling services designed to guide you at every stage of your professional journey
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={service.title}
                className="relative overflow-visible bg-gradient-to-br from-card to-card/50 border-border/50 hover-elevate"
                data-testid={`card-service-detail-${index}`}
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-teal-500 flex items-center justify-center mb-4 shadow-lg">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <p className="text-lg font-semibold text-blue-500">{service.price}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm text-center mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact">
                    <Button className="w-full mt-6 gap-2" data-testid={`button-service-book-${index}`}>
                      Book Now <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <PricingSection />

      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Our <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 bg-clip-text text-transparent">Process</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A structured approach to help you achieve your career goals
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 -translate-y-1/2" />
            <div className="grid md:grid-cols-5 gap-6">
              {processSteps.map((step, index) => (
                <div
                  key={step.step}
                  className="relative bg-card border border-border rounded-xl p-6 text-center hover-elevate"
                  data-testid={`step-${index}`}
                >
                  <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-teal-500 flex items-center justify-center text-white font-bold">
                    {step.step}
                  </div>
                  <h4 className="font-semibold mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 bg-clip-text text-transparent">Questions</span>
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6"
                data-testid={`faq-${index}`}
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-teal-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Take the first step towards your dream career today
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-white/90"
              data-testid="button-services-cta"
            >
              Book Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
