import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { rateLimit } from "express-rate-limit";
import { z } from "zod";
import cors from "cors";
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
  })).optional()
});

const FactorySchema = z.object({
  prompt: z.string().min(3).max(500),
});

async function startServer() {
  app.use(cors());
  app.use(express.json());

  // Request logging
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  const isDev = process.env.NODE_ENV !== "production";
  console.log(`Starting server in ${isDev ? 'development' : 'production'} mode...`);

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  const apiKey = process.env.GEMINI_API_KEY || "";
  const genAI = new GoogleGenAI({ apiKey });

  // Ads Factory Endpoint
  app.post("/api/factory/generate", limiter, async (req, res) => {
    try {
      const validation = FactorySchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: "Invalid input", details: validation.error.format() });
      }

      if (!apiKey) {
        return res.status(500).json({ error: "AI Service configuration missing" });
      }

      const { prompt } = validation.data;

      // 1. Market Researcher
      const researchResponse = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ role: 'user', parts: [{ text: `You are a Market Researcher. Analyze this product/idea: "${prompt}". Identify the target audience, current market trends, and 3 key pain points this product solves. Keep it concise.` }] }]
      });
      const research = researchResponse.text;

      // 2. Creative Strategist
      const strategyResponse = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ role: 'user', parts: [{ text: `You are a Creative Strategist. Based on this market research: "${research}", develop a unique creative angle and a powerful "hook" for a social media ad campaign for "${prompt}".` }] }]
      });
      const strategy = strategyResponse.text;

      // 3. Copywriter
      const copyResponse = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ role: 'user', parts: [{ text: `You are a Copywriter. Based on the strategy: "${strategy}", write a compelling social media ad caption (max 150 words) and a catchy headline for "${prompt}". Include emojis and a call to action.` }] }]
      });
      const copy = copyResponse.text;

      // 4. Visual Prompt Engineer
      const visualResponse = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ role: 'user', parts: [{ text: `You are a Visual Prompt Engineer. Based on the copy: "${copy}", describe a high-quality, eye-catching visual for this ad. Provide a detailed prompt for an AI image generator like Midjourney or DALL-E.` }] }]
      });
      const visual = visualResponse.text;

      res.json({
        research,
        strategy,
        copy,
        visual,
      });
    } catch (error: any) {
      console.error("Factory API Error:", error);
      res.status(500).json({ error: "Failed to process factory request" });
    }
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

      if (!apiKey) {
        return res.status(500).json({ error: "AI Service configuration missing" });
      }
      
      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: "You are ibedev's Customer Support Assistant. Your tone is professional, helpful, and friendly. provide very short, clear answers (max 2 sentences). ibedev is a full-stack developer (React, TypeScript, AI). Help users with project inquiries, technical questions, or finding contact info (Email: ebe27712@gmail.com, WhatsApp: 0256745261). Currently booking for Q3 2026.",
        },
        contents: [
          ...(history || []),
          { role: 'user', parts: [{ text: message }] }
        ]
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
