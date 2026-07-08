import { Router } from "express"; // O Hono, dependiendo de tu framework
import { UserController } from "./UserController";

const router = Router();
router.get("/", UserController.list);

export default router;
