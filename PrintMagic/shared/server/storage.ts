import { type User, type InsertUser, type PrintJob, type InsertPrintJob } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createPrintJob(printJob: InsertPrintJob): Promise<PrintJob>;
  getPrintJob(id: string): Promise<PrintJob | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private printJobs: Map<string, PrintJob>;

  constructor() {
    this.users = new Map();
    this.printJobs = new Map();
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

  async createPrintJob(insertPrintJob: InsertPrintJob): Promise<PrintJob> {
    const id = randomUUID();
    const printJob: PrintJob = { 
      ...insertPrintJob, 
      id,
      createdAt: new Date()
    };
    this.printJobs.set(id, printJob);
    return printJob;
  }

  async getPrintJob(id: string): Promise<PrintJob | undefined> {
    return this.printJobs.get(id);
  }
}

export const storage = new MemStorage();
