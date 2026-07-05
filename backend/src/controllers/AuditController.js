const logger = require("../config/logger");

exports.getAuditLogs = async (req, res) => {
  try {
    // Implementar llamada al servicio de auditoría
    logger.info("Solicitud de logs de auditoría");
    res.status(200).json({ message: "Logs de auditoría obtenidos" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
