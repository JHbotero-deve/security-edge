import logger from "../utils/logger.js";

/**
 * Middleware to log all requests
 */
export function requestLogger(req, res, next) {
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
      userId: req.user?.id,
    });
  });

  next();
}

/**
 * Middleware to attach request metadata
 */
export function requestMetadata(req, res, next) {
  req.metadata = {
    ip: req.ip,
    userAgent: req.get("user-agent"),
    timestamp: new Date(),
  };

  next();
}
