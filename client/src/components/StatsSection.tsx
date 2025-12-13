import { useState, useEffect, useRef } from "react";
import { TrendingUp, Users, Award, Clock } from "lucide-react";

const stats = [
  { icon: Clock, value: 15, suffix: "+", label: "Years Experience" },
  { icon: Users, value: 10000, suffix: "+", label: "Students Helped" },
  { icon: Award, value: 98, suffix: "%", label: "Success Rate" },
  { icon: TrendingUp, value: 500, suffix: "+", label: "Workshops Conducted" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={ref} className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 bg-clip-text text-transparent">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-20 bg-muted/30" id="stats">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 bg-clip-text text-transparent">Choose Me</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Numbers that speak for the impact and trust built over years of dedicated service
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-card border border-border rounded-xl hover-elevate"
              data-testid={`stat-${index}`}
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-blue-500" />
              </div>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="relative bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-teal-500/10 rounded-2xl p-8 sm:p-12 border border-border/50 text-center">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl text-blue-500/20">"</div>
          <blockquote className="text-xl sm:text-2xl font-medium text-foreground italic max-w-3xl mx-auto mb-6">
            Early choice of appropriate career can define one's level of success and happiness
          </blockquote>
          <cite className="text-muted-foreground">— My Guiding Philosophy</cite>
        </div>
      </div>
    </section>
  );
}
