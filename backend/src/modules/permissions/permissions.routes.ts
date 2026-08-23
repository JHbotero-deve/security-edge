import { Router } from "express";
import { PermissionController } from "./permissions.controller.js";
import { jwtMiddleware, roleMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();
const controller = new PermissionController();

// Rutas protegidas para administración de permisos
router.use(jwtMiddleware, roleMiddleware(["ADMIN"]));

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
