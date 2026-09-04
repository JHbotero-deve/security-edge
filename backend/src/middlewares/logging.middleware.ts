import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.js";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const level = res.statusCode >= 400 ? "warn" : "info";

    logger[level]("HTTP Request", {
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userId: (req as any).user?.id,
    });
  });

  next();
}

export function requestMetadata(req: Request, res: Response, next: NextFunction) {
  (req as any).metadata = {
    ip: req.ip,
    userAgent: req.get("user-agent"),
    timestamp: new Date(),
  };

  next();
}
