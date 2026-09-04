import rateLimit from "express-rate-limit";
import { Request } from "express";


export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many requests from this IP, please try again later.",
  },
  skip: (req: Request) => process.env.NODE_ENV === "test",
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many login attempts, please try again later.",
  },
  skip: (req: Request) => process.env.NODE_ENV === "test",
  keyGenerator: (req: Request) => {
    // Rate limit by IP and email combination
    return `${req.ip}-${(req.body as any)?.email || "unknown"}`;
  },
});

export const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many requests for this sensitive operation.",
  },
  skip: (req: Request) => process.env.NODE_ENV === "test",
});
