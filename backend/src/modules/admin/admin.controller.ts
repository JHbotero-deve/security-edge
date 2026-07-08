import * as service from "./admin.service.js";

export const getDashboard = async (req, res, next) => {
  try {
    const data = await service.getDashboardStatsService();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getAuditLogs = async (req, res, next) => {
  try {
    const data = await service.getAuditLogsService(req.query);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getSecurityEvents = async (req, res, next) => {
  try {
    const data = await service.getSecurityEventsService(req.query);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
