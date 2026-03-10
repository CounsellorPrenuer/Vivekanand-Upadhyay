import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await apiRequest("POST", "/api/contact", data);
    } catch (error: any) {
      console.error("Error saving lead:", error);
    } finally {
      // Robust redirection for Safari and Mobile browsers
      const mailtoUrl = `mailto:sindhuvarma@mentoria.com?subject=Mentoria Inquiry from ${data.name}&body=Name: ${data.name}%0D%0AEmail: ${data.email}%0D%0APhone: ${data.phone}%0D%0AMessage: ${data.message}`;
      
      // Attempt to open mail client immediately
      window.location.href = mailtoUrl;

      // Assuming toast is not defined, removing the toast call to maintain syntactical correctness.
      // If toast is intended, it needs to be imported/defined.

      form.reset();
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
        <CardContent className="p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center animate-scale-in">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h3 className="text-2xl font-semibold mb-2">Thank You!</h3>
          <p className="text-muted-foreground">
            Your message has been sent successfully. I'll get back to you soon!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      <Card className="lg:col-span-3 bg-gradient-to-br from-card to-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-2xl">Send a Message</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          data-testid="input-contact-name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          data-testid="input-contact-email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+91 XXXXXXXXXX"
                          data-testid="input-contact-phone"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Interested In</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-contact-service">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="career-guidance">Career Guidance</SelectItem>
                          <SelectItem value="workshops">Workshops & Seminars</SelectItem>
                          <SelectItem value="one-on-one">One-on-One Counselling</SelectItem>
                          <SelectItem value="corporate">Corporate Training</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell me about your career goals and how I can help..."
                        className="min-h-[120px] resize-none"
                        data-testid="textarea-contact-message"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 text-white gap-2"
                disabled={form.formState.isSubmitting}
                data-testid="button-contact-submit"
              >
                <Send className="w-5 h-5" />
                Send Message
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="lg:col-span-2 space-y-6">
        <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h4 className="font-medium">Email</h4>
                <a
                  href="mailto:vivekupadhyay2005@gmail.com"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  data-testid="link-contact-email"
                >
                  vivekupadhyay2005@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h4 className="font-medium">Phone / WhatsApp</h4>
                <a
                  href="tel:+917030502200"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  data-testid="link-contact-phone"
                >
                  +91 7030502200
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <h4 className="font-medium">Location</h4>
                <p className="text-muted-foreground text-sm">India</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-teal-500" />
              </div>
              <div>
                <h4 className="font-medium">Availability</h4>
                <p className="text-muted-foreground text-sm">Mon - Sat, 9 AM - 6 PM</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-teal-500/10 border-border/50">
          <CardContent className="p-6 text-center">
            <h4 className="font-semibold mb-2">Prefer WhatsApp?</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get instant responses on WhatsApp for quick queries
            </p>
            <a href="https://wa.me/917030502200" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="gap-2"
                data-testid="button-contact-whatsapp"
              >
                <Phone className="w-4 h-4" />
                Chat on WhatsApp
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
