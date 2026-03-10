import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { client, urlFor } from "@/lib/sanity";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  image?: any;
  rating: number;
  text: string;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await client.fetch(`*[_type == "testimonial"]`);
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const next = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            What People <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 bg-clip-text text-transparent">Say</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from individuals whose lives have been transformed through career guidance
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Card className="overflow-visible bg-gradient-to-br from-card to-card/50 border-border/50 backdrop-blur">
            <CardContent className="p-8 sm:p-12">
              <Quote className="w-12 h-12 text-blue-500/30 mb-6" />
              
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-teal-500 rounded-full blur-lg opacity-50" />
                    {testimonials[currentIndex].image ? (
                      <img
                        src={urlFor(testimonials[currentIndex].image).width(200).height(200).url()}
                        alt={testimonials[currentIndex].name}
                        className="relative w-24 h-24 rounded-full object-cover border-4 border-white/20"
                      />
                    ) : (
                      <div className="relative w-24 h-24 rounded-full bg-muted flex items-center justify-center border-4 border-white/20 text-2xl font-bold">
                        {testimonials[currentIndex].name[0]}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start gap-1 mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <p className="text-lg text-foreground mb-6 italic leading-relaxed">
                    "{testimonials[currentIndex].text}"
                  </p>
                  
                  <div>
                    <p className="font-semibold text-foreground">{testimonials[currentIndex].name}</p>
                    <p className="text-sm text-muted-foreground">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              size="icon"
              variant="outline"
              onClick={prev}
              data-testid="button-testimonial-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-6 bg-gradient-to-r from-blue-500 to-purple-500"
                      : "bg-muted-foreground/30"
                  }`}
                  data-testid={`button-testimonial-dot-${index}`}
                />
              ))}
            </div>
            
            <Button
              size="icon"
              variant="outline"
              onClick={next}
              data-testid="button-testimonial-next"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
