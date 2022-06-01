// Import des packages nécessaires à la création de l'API
const express = require('express');

// Utilisation du framework Express
const app = express();

// Import des packages
const bodyParser = require('body-parser'); // parse automatiquement les requêtes en JSON
const cookieParser = require("cookie-parser"); // parse automatiquement les cookies
const helmet = require("helmet"); // sécurisation des injections et en-tête http
const path = require('path'); // met en place le chemin d'accès à un fichier téléchargé par l'utilisateur

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

// Middleware de téléchargement de fichiers (images des posts)
app.use('/images', express.static(path.join(__dirname, 'images')));

// Intégration des packages
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

/**** Mise en place des routes ****/

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', comRoutes);
app.use('/api/like', postRoutes);

module.exports = app;