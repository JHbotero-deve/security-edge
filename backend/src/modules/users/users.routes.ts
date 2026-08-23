import { Router } from "express";
import { UserController } from "./users.controller.js";
import { jwtMiddleware, roleMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();
const controller = new UserController();

router.get("/", jwtMiddleware, roleMiddleware(["ADMIN"]), controller.getAll);
router.get("/:id", jwtMiddleware, roleMiddleware(["ADMIN"]), controller.getById);
router.post("/", jwtMiddleware, roleMiddleware(["ADMIN"]), controller.create);
router.put("/:id", jwtMiddleware, roleMiddleware(["ADMIN"]), controller.update);
router.delete("/:id", jwtMiddleware, roleMiddleware(["ADMIN"]), controller.delete);

export default router;

