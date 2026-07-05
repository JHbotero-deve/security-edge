const jwt = require("../config/jwt");
// Importar servicio de auth aquí

exports.login = async (req, res) => {
  // Lógica de validación de credenciales
  res.status(200).json({ token: "ejemplo_token_jwt" });
};
