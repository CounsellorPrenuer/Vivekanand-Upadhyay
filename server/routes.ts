import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import Razorpay from "razorpay";
import crypto from "crypto";
import { z } from "zod";

const createOrderSchema = z.object({
  amount: z.number().positive(),
  planName: z.string(),
  category: z.string(),
});

const verifyPaymentSchema = z.object({
  orderId: z.string(),
  paymentId: z.string(),
  signature: z.string(),
});

const trackButtonClickSchema = z.object({
  buttonId: z.string(),
  buttonLabel: z.string(),
  section: z.string(),
  page: z.string().optional(),
});

const newsletterSubscribeSchema = z.object({
  email: z.string().email(),
});

const reviewSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  image: z.string().optional(),
  rating: z.number().min(1).max(5).optional(),
  text: z.string().min(1),
  isActive: z.string().optional(),
});

const blogPostSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  category: z.string().min(1),
  image: z.string().optional(),
  readTime: z.string().optional(),
  isPublished: z.string().optional(),
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  let razorpay: Razorpay | null = null;

  if (keyId && keySecret) {
    console.log("Razorpay initialized with key:", keyId.substring(0, 8) + "...");
    razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  } else {
    console.log("Razorpay not initialized - missing credentials. KEY_ID:", !!keyId, "KEY_SECRET:", !!keySecret);
  }

  app.post("/api/create-order", async (req, res) => {
    try {
      if (!razorpay || !keyId) {
        return res.status(503).json({
          error: "Payment system not configured. Please contact support.",
        });
      }

      const result = createOrderSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid request data" });
      }

      const { amount, planName, category } = result.data;
      const amountInPaise = amount * 100;

      const order = await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt: `order_${Date.now()}`,
        notes: {
          planName,
          category,
        },
      });

      await storage.createOrder({
        razorpayOrderId: order.id,
        amount: amount,
        currency: "INR",
        planName,
        category,
        status: "created",
      });

      res.json({
        orderId: order.id,
        amount: amountInPaise,
        currency: "INR",
        keyId: keyId,
      });
    } catch (error) {
      console.error("Create order error:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  app.post("/api/verify-payment", async (req, res) => {
    try {
      if (!keySecret) {
        return res.status(503).json({
          error: "Payment system not configured",
        });
      }

      const result = verifyPaymentSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid request data" });
      }

      const { orderId, paymentId, signature } = result.data;

      const expectedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(`${orderId}|${paymentId}`)
        .digest("hex");

      if (expectedSignature === signature) {
        await storage.updateOrderPayment(orderId, paymentId);
        res.json({ success: true, message: "Payment verified successfully" });
      } else {
        res.status(400).json({ success: false, error: "Invalid signature" });
      }
    } catch (error) {
      console.error("Verify payment error:", error);
      res.status(500).json({ error: "Failed to verify payment" });
    }
  });

  app.post("/api/track-button-click", async (req, res) => {
    try {
      const result = trackButtonClickSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid request data" });
      }
      await storage.trackButtonClick(result.data);
      res.json({ success: true });
    } catch (error) {
      console.error("Track button click error:", error);
      res.status(500).json({ error: "Failed to track button click" });
    }
  });

  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const result = newsletterSubscribeSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid email address" });
      }
      await storage.addNewsletterSubscriber(result.data);
      res.json({ success: true, message: "Subscribed successfully" });
    } catch (error) {
      console.error("Newsletter subscribe error:", error);
      res.status(500).json({ error: "Failed to subscribe" });
    }
  });

  app.get("/api/admin/dashboard", async (_req, res) => {
    try {
      const [orders, buttonStats, subscribers, buttons] = await Promise.all([
        storage.getAllOrders(),
        storage.getButtonClickStats(),
        storage.getNewsletterSubscribers(),
        storage.getSiteButtons(),
      ]);

      const paidOrders = orders.filter(o => o.status === "paid");
      const totalRevenue = paidOrders.reduce((sum, o) => sum + o.amount, 0);
      const totalClicks = buttonStats.reduce((sum, s) => sum + s.count, 0);

      res.json({
        stats: {
          totalOrders: orders.length,
          paidOrders: paidOrders.length,
          totalRevenue,
          totalSubscribers: subscribers.length,
          totalButtonClicks: totalClicks,
        },
        recentOrders: orders.slice(0, 10),
        buttonStats,
        subscribers: subscribers.slice(0, 20),
        siteButtons: buttons,
      });
    } catch (error) {
      console.error("Admin dashboard error:", error);
      res.status(500).json({ error: "Failed to load dashboard data" });
    }
  });

  app.get("/api/admin/orders", async (_req, res) => {
    try {
      const orders = await storage.getAllOrders();
      res.json(orders);
    } catch (error) {
      console.error("Get orders error:", error);
      res.status(500).json({ error: "Failed to get orders" });
    }
  });

  app.get("/api/admin/button-clicks", async (_req, res) => {
    try {
      const clicks = await storage.getButtonClicks();
      res.json(clicks);
    } catch (error) {
      console.error("Get button clicks error:", error);
      res.status(500).json({ error: "Failed to get button clicks" });
    }
  });

  app.get("/api/admin/subscribers", async (_req, res) => {
    try {
      const subscribers = await storage.getNewsletterSubscribers();
      res.json(subscribers);
    } catch (error) {
      console.error("Get subscribers error:", error);
      res.status(500).json({ error: "Failed to get subscribers" });
    }
  });

  app.get("/api/admin/buttons", async (_req, res) => {
    try {
      const buttons = await storage.getSiteButtons();
      res.json(buttons);
    } catch (error) {
      console.error("Get buttons error:", error);
      res.status(500).json({ error: "Failed to get buttons" });
    }
  });

  // Reviews CRUD
  app.get("/api/admin/reviews", async (_req, res) => {
    try {
      const reviews = await storage.getReviews();
      res.json(reviews);
    } catch (error) {
      console.error("Get reviews error:", error);
      res.status(500).json({ error: "Failed to get reviews" });
    }
  });

  app.post("/api/admin/reviews", async (req, res) => {
    try {
      const result = reviewSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid review data" });
      }
      const review = await storage.createReview(result.data);
      res.json(review);
    } catch (error) {
      console.error("Create review error:", error);
      res.status(500).json({ error: "Failed to create review" });
    }
  });

  app.put("/api/admin/reviews/:id", async (req, res) => {
    try {
      const result = reviewSchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid review data" });
      }
      const review = await storage.updateReview(req.params.id, result.data);
      if (!review) {
        return res.status(404).json({ error: "Review not found" });
      }
      res.json(review);
    } catch (error) {
      console.error("Update review error:", error);
      res.status(500).json({ error: "Failed to update review" });
    }
  });

  app.delete("/api/admin/reviews/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteReview(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Review not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Delete review error:", error);
      res.status(500).json({ error: "Failed to delete review" });
    }
  });

  // Blog Posts CRUD
  app.get("/api/admin/blogs", async (_req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Get blog posts error:", error);
      res.status(500).json({ error: "Failed to get blog posts" });
    }
  });

  app.post("/api/admin/blogs", async (req, res) => {
    try {
      const result = blogPostSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid blog post data" });
      }
      const post = await storage.createBlogPost(result.data);
      res.json(post);
    } catch (error) {
      console.error("Create blog post error:", error);
      res.status(500).json({ error: "Failed to create blog post" });
    }
  });

  app.put("/api/admin/blogs/:id", async (req, res) => {
    try {
      const result = blogPostSchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid blog post data" });
      }
      const post = await storage.updateBlogPost(req.params.id, result.data);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Update blog post error:", error);
      res.status(500).json({ error: "Failed to update blog post" });
    }
  });

  app.delete("/api/admin/blogs/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteBlogPost(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Delete blog post error:", error);
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  });

  // Public endpoints for reviews and blogs
  app.get("/api/reviews", async (_req, res) => {
    try {
      const reviews = await storage.getReviews();
      const activeReviews = reviews.filter(r => r.isActive === "true");
      res.json(activeReviews);
    } catch (error) {
      console.error("Get public reviews error:", error);
      res.status(500).json({ error: "Failed to get reviews" });
    }
  });

  app.get("/api/blogs", async (_req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      const publishedPosts = posts.filter(p => p.isPublished === "true");
      res.json(publishedPosts);
    } catch (error) {
      console.error("Get public blog posts error:", error);
      res.status(500).json({ error: "Failed to get blog posts" });
    }
  });

  return httpServer;
}
