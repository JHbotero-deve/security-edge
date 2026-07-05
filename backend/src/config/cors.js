module.exports = {
  origin: process.env.ALLOWED_ORIGINS || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
