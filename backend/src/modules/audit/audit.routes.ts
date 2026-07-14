import { Router } from "express";
import { getAuditLogs } from "./audit.controller";

const router = Router();

router.get("/", getAuditLogs);

export default router;

