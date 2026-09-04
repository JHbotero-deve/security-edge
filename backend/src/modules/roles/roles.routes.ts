import { Router } from "express";
import { RoleController } from "./roles.controller.js";
import { jwtMiddleware, roleMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();
const controller = new RoleController();

// Rutas protegidas para administración de roles
router.use(jwtMiddleware, roleMiddleware(["ADMIN"]));

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
