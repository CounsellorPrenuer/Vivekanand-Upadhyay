import { useEffect } from "react";
import { useLocation } from "wouter";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import StatsSection from "@/components/StatsSection";
import BlogSection from "@/components/BlogSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import MentoriaSection from "@/components/MentoriaSection";

export default function Home() {
  const [location] = useLocation();

  useEffect(() => {
    if (location === "/pricing") {
      const element = document.getElementById("pricing");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PricingSection />
      <StatsSection />
      <BlogSection />
      <TestimonialsSection />
      <CTASection />
      <MentoriaSection />
    </main>
  );
}
