import winston from "winston";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  debug: "blue",
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf((info) => {
    const { timestamp, level, message, ...args } = info;
    const ts = timestamp.slice(0, 19).replace("T", " ");
    return `${ts} [${level}] : ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ""}`;
  })
);

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize({ all: true }),
      format
    ),
  }),
  new winston.transports.File({
    filename: path.join(__dirname, "../../logs/error.log"),
    level: "error",
    format,
  }),
  new winston.transports.File({
    filename: path.join(__dirname, "../../logs/all.log"),
    format,
  }),
];

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "debug",
  levels,
  format,
  transports,
});

export default logger;