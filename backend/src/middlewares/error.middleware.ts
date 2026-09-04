import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.js";

export function notFoundHandler(req: Request, res: Response) {
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

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
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


  if (err.code === "P2002") {
    return res.status(409).json({
      success: false,
      error: `Unique constraint violation on field: ${err.meta?.target?.[0] || "unknown"}`,
    });
  }
  if (err.code === "P2025") {
    return res.status(404).json({
      success: false,
      error: "Resource not found",
    });
  }

  if (err.name === "ZodError") {
    return res.status(400).json({
      success: false,
      error: "Validation failed",
      details: err.errors.map((e: any) => ({
        path: e.path.join("."),
        message: e.message,
      })),
    });
  }
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

  return res.status(status).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}
