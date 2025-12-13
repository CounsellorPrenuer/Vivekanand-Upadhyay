import { Compass, Users, UserCheck, GraduationCap, Building2, Briefcase, Heart } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    icon: Compass,
    title: "Career Guidance",
    description: "Comprehensive career assessment and personalized guidance to help you discover your ideal career path based on your strengths, interests, and market opportunities.",
    audiences: ["Students", "Parents"],
  },
  {
    icon: Users,
    title: "Workshops & Seminars",
    description: "Interactive sessions for schools, colleges, and organizations covering career planning, skill development, and industry insights.",
    audiences: ["Schools", "Colleges", "Corporates"],
  },
  {
    icon: UserCheck,
    title: "One-on-One Counselling",
    description: "Personalized counselling sessions tailored to your specific career challenges, transitions, and goals with actionable strategies.",
    audiences: ["Professionals", "NGOs"],
  },
];

const allAudiences = [
  { icon: GraduationCap, label: "Students" },
  { icon: Users, label: "Parents" },
  { icon: Building2, label: "Schools" },
  { icon: Building2, label: "Colleges" },
  { icon: Briefcase, label: "Corporates" },
  { icon: UserCheck, label: "Working Professionals" },
  { icon: Heart, label: "NGOs" },
];

export default function ServicesSection() {
  return (
    <section className="py-20" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Our <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive career counselling services designed to guide you at every stage of your professional journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="group relative overflow-visible bg-gradient-to-br from-card to-card/50 border-border/50 hover-elevate"
              data-testid={`card-service-${index}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
              <CardHeader className="pb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-teal-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.audiences.map((audience) => (
                    <Badge key={audience} variant="secondary" className="text-xs">
                      {audience}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-teal-500/10 rounded-2xl p-8 border border-border/50">
          <h3 className="text-xl font-semibold text-center mb-6">Who I Work With</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {allAudiences.map((audience) => (
              <div
                key={audience.label}
                className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full hover-elevate"
              >
                <audience.icon className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">{audience.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
