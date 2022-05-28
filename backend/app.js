// Import des packages nécessaires à la création de l'API
const express = require('express');

// Utilisation du framework Express
const app = express();

// Import des routes
const userRoutes = require('./routes/user');

/**** Intégration des Middlewares ****/

// Accès au cors de la requête
app.use(express.json());

// Ajout des Middlewares d'autorisations
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

/**** Mise en place des routes ****/

app.use('/api/user', userRoutes);

module.exports = app;