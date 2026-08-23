import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { jwtMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();
const controller = new AuthController();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/profile", jwtMiddleware, controller.getProfile);

export default router;

