// Utulisation du package "limit rate express" pour limiter les tentatives de connexion
const limit = require("express-rate-limit")

// Mise en place des limitations
const limiter = limit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: "Compte bloqué 10 minutes, nombre d'essais 5 maximum",
  standardHeaders: true,
  legacyHeaders: false,
})

// Exploitation du limiteur
module.exports = {
  limiter
}