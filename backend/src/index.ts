import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./modules/auth/auth.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";
import usersRoutes from "./modules/users/users.routes.js";
import rolesRoutes from "./modules/roles/roles.routes.js";
import permissionsRoutes from "./modules/permissions/permissions.routes.js";
import auditRoutes from "./modules/audit/audit.routes.js";
import dashboardRoutes from "./modules/dashboard/dashboard.routes.js";
import incidentsRoutes from "./modules/incidents/incidents.routes.js";
import notificationsRoutes from "./modules/notifications/notifications.routes.js";
import settingsRoutes from "./modules/settings/settings.routes.js";
import alertRoutes from "./modules/alerts/alerts.routes.js";
import monitoringRoutes from "./modules/monitoring/monitoring.routes.js";
import builderRoutes from "./modules/builder/builder.routes.js";
import { apiLimiter } from "./middlewares/rate-limit.middleware.js";
import { requestLogger, requestMetadata } from "./middlewares/logging.middleware.js";
import { notFoundHandler, errorHandler } from "./middlewares/error.middleware.js";
import logger from "./utils/logger.js";
import { HTTP_STATUS } from "./constants/http-status.js";

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

if (!process.env.JWT_SECRET) {
  logger.error("JWT_SECRET no está definido. Configúralo en tu .env antes de iniciar el servidor.");
  process.exit(1);
}

app.use(helmet());

const ALLOWED_ORIGIN_PATTERNS = [
  /^https?:\/\/localhost(:\d+)?$/,
  /^https?:\/\/127\.0\.0\.1(:\d+)?$/,
  /^https?:\/\/([a-z0-9-]+\.)*trycloudflare\.com$/,
  /^https?:\/\/([a-z0-9-]+\.)*pinggy\.link$/,
  /^https?:\/\/([a-z0-9-]+\.)*loca\.lt$/,
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || ALLOWED_ORIGIN_PATTERNS.some((pattern) => pattern.test(origin))) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));

app.use(requestMetadata);
app.use(requestLogger);
app.use(apiLimiter);

if (process.env.ENABLE_HEALTH_CHECK === "true") {
  app.get("/health", (req, res) => {
    res.status(HTTP_STATUS.OK).json({
      status: "OK",
      timestamp: new Date(),
      environment: NODE_ENV,
    });
  });
}

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/permissions", permissionsRoutes);
app.use("/api/audit", auditRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/incidents", incidentsRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/monitoring", monitoringRoutes);
app.use("/api/builder", builderRoutes);

app.use(notFoundHandler);


app.use(errorHandler);


app.listen(PORT,
  () => {
    logger.info("Security Edge server running",
  {
    port: PORT,
    environment: NODE_ENV,
    timestamp: new Date(),
  });
});

export default app;
