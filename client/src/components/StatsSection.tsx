import { useState, useEffect, useRef } from "react";
import { TrendingUp, Users, Award, Clock, Loader2 } from "lucide-react";
import { client } from "@/lib/sanity";

const iconMap: { [key: string]: any } = {
  TrendingUp,
  Users,
  Award,
  Clock,
};

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
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.fetch(`*[_type == "statsSection"][0]`);
        setData(result);
      } catch (error) {
        console.error("Error fetching stats data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <section className="py-20 bg-muted/30" id="stats">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {data.title?.split(" ")[0]} <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 bg-clip-text text-transparent">{data.title?.split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {data.stats?.map((stat: any, index: number) => {
            const Icon = iconMap[stat.icon] || Clock;
            return (
              <div
                key={index}
                className="text-center p-6 bg-card border border-border rounded-xl hover-elevate"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-blue-500" />
                </div>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-muted-foreground mt-2">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="relative bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-teal-500/10 rounded-2xl p-8 sm:p-12 border border-border/50 text-center">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl text-blue-500/20">"</div>
          <blockquote className="text-xl sm:text-2xl font-medium text-foreground italic max-w-3xl mx-auto mb-6">
            {data.philosophy}
          </blockquote>
          <cite className="text-muted-foreground">— {data.philosophyAuthor}</cite>
        </div>
      </div>
    </section>
  );
}
