// importer des packages nécessaires à la mise en place du serveur
const http = require('http');
const app = require('./app');
const dotenv = require("dotenv");
require('dotenv').config();

// Fonction pour s'assurer que le port fourni est  de type number
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

const port = normalizePort(process.env.MY_PORT);

// Parametrage du port avec la méthodes set de Express
app.set('port', port);

// Fonction pour rechercher et gérer les différentes erreurs
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

// Ecoute des ports l'ordinateur et éxécution du serveur
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
});

server.listen(port);