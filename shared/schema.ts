import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  razorpayOrderId: text("razorpay_order_id").notNull(),
  razorpayPaymentId: text("razorpay_payment_id"),
  amount: integer("amount").notNull(),
  currency: text("currency").default("INR").notNull(),
  planName: text("plan_name").notNull(),
  category: text("category").notNull(),
  status: text("status").default("created").notNull(),
  customerEmail: text("customer_email"),
  customerPhone: text("customer_phone"),
  customerName: text("customer_name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  paidAt: timestamp("paid_at"),
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
  paidAt: true,
});

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

export const buttonClicks = pgTable("button_clicks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  buttonId: text("button_id").notNull(),
  buttonLabel: text("button_label").notNull(),
  section: text("section").notNull(),
  page: text("page").default("home").notNull(),
  clickedAt: timestamp("clicked_at").defaultNow().notNull(),
});

export const insertButtonClickSchema = createInsertSchema(buttonClicks).omit({
  id: true,
  clickedAt: true,
});

export type InsertButtonClick = z.infer<typeof insertButtonClickSchema>;
export type ButtonClick = typeof buttonClicks.$inferSelect;

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
});

export const insertNewsletterSubscriberSchema = createInsertSchema(newsletterSubscribers).omit({
  id: true,
  subscribedAt: true,
});

export type InsertNewsletterSubscriber = z.infer<typeof insertNewsletterSubscriberSchema>;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;

export const siteButtons = pgTable("site_buttons", {
  id: varchar("id").primaryKey(),
  label: text("label").notNull(),
  section: text("section").notNull(),
  page: text("page").default("home").notNull(),
  action: text("action").notNull(),
  description: text("description"),
});

export const insertSiteButtonSchema = createInsertSchema(siteButtons);

export type InsertSiteButton = z.infer<typeof insertSiteButtonSchema>;
export type SiteButton = typeof siteButtons.$inferSelect;

export const reviews = pgTable("reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  role: text("role").notNull(),
  image: text("image"),
  rating: integer("rating").default(5).notNull(),
  text: text("text").notNull(),
  isActive: text("is_active").default("true").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  createdAt: true,
});

export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;

export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  image: text("image"),
  readTime: text("read_time").default("5 min read").notNull(),
  isPublished: text("is_published").default("false").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
});

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
