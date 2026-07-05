import * as service from "./alerts.services.js";

export const getAll = async (req, res, next) => {
  try {
    const data = await service.getAllAlertsService();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const data = await service.getAlertByIdService(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
