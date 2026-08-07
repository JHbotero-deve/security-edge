import { Router } from "express";
import { AuditController } from "./audit.controller.js";

const router = Router();
const controller = new AuditController();

router.get("/", controller.getAll);

export default router;
