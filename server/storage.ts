import { type User, type InsertUser, type Order, type InsertOrder } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createOrder(order: Omit<InsertOrder, "razorpayPaymentId" | "customerEmail" | "customerPhone" | "customerName">): Promise<Order>;
  getOrderByRazorpayId(razorpayOrderId: string): Promise<Order | undefined>;
  updateOrderPayment(razorpayOrderId: string, paymentId: string): Promise<Order | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private orders: Map<string, Order>;

  constructor() {
    this.users = new Map();
    this.orders = new Map();
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
}

export const storage = new MemStorage();
