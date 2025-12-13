import { useState } from "react";
import { Check, X, Sparkles, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PricingPlan {
  name: string;
  price: number;
  description: string;
  isPremium: boolean;
  features: { text: string; included: boolean }[];
}

interface PricingCategory {
  id: string;
  label: string;
  plans: PricingPlan[];
}

const pricingData: PricingCategory[] = [
  {
    id: "8-9",
    label: "8-9 Students",
    plans: [
      {
        name: "Discover",
        price: 5500,
        description: "Standard career discovery program for young students",
        isPremium: false,
        features: [
          { text: "Career Interest Assessment", included: true },
          { text: "Aptitude Testing", included: true },
          { text: "Basic Career Report", included: true },
          { text: "1 Counselling Session (30 min)", included: true },
          { text: "Email Support", included: true },
          { text: "Detailed Personality Analysis", included: false },
          { text: "Stream Selection Guidance", included: false },
          { text: "Parent Consultation", included: false },
          { text: "Follow-up Sessions", included: false },
          { text: "Career Roadmap Document", included: false },
        ],
      },
      {
        name: "Discover Plus+",
        price: 15000,
        description: "Comprehensive career discovery with premium support",
        isPremium: true,
        features: [
          { text: "Career Interest Assessment", included: true },
          { text: "Aptitude Testing", included: true },
          { text: "Detailed Career Report", included: true },
          { text: "3 Counselling Sessions (60 min each)", included: true },
          { text: "Priority Email & Call Support", included: true },
          { text: "Detailed Personality Analysis", included: true },
          { text: "Stream Selection Guidance", included: true },
          { text: "Parent Consultation Session", included: true },
          { text: "3 Follow-up Sessions", included: true },
          { text: "Personalized Career Roadmap", included: true },
        ],
      },
    ],
  },
  {
    id: "10-12",
    label: "10-12 Students",
    plans: [
      {
        name: "Achieve Online",
        price: 5999,
        description: "Standard program for senior secondary students",
        isPremium: false,
        features: [
          { text: "Psychometric Assessment", included: true },
          { text: "Stream/Subject Selection", included: true },
          { text: "Basic Career Report", included: true },
          { text: "1 Counselling Session (45 min)", included: true },
          { text: "Email Support", included: true },
          { text: "Entrance Exam Guidance", included: false },
          { text: "College Selection Support", included: false },
          { text: "Parent Consultation", included: false },
          { text: "Follow-up Sessions", included: false },
          { text: "Application Strategy", included: false },
        ],
      },
      {
        name: "Achieve Plus+",
        price: 10599,
        description: "Premium guidance for career-focused students",
        isPremium: true,
        features: [
          { text: "Psychometric Assessment", included: true },
          { text: "Stream/Subject Selection", included: true },
          { text: "Comprehensive Career Report", included: true },
          { text: "3 Counselling Sessions (60 min each)", included: true },
          { text: "Priority Support (Call & Email)", included: true },
          { text: "Entrance Exam Guidance", included: true },
          { text: "Top College Selection Support", included: true },
          { text: "Parent Consultation Session", included: true },
          { text: "6 Follow-up Sessions", included: true },
          { text: "Application Strategy Document", included: true },
        ],
      },
    ],
  },
  {
    id: "college",
    label: "College Graduates",
    plans: [
      {
        name: "Ascend Online",
        price: 6499,
        description: "Career guidance for fresh graduates",
        isPremium: false,
        features: [
          { text: "Skill Assessment", included: true },
          { text: "Industry Analysis", included: true },
          { text: "Basic Career Report", included: true },
          { text: "1 Counselling Session (45 min)", included: true },
          { text: "Email Support", included: true },
          { text: "Resume Review", included: false },
          { text: "Interview Preparation", included: false },
          { text: "Job Search Strategy", included: false },
          { text: "LinkedIn Optimization", included: false },
          { text: "Mock Interviews", included: false },
        ],
      },
      {
        name: "Ascend Plus+",
        price: 10599,
        description: "Complete career launch package for graduates",
        isPremium: true,
        features: [
          { text: "Comprehensive Skill Assessment", included: true },
          { text: "Industry & Market Analysis", included: true },
          { text: "Detailed Career Report", included: true },
          { text: "4 Counselling Sessions (60 min each)", included: true },
          { text: "Priority Support (Call & Email)", included: true },
          { text: "Professional Resume Creation", included: true },
          { text: "Interview Preparation (3 sessions)", included: true },
          { text: "Complete Job Search Strategy", included: true },
          { text: "LinkedIn Profile Optimization", included: true },
          { text: "2 Mock Interview Sessions", included: true },
        ],
      },
    ],
  },
  {
    id: "professionals",
    label: "Working Professionals",
    plans: [
      {
        name: "Ascend Online",
        price: 6499,
        description: "Career transition guidance for professionals",
        isPremium: false,
        features: [
          { text: "Career Assessment", included: true },
          { text: "Industry Transition Analysis", included: true },
          { text: "Basic Career Report", included: true },
          { text: "1 Counselling Session (45 min)", included: true },
          { text: "Email Support", included: true },
          { text: "Resume Revamp", included: false },
          { text: "Leadership Coaching", included: false },
          { text: "Salary Negotiation Tips", included: false },
          { text: "Network Building Strategy", included: false },
          { text: "Executive Coaching", included: false },
        ],
      },
      {
        name: "Ascend Plus+",
        price: 10599,
        description: "Premium career elevation for professionals",
        isPremium: true,
        features: [
          { text: "Comprehensive Career Assessment", included: true },
          { text: "Industry Transition Analysis", included: true },
          { text: "Detailed Career Report", included: true },
          { text: "4 Counselling Sessions (60 min each)", included: true },
          { text: "Priority Support (Call & Email)", included: true },
          { text: "Professional Resume Revamp", included: true },
          { text: "Leadership Coaching (2 sessions)", included: true },
          { text: "Salary Negotiation Guidance", included: true },
          { text: "Network Building Strategy", included: true },
          { text: "Executive Coaching Session", included: true },
        ],
      },
    ],
  },
];

interface PricingCardProps {
  plan: PricingPlan;
  categoryId: string;
  onBuyNow: (plan: PricingPlan, categoryId: string) => void;
  isProcessing: boolean;
}

function PricingCard({ plan, categoryId, onBuyNow, isProcessing }: PricingCardProps) {
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
                {feature.included ? (
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <X className="w-4 h-4 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
                )}
                <span className={feature.included ? "" : "text-muted-foreground/50"}>
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
          <Button
            className={`w-full gap-2 ${
              plan.isPremium
                ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                : ""
            }`}
            variant={plan.isPremium ? "default" : "outline"}
            onClick={() => onBuyNow(plan, categoryId)}
            disabled={isProcessing}
            data-testid={`button-buy-${categoryId}-${plan.isPremium ? "premium" : "standard"}`}
          >
            {isProcessing ? "Processing..." : "Buy Now"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState("8-9");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBuyNow = async (plan: PricingPlan, categoryId: string) => {
    setIsProcessing(true);

    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: plan.price,
          planName: plan.name,
          category: categoryId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 503) {
          alert("Online payments are temporarily unavailable. Please contact us at +91 7030502200 to book your session.");
          return;
        }
        throw new Error(errorData.error || "Failed to create order");
      }

      const order = await response.json();

      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Vivekanand Upadhyay",
        description: `${plan.name} - Career Counselling Package`,
        order_id: order.orderId,
        handler: async function (response: any) {
          const verifyResponse = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            }),
          });

          if (verifyResponse.ok) {
            alert("Payment successful! We will contact you shortly to schedule your session.");
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#7c3aed",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Unable to process payment. Please try again or contact us directly.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="py-16 bg-muted/30" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Choose Your{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 bg-clip-text text-transparent">
              Career Package
            </span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Select the perfect counselling package based on your current stage and goals
          </motion.p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 h-auto p-2">
              {pricingData.map((category) => (
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

          {pricingData.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {category.plans.map((plan) => (
                  <PricingCard
                    key={plan.name}
                    plan={plan}
                    categoryId={category.id}
                    onBuyNow={handleBuyNow}
                    isProcessing={isProcessing}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

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
