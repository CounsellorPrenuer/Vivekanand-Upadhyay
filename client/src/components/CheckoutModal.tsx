import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Ticket, CheckCircle, AlertCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const checkoutSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
});

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: {
    name: string;
    price: number;
    planId: string;
  };
}

export default function CheckoutModal({ isOpen, onClose, plan }: CheckoutModalProps) {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountedAmount: number;
    discountApplied: number;
  } | null>(null);

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setIsValidatingCoupon(true);
    try {
      const res = await apiRequest("POST", "/api/validate-coupon", {
        code: couponCode,
        amount: plan.price,
      });
      const data = await res.json();
      setAppliedCoupon({
        code: couponCode,
        discountedAmount: data.discountedAmount,
        discountApplied: data.discountApplied,
      });
      toast({
        title: "Coupon Applied!",
        description: `₹${data.discountApplied} off your purchase.`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Coupon Error",
        description: error.message || "Invalid or inactive coupon",
      });
      setAppliedCoupon(null);
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof checkoutSchema>) => {
    setIsProcessing(true);
    try {
      const amountToPay = appliedCoupon ? appliedCoupon.discountedAmount : plan.price;
      
      const res = await apiRequest("POST", "/api/create-order", {
        planName: plan.name,
        amount: amountToPay,
        userName: values.name,
        userEmail: values.email,
        userPhone: values.phone,
      });
      
      const orderData = await res.json();
      
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Mentoria Career Counselling",
        description: `Purchase for ${plan.name}`,
        order_id: orderData.orderId,
        prefill: {
          name: values.name,
          email: values.email,
          contact: values.phone,
        },
        theme: {
          color: "#7c3aed",
        },
        handler: function (response: any) {
          toast({
            title: "Payment Successful",
            description: `Payment ID: ${response.razorpay_payment_id}. We will contact you soon!`,
          });
          onClose();
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error: any) {
      console.error("Checkout detail error:", error);
      toast({
        variant: "destructive",
        title: "Checkout Error",
        description: error.message || "Failed to initiate payment. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] glass border-white/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Checkout</DialogTitle>
          <DialogDescription>
            You are purchasing: <span className="font-semibold text-primary">{plan.name}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} className="glass" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} className="glass" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 XXXXX XXXXX" {...field} className="glass" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10">
                <FormLabel>Coupon Code</FormLabel>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      placeholder="Enter code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="glass pr-10"
                    />
                    <Ticket className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleApplyCoupon}
                    disabled={isValidatingCoupon || !couponCode}
                    className="glass"
                  >
                    {isValidatingCoupon ? <Loader2 className="w-4 h-4 animate-spin" /> : "Apply"}
                  </Button>
                </div>
                {appliedCoupon && (
                  <div className="flex items-center gap-2 text-sm text-green-500 font-medium animate-in fade-in slide-in-from-top-1">
                    <CheckCircle className="w-3 h-3" />
                    Coupon '{appliedCoupon.code}' applied! Savings: ₹{appliedCoupon.discountApplied}
                  </div>
                )}
              </div>

              <div className="bg-white/5 p-4 rounded-lg space-y-2 mt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Original Price:</span>
                  <span>₹{plan.price}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-sm text-green-500">
                    <span>Discount:</span>
                    <span>-₹{appliedCoupon.discountApplied}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-white/10">
                  <span>Total To Pay:</span>
                  <span className="text-primary">
                    ₹{appliedCoupon ? appliedCoupon.discountedAmount : plan.price}
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold py-6 text-lg"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...</>
                ) : (
                  "Pay with Razorpay"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
