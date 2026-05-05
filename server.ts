import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { rateLimit } from "express-rate-limit";
import { z } from "zod";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests from this IP, please try again after 15 minutes." },
});

// Zod schema for chat validation
const ChatSchema = z.object({
  message: z.string().min(1).max(1000),
  history: z.array(z.object({
    role: z.enum(["user", "model"]),
    parts: z.array(z.object({ text: z.string() }))
  })).max(20).optional()
});

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

async function startServer() {
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "img-src": ["'self'", "data:", "https://github.com/user-attachments/assets/"],
        "connect-src": ["'self'", "https://ai.studio", "https://*.google.com"],
        "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Vite needs these in dev
      },
    },
  }));
  app.use(cors({
    origin: process.env.APP_URL || true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }));
  app.use(express.json());

  // Request logging
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`${new Date().toISOString()} - ${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
    });
    next();
  });

  const isDev = process.env.NODE_ENV !== "production";
  console.log(`Starting server in ${isDev ? 'development' : 'production'} mode...`);

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Protected AI Chat endpoint
  app.post("/api/chat", limiter, async (req, res) => {
    try {
      const validation = ChatSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid input", 
          details: validation.error.format() 
        });
      }

      const { message, history } = validation.data;

      if (!ai) {
        return res.status(500).json({ error: "AI Service configuration missing" });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...(history || []),
          { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction: "You are ibedev's Customer Support Assistant. Your tone is professional, helpful, and friendly. provide very short, clear answers (max 2 sentences). ibedev is a full-stack developer (React, TypeScript, AI). Help users with project inquiries, technical questions, or finding contact info (Email: ebe27712@gmail.com, WhatsApp: 0256745261). Currently booking for Q3 2026.",
        }
      });

      res.json({ response: response.text });
    } catch (error: any) {
      console.error("Chat API Error:", error);
      res.status(500).json({ error: "Failed to process chat request" });
    }
  });

  if (isDev) {
    console.log("Setting up Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving static files...");
    const distPath = path.resolve(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
