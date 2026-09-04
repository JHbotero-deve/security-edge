import { Router } from "express";
import { AuditController } from "./audit.controller.js";
import { jwtMiddleware, roleMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();
const controller = new AuditController();

router.get("/", jwtMiddleware, roleMiddleware(["ADMIN"]), controller.getAll);

export default router;

