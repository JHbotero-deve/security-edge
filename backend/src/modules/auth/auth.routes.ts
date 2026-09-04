import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { jwtMiddleware } from "../../middlewares/auth.middleware.js";
<<<<<<< HEAD
import { authLimiter } from "../../middlewares/rate-limit.middleware.js";
=======
>>>>>>> origin/main

const router = Router();
const controller = new AuthController();

<<<<<<< HEAD
router.post("/register", authLimiter, controller.register);
router.post("/login", authLimiter, controller.login);
=======
router.post("/register", controller.register);
router.post("/login", controller.login);
>>>>>>> origin/main
router.get("/profile", jwtMiddleware, controller.getProfile);

export default router;

