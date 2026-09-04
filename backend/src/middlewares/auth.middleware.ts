import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

export function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
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

    const token = authHeader.split(" ")[1] as string;

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET as string);
      (req as any).user = payload;
      next();
    } catch (error: any) {
      logger.warn("Invalid or expired token", {
        ip: req.ip,
        error: error.message,
      });
      return res.status(401).json({
        success: false,
        error: "Invalid or expired token",
      });
    }
  } catch (error: any) {
    logger.error("JWT middleware error", { error: error.message });
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

export function roleMiddleware(requiredRoles: string[] = []) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "User not authenticated",
      });
    }

    if (!requiredRoles.includes(user.role)) {
      logger.warn("Unauthorized role access attempt", {
        userId: user.id,
        userRole: user.role,
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

export function activeUserMiddleware(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user;

  if (!user) {
    return res.status(401).json({
      success: false,
      error: "User not authenticated",
    });
  }

  if (user.status !== "ACTIVE") {
    logger.warn("Inactive user access attempt", {
      userId: user.id,
      status: user.status,
    });

    return res.status(403).json({
      success: false,
      error: "Your account is not active",
    });
  }

  next();
}
