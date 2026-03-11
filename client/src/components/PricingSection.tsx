import { useEffect, useRef, useState } from "react";
import { Check, X, Sparkles, Crown, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { client } from "@/lib/sanity";
import CheckoutModal from "./CheckoutModal";

interface PricingPlan {
  name: string;
  price: number;
  description: string;
  isPremium: boolean;
  features: string[];
  paymentButtonId?: string;
  planId: string;
}

interface PricingCategory {
  id: string;
  label: string;
  section?: string;
  plans: PricingPlan[];
}

// pricingData will be fetched from Sanity

interface PricingCardProps {
  plan: PricingPlan;
  categoryId: string;
  onSelectPlan: (plan: PricingPlan) => void;
}

function PricingCard({ plan, categoryId, onSelectPlan }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Card
        className={`relative overflow-visible h-full flex flex-col ${
          plan.isPremium
            ? "border-2 border-purple-500/50 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-teal-500/10 shadow-lg shadow-purple-500/10"
            : "border-border/50 bg-card/50"
        }`}
      >
        {plan.isPremium && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 gap-1 px-3">
              <Crown className="w-3 h-3" /> Most Popular
            </Badge>
          </div>
        )}
        <CardHeader className="text-center pb-4 pt-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            {plan.isPremium && <Sparkles className="w-5 h-5 text-purple-500" />}
            <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
          </div>
          <div className="mt-4">
            <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 bg-clip-text text-transparent">
              ₹{plan.price.toLocaleString("en-IN")}
            </span>
            <span className="text-muted-foreground text-sm ml-1">/package</span>
          </div>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{plan.description}</p>
        </CardHeader>
        <CardContent className="pb-6 flex-grow">
          <ul className="space-y-4 mb-8">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm">
                <Check className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                <span className="text-foreground leading-snug">
                  {typeof feature === 'string' ? feature : (feature as any).text}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="pt-0">
          <Button
            className="w-full py-6 text-lg font-bold transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg"
            variant="default"
            onClick={() => onSelectPlan(plan)}
          >
            Buy Now
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState("");
  const [pricingData, setPricingData] = useState<PricingCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const data = await client.fetch(`*[_type == "pricingCategory"] | order(order asc)`);
        setPricingData(data);
        const firstStandard = data.find((c: any) => c.section === 'standard');
        if (firstStandard) {
          setActiveTab(firstStandard.id);
        } else if (data.length > 0) {
          setActiveTab(data[0].id);
        }
      } catch (error) {
        console.error("Error fetching pricing:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPricing();
  }, []);

  const standardCategories = pricingData.filter(c => c.section === 'standard');
  const customCategory = pricingData.find(c => c.section === 'custom');

  if (loading) {
    return (
      <div className="py-32 flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden" id="pricing">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -z-10 animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 px-4 py-1">Pricing Plans</Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 gradient-text-purple-pink">Invest in Your Future</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose a mentorship plan tailored to your educational or professional stage. 
            Unlock a world of opportunities today.
          </p>
        </div>

        {standardCategories.length > 0 && (
          <div className="mb-32">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-center mb-12">
                <TabsList className="bg-background/50 border border-border/50 p-1 flex-wrap justify-center h-auto">
                  {standardCategories.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="px-6 py-2"
                    >
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <AnimatePresence mode="wait">
                {standardCategories.map((category) => (
                  category.id === activeTab && (
                    <TabsContent key={category.id} value={category.id} className="mt-0 outline-none">
                      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {category.plans.map((plan) => (
                          <PricingCard
                            key={plan.planId || plan.name}
                            plan={plan}
                            categoryId={category.id}
                            onSelectPlan={setSelectedPlan}
                          />
                        ))}
                      </div>
                    </TabsContent>
                  )
                ))}
              </AnimatePresence>
            </Tabs>
          </div>
        )}

        {/* Custom Mentorship Plans Section */}
        {customCategory && (
          <div className="mt-32 pt-24 border-t border-white/10">
            <div className="text-center mb-16">
              <h3 className="text-3xl sm:text-4xl font-bold mb-6 italic gradient-text-blue-teal">
                Want To Customise Your Mentorship Plan?
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                If you want to subscribe to specific services from Mentoria that resolve your career challenges, you can choose one or more of the following:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {customCategory.plans.map((plan) => (
                <PricingCard
                  key={plan.planId || plan.name}
                  plan={plan}
                  categoryId="custom"
                  onSelectPlan={setSelectedPlan}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            All prices are inclusive of GST. Secure payment powered by <span className="font-semibold text-foreground">Razorpay</span>.
          </p>
        </div>
      </div>

      {selectedPlan && (
        <CheckoutModal
          isOpen={!!selectedPlan}
          onClose={() => setSelectedPlan(null)}
          plan={selectedPlan}
        />
      )}
    </section>
  );
}
