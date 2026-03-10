import { 
  type User, type InsertUser, type Order, type InsertOrder,
  type ButtonClick, type InsertButtonClick,
  type NewsletterSubscriber, type InsertNewsletterSubscriber,
  type SiteButton, type InsertSiteButton,
  type Review, type InsertReview,
  type BlogPost, type InsertBlogPost,
  type Contact, type InsertContact,
  users, orders, buttonClicks, newsletterSubscribers, siteButtons, reviews, blogPosts, contacts
} from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq, desc, sql } from "drizzle-orm";

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
  getReviews(): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  updateReview(id: string, review: Partial<InsertReview>): Promise<Review | undefined>;
  deleteReview(id: string): Promise<boolean>;
  getBlogPosts(): Promise<BlogPost[]>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;
  createContact(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private orders: Map<string, Order>;
  private buttonClicks: Map<string, ButtonClick>;
  private newsletterSubscribers: Map<string, NewsletterSubscriber>;
  private siteButtons: Map<string, SiteButton>;
  private reviews: Map<string, Review>;
  private blogPosts: Map<string, BlogPost>;
  private contacts: Map<string, Contact>;

  constructor() {
    this.users = new Map();
    this.orders = new Map();
    this.buttonClicks = new Map();
    this.newsletterSubscribers = new Map();
    this.siteButtons = new Map();
    this.reviews = new Map();
    this.blogPosts = new Map();
    this.contacts = new Map();
    this.initializeSiteButtons();
    this.initializeDefaultReviews();
  }

  private initializeDefaultReviews() {
    const defaultReviews: InsertReview[] = [
      { name: "Priya Sharma", role: "Engineering Student", rating: 5, text: "Dr. Upadhyay's guidance was transformative. I was confused between multiple career paths, but his structured approach helped me discover my true passion in biotechnology. Now I'm pursuing my dream career!", isActive: "true" },
      { name: "Rajesh Kumar", role: "Corporate Professional", rating: 5, text: "After 10 years in IT, I felt stuck. The counselling sessions helped me identify transferable skills and transition into product management. Best investment in my career!", isActive: "true" },
      { name: "Meera Patel", role: "Parent", rating: 5, text: "As a parent, I wanted the best for my daughter's future. Dr. Upadhyay's empathetic approach and expertise helped us understand her strengths and choose the right career path together.", isActive: "true" },
    ];
    defaultReviews.forEach((review, index) => {
      const id = `review-${index + 1}`;
      this.reviews.set(id, { ...review, id, image: null, rating: review.rating ?? 5, isActive: review.isActive ?? "true", createdAt: new Date() });
    });
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

  async getReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async createReview(review: InsertReview): Promise<Review> {
    const id = randomUUID();
    const newReview: Review = {
      id,
      name: review.name,
      role: review.role,
      image: review.image ?? null,
      rating: review.rating ?? 5,
      text: review.text,
      isActive: review.isActive ?? "true",
      createdAt: new Date(),
    };
    this.reviews.set(id, newReview);
    return newReview;
  }

  async updateReview(id: string, review: Partial<InsertReview>): Promise<Review | undefined> {
    const existing = this.reviews.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...review };
    this.reviews.set(id, updated);
    return updated;
  }

  async deleteReview(id: string): Promise<boolean> {
    return this.reviews.delete(id);
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const newPost: BlogPost = {
      id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      image: post.image ?? null,
      readTime: post.readTime ?? "5 min read",
      isPublished: post.isPublished ?? "false",
      createdAt: new Date(),
    };
    this.blogPosts.set(id, newPost);
    return newPost;
  }

  async updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const existing = this.blogPosts.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...post };
    this.blogPosts.set(id, updated);
    return updated;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    return this.blogPosts.delete(id);
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { ...insertContact, id, createdAt: new Date() };
    this.contacts.set(id, contact);
    return contact;
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }

  async createOrder(orderData: Omit<InsertOrder, "razorpayPaymentId" | "customerEmail" | "customerPhone" | "customerName">): Promise<Order> {
    const [newOrder] = await db.insert(orders).values({
      razorpayOrderId: orderData.razorpayOrderId,
      amount: orderData.amount,
      currency: orderData.currency || "INR",
      planName: orderData.planName,
      category: orderData.category,
      status: orderData.status || "created",
    }).returning();
    return newOrder;
  }

  async getOrderByRazorpayId(razorpayOrderId: string): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.razorpayOrderId, razorpayOrderId));
    return order;
  }

  async updateOrderPayment(razorpayOrderId: string, paymentId: string): Promise<Order | undefined> {
    const [updatedOrder] = await db.update(orders)
      .set({ razorpayPaymentId: paymentId, status: "paid", paidAt: new Date() })
      .where(eq(orders.razorpayOrderId, razorpayOrderId))
      .returning();
    return updatedOrder;
  }

  async getAllOrders(): Promise<Order[]> {
    return await db.select().from(orders).orderBy(desc(orders.createdAt));
  }

  async trackButtonClick(click: InsertButtonClick): Promise<ButtonClick> {
    const [newClick] = await db.insert(buttonClicks).values(click).returning();
    return newClick;
  }

  async getButtonClicks(): Promise<ButtonClick[]> {
    return await db.select().from(buttonClicks).orderBy(desc(buttonClicks.clickedAt));
  }

  async getButtonClickStats(): Promise<{ buttonId: string; buttonLabel: string; section: string; count: number }[]> {
    const result = await db.select({
      buttonId: buttonClicks.buttonId,
      buttonLabel: buttonClicks.buttonLabel,
      section: buttonClicks.section,
      count: sql<number>`count(*)`.mapWith(Number),
    })
    .from(buttonClicks)
    .groupBy(buttonClicks.buttonId, buttonClicks.buttonLabel, buttonClicks.section)
    .orderBy(desc(sql`count(*)`));
    
    return result;
  }

  async addNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    const [newSubscriber] = await db.insert(newsletterSubscribers).values(subscriber).returning();
    return newSubscriber;
  }

  async getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    return await db.select().from(newsletterSubscribers).orderBy(desc(newsletterSubscribers.subscribedAt));
  }

  async getSiteButtons(): Promise<SiteButton[]> {
    return await db.select().from(siteButtons);
  }

  async upsertSiteButton(button: InsertSiteButton): Promise<SiteButton> {
    const [newButton] = await db.insert(siteButtons).values(button).onConflictDoUpdate({
      target: siteButtons.id,
      set: button,
    }).returning();
    return newButton;
  }

  async getReviews(): Promise<Review[]> {
    return await db.select().from(reviews).orderBy(desc(reviews.createdAt));
  }

  async createReview(review: InsertReview): Promise<Review> {
    const [newReview] = await db.insert(reviews).values(review).returning();
    return newReview;
  }

  async updateReview(id: string, review: Partial<InsertReview>): Promise<Review | undefined> {
    const [updated] = await db.update(reviews).set(review).where(eq(reviews.id, id)).returning();
    return updated;
  }

  async deleteReview(id: string): Promise<boolean> {
    const [deleted] = await db.delete(reviews).where(eq(reviews.id, id)).returning();
    return !!deleted;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }

  async updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [updated] = await db.update(blogPosts).set(post).where(eq(blogPosts.id, id)).returning();
    return updated;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const [deleted] = await db.delete(blogPosts).where(eq(blogPosts.id, id)).returning();
    return !!deleted;
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const [newContact] = await db.insert(contacts).values(contact).returning();
    return newContact;
  }
}

export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
