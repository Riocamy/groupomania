// Import des packages nécessaires à la création de l'API
const express = require('express');

// Utilisation du framework Express
const app = express();

// Import du package body-parser (parse automatiquement les requêtes en JSON)
const bodyParser = require('body-parser');

// Import de cookie-parser
const cookieParser = require("cookie-parser");

// Pour mettre en place le chemin d'accès à un fichier téléchargé par l'utilisateur
const path = require('path');

// Import des routes
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const comRoutes =  require ('./routes/comment');

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

// Intégration de body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Intégration de cookie-parser
app.use(cookieParser());

// Middleware de téléchargement de fichiers (images des posts)
app.use('/images', express.static(path.join(__dirname, 'images')));

/**** Mise en place des routes ****/

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', comRoutes);
app.use('/api/like', postRoutes);

module.exports = app;