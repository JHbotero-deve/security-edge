import { Router } from "express";
import {
  loginController,
  getCurrentUserController,
  logoutController,
} from "./auth.controller.js";
import { jwtMiddleware, activeUserMiddleware } from "../../middlewares/auth.middleware.js";
import { authLimiter } from "../../middlewares/rate-limit.middleware.js";

const router = Router();

/**
 * Public routes
 */
router.post("/login", authLimiter, loginController);

/**
 * Protected routes
 */
router.get("/me", jwtMiddleware, activeUserMiddleware, getCurrentUserController);
router.post("/logout", jwtMiddleware, logoutController);

export default router;