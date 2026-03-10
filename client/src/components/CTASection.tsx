import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Calendar, Phone, Mail, MessageCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { client } from "@/lib/sanity";

export default function CTASection() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.fetch(`*[_type == "ctaSection"][0]`);
        setData(result);
      } catch (error) {
        console.error("Error fetching CTA data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center bg-blue-600">
        <Loader2 className="w-10 h-10 animate-spin text-white" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-teal-500" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          {data.title}
        </h2>
        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
          {data.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-white/90 gap-2 animate-pulse-glow"
            >
              <Calendar className="w-5 h-5" />
              Book Free Consultation
            </Button>
          </Link>
          <a href={`https://wa.me/${data.whatsapp}`} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </Button>
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-white/80">
          <a
            href={`mailto:${data.email}`}
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Mail className="w-5 h-5" />
            {data.email}
          </a>
          <a
            href={`tel:${data.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Phone className="w-5 h-5" />
            {data.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
