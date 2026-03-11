import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import logoImage from "@assets/11_-_Vivekanand_Upadhyay_1765615274650.jpg";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" data-testid="link-logo">
            <div className="flex items-center gap-2 cursor-pointer">
              <img src={logoImage} alt="Career Counsellor Logo" className="w-10 h-10 rounded-full object-cover" />
              <span className="font-semibold text-lg hidden sm:block">Vivekanand Upadhyay</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  data-testid={`link-nav-${item.label.toLowerCase()}`}
                  className={`relative ${
                    location === item.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                  {location === item.href && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500" />
                  )}
                </Button>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/contact" className="hidden sm:block">
              <Button
                data-testid="button-book-consultation"
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 text-white hover:opacity-90"
              >
                Book Consultation
              </Button>
            </Link>
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              data-testid="button-mobile-menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border animate-fade-in-up">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setIsOpen(false)}
                  data-testid={`link-mobile-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            <Link href="/contact">
              <Button
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 text-white"
                onClick={() => setIsOpen(false)}
                data-testid="button-mobile-book"
              >
                Book Consultation
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
