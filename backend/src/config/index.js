/**
 * Dónde: config/index.js
 * Para qué: Exportar toda la configuración de seguridad y servicios como un solo módulo.
 */

module.exports = {
  cors: require("./cors"),
  db: require("./database"),
  env: require("./env"),
  helmet: require("./helmet"),
  jwt: require("./jwt"),
  logger: require("./logger"),
  rateLimit: require("./rateLimit"),
  swagger: require("./swagger"),
};
