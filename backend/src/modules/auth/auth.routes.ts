import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { jwtMiddleware } from "../../middlewares/auth.middleware.js";
import { authLimiter } from "../../middlewares/rate-limit.middleware.js";






const router = Router();


const controller = new AuthController();

router.post("/register", authLimiter, controller.register);
router.post("/login", authLimiter, controller.login);
router.get("/profile", jwtMiddleware, controller.getProfile);

export default router;

