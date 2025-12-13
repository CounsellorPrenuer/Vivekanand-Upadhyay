import { Heart, Brain, Target, Award, Users, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const traits = [
  {
    icon: Heart,
    title: "Empathy",
    description: "Understanding your unique journey and challenges with compassion",
  },
  {
    icon: Brain,
    title: "Deep Understanding",
    description: "Comprehensive insight into career dynamics and opportunities",
  },
  {
    icon: Target,
    title: "Career Expertise",
    description: "Proven strategies for career success and fulfillment",
  },
];

const timeline = [
  { year: "2005", title: "Army Medical Corps", description: "Began service as Army Physician" },
  { year: "2012", title: "Career Counselling", description: "Started counselling army families" },
  { year: "2018", title: "Private Practice", description: "Expanded to schools and colleges" },
  { year: "2024", title: "Nationwide Impact", description: "Helping thousands find their path" },
];

export default function AboutSection() {
  return (
    <section className="py-20 bg-muted/30" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            About <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ex Army Physician with extensive experience working with school-going children and professionals facing career changes
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              As an Ex Army Physician, I bring a unique perspective to career counselling. 
              My years of service taught me discipline, empathy, and the importance of 
              making decisions that align with one's true calling.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Having worked extensively with school-going children, young adults, and 
              professionals seeking career transitions, I understand the nuances of career 
              development at every stage of life.
            </p>
            <div className="flex flex-wrap gap-3">
              {[Award, Users, BookOpen].map((Icon, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg"
                >
                  <Icon className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium">
                    {index === 0 && "Army Background"}
                    {index === 1 && "10,000+ Helped"}
                    {index === 2 && "Expert Guidance"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-teal-500" />
            <div className="space-y-6 ml-8">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className="relative pl-8 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 -translate-x-[1.5rem]" />
                  <span className="text-sm font-semibold text-blue-500">{item.year}</span>
                  <h4 className="font-semibold text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {traits.map((trait, index) => (
            <Card
              key={trait.title}
              className="group relative overflow-visible bg-card/50 backdrop-blur border-border/50 hover-elevate"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <trait.icon className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{trait.title}</h3>
                <p className="text-muted-foreground text-sm">{trait.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
