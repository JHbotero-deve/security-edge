import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./modules/auth/auth.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";
import { apiLimiter } from "./middlewares/rate-limit.middleware.js";
import { requestLogger, requestMetadata } from "./middlewares/logging.middleware.js";
import { notFoundHandler, errorHandler } from "./middlewares/error.middleware.js";
import logger from "./utils/logger.js";
import { HTTP_STATUS, MESSAGES } from "./constants/http-status.js";

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

// ============================================
// Security Middleware
// ============================================
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

// ============================================
// Body Parser Middleware
// ============================================
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));

// ============================================
// Request Middleware
// ============================================
app.use(requestMetadata);
app.use(requestLogger);
app.use(apiLimiter);

// ============================================
// Health Check Route
// ============================================
if (process.env.ENABLE_HEALTH_CHECK === "true") {
  app.get("/health", (req, res) => {
    res.status(HTTP_STATUS.OK).json({
      status: "OK",
      timestamp: new Date(),
      environment: NODE_ENV,
    });
  });
}

// ============================================
// API Routes
// ============================================
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// ============================================
// Error Handling
// ============================================
app.use(notFoundHandler);
app.use(errorHandler);

// ============================================
// Server Startup
// ============================================
app.listen(PORT, () => {
  logger.info(`🚀 Security Edge server running", {
    port: PORT,
    environment: NODE_ENV,
    timestamp: new Date(),
  });
});

export default app;