import { useEffect, useRef, useState } from "react";
import { Check, X, Sparkles, Crown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { client } from "@/lib/sanity";

interface PricingPlan {
  name: string;
  price: number;
  description: string;
  isPremium: boolean;
  features: string[];
  paymentButtonId?: string;
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
}

function RazorpayButton({ buttonId }: { buttonId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous script if any
    containerRef.current.innerHTML = "";

    const form = document.createElement("form");
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.setAttribute("data-payment_button_id", buttonId);
    script.async = true;
    form.appendChild(script);
    containerRef.current.appendChild(form);
  }, [buttonId]);

  return <div ref={containerRef} className="w-full flex justify-center" />;
}

function PricingCard({ plan, categoryId }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card
        className={`relative overflow-visible h-full ${
          plan.isPremium
            ? "border-2 border-purple-500/50 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-teal-500/10"
            : "border-border/50"
        }`}
        data-testid={`card-pricing-${categoryId}-${plan.isPremium ? "premium" : "standard"}`}
      >
        {plan.isPremium && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 gap-1">
              <Crown className="w-3 h-3" /> Most Popular
            </Badge>
          </div>
        )}
        <CardHeader className="text-center pb-4 pt-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            {plan.isPremium ? (
              <Sparkles className="w-5 h-5 text-purple-500" />
            ) : null}
            <CardTitle className="text-xl">{plan.name}</CardTitle>
          </div>
          <div className="mt-4">
            <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 bg-clip-text text-transparent">
              ₹{plan.price.toLocaleString("en-IN")}
            </span>
            <span className="text-muted-foreground ml-1">/package</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
        </CardHeader>
        <CardContent className="pb-6">
          <ul className="space-y-3 mb-6">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-foreground">
                  {typeof feature === 'string' ? feature : (feature as any).text}
                </span>
              </li>
            ))}
          </ul>
          {plan.paymentButtonId ? (
            <RazorpayButton buttonId={plan.paymentButtonId} />
          ) : (
            <Button
              className={`w-full gap-2 ${
                plan.isPremium
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  : ""
              }`}
              variant={plan.isPremium ? "default" : "outline"}
              onClick={() => alert("Please contact us at +91 7030502200 to book this session.")}
              data-testid={`button-buy-${categoryId}-${plan.isPremium ? "premium" : "standard"}`}
            >
              Contact Us
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState("");
  const [pricingData, setPricingData] = useState<PricingCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const data = await client.fetch(`*[_type == "pricingCategory"] | order(id asc)`);
        setPricingData(data);
        if (data.length > 0) {
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

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <section className="py-16 bg-muted/30" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-2">Standard Mentoria Packages</h3>
            <p className="text-muted-foreground text-sm">Select a package based on your educational or professional stage</p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 h-auto p-2">
                {pricingData.filter(c => c.section !== 'custom').map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="px-4 py-2 text-sm"
                    data-testid={`tab-pricing-${category.id}`}
                  >
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <AnimatePresence mode="wait">
              {pricingData.map((category) => (
                category.id === activeTab && category.section !== 'custom' && (
                  <TabsContent key={category.id} value={category.id} className="mt-0" forceMount>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                      {category.plans.map((plan) => (
                        <PricingCard
                          key={plan.name}
                          plan={plan}
                          categoryId={category.id}
                        />
                      ))}
                    </div>
                  </TabsContent>
                )
              ))}
            </AnimatePresence>
          </Tabs>
        </div>

        {/* Custom Mentorship Plans Section */}
        <div className="mt-20 pt-16 border-t border-border/50">
          <div className="text-center mb-12">
            <motion.h3
              className="text-2xl sm:text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Want To Customise Your Mentorship Plan?
            </motion.h3>
            <motion.p
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              If you want to subscribe to specific services from Mentoria that resolve your career challenges, you can choose one or more of the following:
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pricingData.find(c => c.section === 'custom')?.plans.map((plan) => (
              <PricingCard
                key={plan.name}
                plan={plan}
                categoryId="custom"
              />
            ))}
          </div>
        </div>

        <motion.p
          className="text-center text-sm text-muted-foreground mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          All prices are inclusive of GST. Secure payment powered by Razorpay.
        </motion.p>
      </div>
    </section>
  );
}
