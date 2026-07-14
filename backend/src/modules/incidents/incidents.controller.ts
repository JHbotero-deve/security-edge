import { Request, Response, NextFunction } from "express";
import * as incidentService from "./incidents.service";
import { createIncidentSchema, updateIncidentSchema } from "./incidents.validation";

export const getIncidents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await incidentService.getIncidentsService();
    res.status(200).json({
      success: true,
      data
    });
  } catch (error: any) {
    next(error);
  }
};

export const getIncidentById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await incidentService.getIncidentByIdService(req.params.id);
    res.status(200).json({
      success: true,
      data
    });
  } catch (error: any) {
    next(error);
  }
};

export const createIncident = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const validatedData = createIncidentSchema.parse(req.body);
    const data = await incidentService.createIncidentService(validatedData);
    res.status(201).json({
      success: true,
      data
    });
  } catch (error: any) {
    next(error);
  }
};
