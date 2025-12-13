import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImage from "@assets/generated_images/professional_indian_male_career_counsellor.png";

const taglines = [
  "Ex Army Physician",
  "Career Counsellor",
  "Guiding Your Journey to Fulfillment",
];

export default function HeroSection() {
  const [currentTagline, setCurrentTagline] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const text = taglines[currentTagline];
    let index = 0;

    if (isTyping) {
      const typeInterval = setInterval(() => {
        if (index <= text.length) {
          setDisplayText(text.slice(0, index));
          index++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => setIsTyping(false), 2000);
        }
      }, 50);
      return () => clearInterval(typeInterval);
    } else {
      const deleteInterval = setInterval(() => {
        if (displayText.length > 0) {
          setDisplayText((prev) => prev.slice(0, -1));
        } else {
          clearInterval(deleteInterval);
          setCurrentTagline((prev) => (prev + 1) % taglines.length);
          setIsTyping(true);
        }
      }, 30);
      return () => clearInterval(deleteInterval);
    }
  }, [currentTagline, isTyping]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-teal-500/20 dark:from-blue-900/40 dark:via-purple-900/40 dark:to-teal-900/40" />
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Available for Consultations
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 bg-clip-text text-transparent">
                Transform Your Career
              </span>
              <br />
              <span className="text-foreground">With Expert Guidance</span>
            </h1>

            <div className="h-8 mb-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <p className="text-xl text-muted-foreground">
                {displayText}
                <span className="animate-blink ml-1 text-blue-500">|</span>
              </p>
            </div>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              With years of experience as an Army Physician and career counsellor, 
              I help students, professionals, and organizations discover their true potential 
              and make informed career decisions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <Link href="/contact">
                <Button
                  size="lg"
                  data-testid="button-hero-consultation"
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 text-white animate-pulse-glow gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Book Free Consultation
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  data-testid="button-hero-services"
                  className="gap-2"
                >
                  Explore Services
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex-shrink-0 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-teal-500 rounded-full blur-2xl opacity-50 animate-pulse-glow" />
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl animate-float">
                <img
                  src={profileImage}
                  alt="Vivekanand Upadhyay - Career Counsellor"
                  className="w-full h-full object-cover"
                  data-testid="img-hero-profile"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-lg px-4 py-2 shadow-lg animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
                <p className="text-sm font-medium">15+ Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full animate-fade-in-up" />
        </div>
      </div>
    </section>
  );
}
