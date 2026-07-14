import { Request, Response, NextFunction } from "express";
import * as alertService from "./alerts.services";
import { alertIdSchema } from "./alerts.validation.ts";

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
    const { id } = alertIdSchema.parse(req.params);
    const data = await alertService.getAlertByIdService(id);
    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};
