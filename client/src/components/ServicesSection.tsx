import { useState, useEffect } from "react";
import { Compass, Users, UserCheck, GraduationCap, Building2, Briefcase, Heart, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { client } from "@/lib/sanity";

const iconMap: { [key: string]: any } = {
  Compass,
  Users,
  UserCheck,
  GraduationCap,
  Building2,
  Briefcase,
  Heart,
};

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
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const result = await client.fetch(`*[_type == "service"] | order(_createdAt asc)`);
        setServices(result);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

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
          {services.slice(0, 3).map((service, index) => {
            const Icon = [Compass, Users, UserCheck][index % 3];
            return (
              <Card
                key={service._id}
                className="group relative overflow-visible bg-gradient-to-br from-card to-card/50 border-border/50 hover-elevate"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-teal-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{service.price}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{service.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features?.slice(0, 3).map((feature: string) => (
                      <Badge key={feature} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <Link href="/services">
                    <Button variant="ghost" className="gap-1 p-0 h-auto">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
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
