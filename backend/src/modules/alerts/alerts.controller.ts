import { Request, Response, NextFunction } from "express";
import * as alertService from "./alerts.services.js";
import { alertIdSchema } from "./alerts.validation.js";

export const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await alertService.getAllAlertsService();
    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { params } = alertIdSchema.parse({ params: req.params });
    const data = await alertService.getAlertByIdService(params.id);
    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};
