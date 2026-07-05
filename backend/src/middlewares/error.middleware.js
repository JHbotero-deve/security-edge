import logger from "../utils/logger.js";

/**
 * 404 Not Found handler
 */
export function notFoundHandler(req, res) {
  logger.warn("Route not found", {
    method: req.method,
    path: req.path,
    ip: req.ip,
  });

  return res.status(404).json({
    success: false,
    error: "Endpoint not found",
    path: req.path,
  });
}

/**
 * Global error handler middleware
 * Must be the last middleware registered
 */
export function errorHandler(err, req, res, next) {
  const status = err.statusCode || err.status || 500;
  const message = err.message || "Internal Server Error";

  logger.error("Unhandled error", {
    error: message,
    status,
    stack: err.stack,
    path: req.path,
    method: req.method,
    ip: req.ip,
  });

  // Prisma validation errors
  if (err.code === "P2002") {
    return res.status(409).json({
      success: false,
      error: `Unique constraint violation on field: ${err.meta?.target?.[0] || "unknown"}`,
    });
  }

  // Prisma not found errors
  if (err.code === "P2025") {
    return res.status(404).json({
      success: false,
      error: "Resource not found",
    });
  }

  // Zod validation errors
  if (err.name === "ZodError") {
    return res.status(400).json({
      success: false,
      error: "Validation failed",
      details: err.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      })),
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      error: "Invalid token",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      error: "Token expired",
    });
  }

  // Default error response
  return res.status(status).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}
