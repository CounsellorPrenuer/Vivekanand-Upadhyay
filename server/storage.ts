import { 
  type User, type InsertUser, type Order, type InsertOrder,
  type ButtonClick, type InsertButtonClick,
  type NewsletterSubscriber, type InsertNewsletterSubscriber,
  type SiteButton, type InsertSiteButton
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createOrder(order: Omit<InsertOrder, "razorpayPaymentId" | "customerEmail" | "customerPhone" | "customerName">): Promise<Order>;
  getOrderByRazorpayId(razorpayOrderId: string): Promise<Order | undefined>;
  updateOrderPayment(razorpayOrderId: string, paymentId: string): Promise<Order | undefined>;
  getAllOrders(): Promise<Order[]>;
  trackButtonClick(click: InsertButtonClick): Promise<ButtonClick>;
  getButtonClicks(): Promise<ButtonClick[]>;
  getButtonClickStats(): Promise<{ buttonId: string; buttonLabel: string; section: string; count: number }[]>;
  addNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
  getNewsletterSubscribers(): Promise<NewsletterSubscriber[]>;
  getSiteButtons(): Promise<SiteButton[]>;
  upsertSiteButton(button: InsertSiteButton): Promise<SiteButton>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private orders: Map<string, Order>;
  private buttonClicks: Map<string, ButtonClick>;
  private newsletterSubscribers: Map<string, NewsletterSubscriber>;
  private siteButtons: Map<string, SiteButton>;

  constructor() {
    this.users = new Map();
    this.orders = new Map();
    this.buttonClicks = new Map();
    this.newsletterSubscribers = new Map();
    this.siteButtons = new Map();
    this.initializeSiteButtons();
  }

  private initializeSiteButtons() {
    const buttons: InsertSiteButton[] = [
      { id: "hero-get-started", label: "Get Started", section: "Hero", page: "home", action: "Scroll to pricing", description: "Main CTA button in hero section" },
      { id: "hero-learn-more", label: "Learn More", section: "Hero", page: "home", action: "Scroll to about", description: "Secondary button in hero section" },
      { id: "about-read-more", label: "Read More", section: "About", page: "home", action: "Navigate to services", description: "Learn more about services" },
      { id: "services-learn-more-1", label: "Learn More", section: "Services", page: "home", action: "Show service details", description: "Career Assessment service details" },
      { id: "services-learn-more-2", label: "Learn More", section: "Services", page: "home", action: "Show service details", description: "One-on-One Counseling details" },
      { id: "services-learn-more-3", label: "Learn More", section: "Services", page: "home", action: "Show service details", description: "Career Workshops details" },
      { id: "services-learn-more-4", label: "Learn More", section: "Services", page: "home", action: "Show service details", description: "Resume Building details" },
      { id: "pricing-book-now-student", label: "Book Now", section: "Pricing", page: "home", action: "Open Razorpay payment", description: "Student plan booking" },
      { id: "pricing-book-now-professional", label: "Book Now", section: "Pricing", page: "home", action: "Open Razorpay payment", description: "Professional plan booking" },
      { id: "pricing-book-now-school", label: "Book Now", section: "Pricing", page: "home", action: "Open Razorpay payment", description: "School plan booking" },
      { id: "pricing-book-now-corporate", label: "Book Now", section: "Pricing", page: "home", action: "Open Razorpay payment", description: "Corporate plan booking" },
      { id: "cta-book-session", label: "Book Your Session", section: "CTA", page: "home", action: "Scroll to pricing", description: "Bottom CTA button" },
      { id: "nav-home", label: "Home", section: "Navbar", page: "all", action: "Navigate to home", description: "Navigation link" },
      { id: "nav-services", label: "Services", section: "Navbar", page: "all", action: "Navigate to services", description: "Navigation link" },
      { id: "nav-blog", label: "Blog", section: "Navbar", page: "all", action: "Navigate to blog", description: "Navigation link" },
      { id: "nav-contact", label: "Contact", section: "Navbar", page: "all", action: "Navigate to contact", description: "Navigation link" },
      { id: "footer-newsletter", label: "Subscribe", section: "Footer", page: "all", action: "Subscribe to newsletter", description: "Newsletter subscription" },
      { id: "whatsapp-float", label: "WhatsApp", section: "Floating", page: "all", action: "Open WhatsApp chat", description: "Floating WhatsApp button" },
    ];
    buttons.forEach(btn => {
      this.siteButtons.set(btn.id, { ...btn, page: btn.page ?? "home", description: btn.description ?? null });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createOrder(orderData: Omit<InsertOrder, "razorpayPaymentId" | "customerEmail" | "customerPhone" | "customerName">): Promise<Order> {
    const id = randomUUID();
    const order: Order = {
      id,
      razorpayOrderId: orderData.razorpayOrderId,
      razorpayPaymentId: null,
      amount: orderData.amount,
      currency: orderData.currency ?? "INR",
      planName: orderData.planName,
      category: orderData.category,
      status: orderData.status ?? "created",
      customerEmail: null,
      customerPhone: null,
      customerName: null,
      createdAt: new Date(),
      paidAt: null,
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrderByRazorpayId(razorpayOrderId: string): Promise<Order | undefined> {
    return Array.from(this.orders.values()).find(
      (order) => order.razorpayOrderId === razorpayOrderId,
    );
  }

  async updateOrderPayment(razorpayOrderId: string, paymentId: string): Promise<Order | undefined> {
    const order = await this.getOrderByRazorpayId(razorpayOrderId);
    if (order) {
      order.razorpayPaymentId = paymentId;
      order.status = "paid";
      order.paidAt = new Date();
      this.orders.set(order.id, order);
      return order;
    }
    return undefined;
  }

  async getAllOrders(): Promise<Order[]> {
    return Array.from(this.orders.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async trackButtonClick(click: InsertButtonClick): Promise<ButtonClick> {
    const id = randomUUID();
    const buttonClick: ButtonClick = {
      id,
      buttonId: click.buttonId,
      buttonLabel: click.buttonLabel,
      section: click.section,
      page: click.page ?? "home",
      clickedAt: new Date(),
    };
    this.buttonClicks.set(id, buttonClick);
    return buttonClick;
  }

  async getButtonClicks(): Promise<ButtonClick[]> {
    return Array.from(this.buttonClicks.values()).sort((a, b) => 
      new Date(b.clickedAt).getTime() - new Date(a.clickedAt).getTime()
    );
  }

  async getButtonClickStats(): Promise<{ buttonId: string; buttonLabel: string; section: string; count: number }[]> {
    const clickCounts = new Map<string, { buttonLabel: string; section: string; count: number }>();
    
    this.buttonClicks.forEach((click) => {
      const existing = clickCounts.get(click.buttonId);
      if (existing) {
        existing.count++;
      } else {
        clickCounts.set(click.buttonId, {
          buttonLabel: click.buttonLabel,
          section: click.section,
          count: 1,
        });
      }
    });
    
    return Array.from(clickCounts.entries()).map(([buttonId, data]) => ({
      buttonId,
      ...data,
    })).sort((a, b) => b.count - a.count);
  }

  async addNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    const existing = Array.from(this.newsletterSubscribers.values()).find(s => s.email === subscriber.email);
    if (existing) {
      return existing;
    }
    const id = randomUUID();
    const newSubscriber: NewsletterSubscriber = {
      id,
      email: subscriber.email,
      subscribedAt: new Date(),
    };
    this.newsletterSubscribers.set(id, newSubscriber);
    return newSubscriber;
  }

  async getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    return Array.from(this.newsletterSubscribers.values()).sort((a, b) => 
      new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime()
    );
  }

  async getSiteButtons(): Promise<SiteButton[]> {
    return Array.from(this.siteButtons.values());
  }

  async upsertSiteButton(button: InsertSiteButton): Promise<SiteButton> {
    const siteButton: SiteButton = {
      id: button.id,
      label: button.label,
      section: button.section,
      page: button.page ?? "home",
      action: button.action,
      description: button.description ?? null,
    };
    this.siteButtons.set(button.id, siteButton);
    return siteButton;
  }
}

export const storage = new MemStorage();
