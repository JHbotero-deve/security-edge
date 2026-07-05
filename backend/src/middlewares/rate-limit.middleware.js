import rateLimit from "express-rate-limit";

/**
 * General API rate limiter
 * 100 requests per 15 minutes
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many requests from this IP, please try again later.",
  },
  skip: (req) => process.env.NODE_ENV === "test",
});

/**
 * Authentication rate limiter
 * 30 requests per 15 minutes
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many login attempts, please try again later.",
  },
  skip: (req) => process.env.NODE_ENV === "test",
  keyGenerator: (req) => {
    // Rate limit by IP and email combination
    return `${req.ip}-${req.body?.email || "unknown"}`;
  },
});

/**
 * Strict rate limiter for sensitive operations
 * 5 requests per 15 minutes
 */
export const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many requests for this sensitive operation.",
  },
  skip: (req) => process.env.NODE_ENV === "test",
});
