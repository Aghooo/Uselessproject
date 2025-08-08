import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import { insertPrintJobSchema } from "@shared/schema";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, DOCX, JPG, PNG are allowed.'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Upload files and create print job
  app.post("/api/print", upload.array('files'), async (req, res) => {
    try {
      const files = req.files as Express.Multer.File[];
      
      if (!files || files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      // Calculate random price (10-200 rupees)
      const basePrice = Math.floor(Math.random() * 190) + 10;
      const totalPrice = basePrice * files.length;
      
      // Generate receipt number
      const receiptNumber = `PR-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`;
      
      // Create print job for first file (simplified)
      const printJobData = {
        fileName: files.map(f => f.originalname).join(', '),
        fileSize: files.reduce((sum, f) => sum + f.size, 0),
        price: totalPrice,
        receiptNumber
      };

      const validatedData = insertPrintJobSchema.parse(printJobData);
      const printJob = await storage.createPrintJob(validatedData);

      res.json({
        success: true,
        printJob,
        fileCount: files.length
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Upload failed" 
      });
    }
  });

  // Get print job by ID
  app.get("/api/print/:id", async (req, res) => {
    try {
      const printJob = await storage.getPrintJob(req.params.id);
      if (!printJob) {
        return res.status(404).json({ message: "Print job not found" });
      }
      res.json(printJob);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch print job" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
