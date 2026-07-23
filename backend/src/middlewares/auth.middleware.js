import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

export function jwtMiddleware(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      logger.warn("Missing or invalid authorization header", {
        ip: req.ip,
        path: req.path,
      });
      return res.status(401).json({
        success: false,
        error: "Authorization token required",
      });
    }

    const token = authHeader.split(" ")[1];

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payload;
      next();
    } catch (error) {
      logger.warn("Invalid or expired token", {
        ip: req.ip,
        error: error.message,
      });
      return res.status(401).json({
        success: false,
        error: "Invalid or expired token",
      });
    }
  } catch (error) {
    logger.error("JWT middleware error", { error: error.message });
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}
export function roleMiddleware(requiredRoles = []) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: "User not authenticated",
      });
    }

    if (!requiredRoles.includes(req.user.role)) {
      logger.warn("Unauthorized role access attempt", {
        userId: req.user.id,
        userRole: req.user.role,
        requiredRoles,
      });

      return res.status(403).json({
        success: false,
        error: "Insufficient permissions for this operation",
      });
    }

    next();
  };
}
export function activeUserMiddleware(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: "User not authenticated",
    });
  }

  if (req.user.status !== "ACTIVE") {
    logger.warn("Inactive user access attempt", {
      userId: req.user.id,
      status: req.user.status,
    });

    return res.status(403).json({
      success: false,
      error: "Your account is not active",
    });
  }

  next();
}
