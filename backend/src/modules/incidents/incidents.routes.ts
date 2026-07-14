import { Router } from "express";
import { getIncidents, getIncidentById, createIncident } from "./incidents.controller";

const router = Router();

router.get("/", getIncidents);
router.get("/:id", getIncidentById);
router.post("/", createIncident);

export default router;
