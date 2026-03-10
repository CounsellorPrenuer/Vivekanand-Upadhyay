import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Compass, Users, UserCheck, Check, ArrowRight, Loader2 } from "lucide-react";
import PricingSection from "@/components/PricingSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { client } from "@/lib/sanity";

const iconMap: Record<string, any> = {
  Compass,
  Users,
  UserCheck,
};

export default function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [processSteps, setProcessSteps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, faqsData, processData] = await Promise.all([
          client.fetch(`*[_type == "service"] | order(_createdAt asc)`),
          client.fetch(`*[_type == "faq"]`),
          client.fetch(`*[_type == "processStep"] | order(order asc)`),
        ]);
        setServices(servicesData);
        setFaqs(faqsData);
        setProcessSteps(processData);
      } catch (error) {
        console.error("Error fetching services/faqs/process:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

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
            {services.map((service, index) => {
              const Icon = [Compass, Users, UserCheck][index % 3];
              return (
                <Card
                  key={service._id}
                  className="relative overflow-visible bg-gradient-to-br from-card to-card/50 border-border/50 hover-elevate"
                >
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-teal-500 flex items-center justify-center mb-4 shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <p className="text-lg font-semibold text-blue-500">{service.price}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm text-center mb-6">{service.description}</p>
                    <ul className="space-y-3">
                      {service.features?.map((feature: string) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact">
                      <Button className="w-full mt-6 gap-2">
                        Book Now <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
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
                  key={step._id}
                  className="relative bg-card border border-border rounded-xl p-6 text-center hover-elevate"
                >
                  <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-teal-500 flex items-center justify-center text-white font-bold">
                    {step.order}
                  </div>
                  <h4 className="font-semibold mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {faqs.length > 0 && (
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
                  key={faq._id}
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-lg px-6"
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
      )}

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
            >
              Book Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
