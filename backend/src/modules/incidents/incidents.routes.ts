import { Router } from "express";
import { IncidentController } from "./incidents.controller.js";
import { jwtMiddleware, roleMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();
const controller = new IncidentController();

router.get("/", jwtMiddleware, controller.getAll);
router.get("/:id", jwtMiddleware, controller.getById);
router.post("/", jwtMiddleware, roleMiddleware(["ADMIN", "OPERATOR"]), controller.create);
router.put("/:id", jwtMiddleware, roleMiddleware(["ADMIN", "OPERATOR"]), controller.update);
router.delete("/:id", jwtMiddleware, roleMiddleware(["ADMIN"]), controller.delete);

export default router;

