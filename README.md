# Groupomania

Projet 7 de la formation de Développeur web d'OpenClassrooms ! La mission consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues.

## Technologies
- React JS
- Node JS et Express
- MySQL

## Installation du projet

**Frontend**

Ouvrir le dossier "Frontend" dans le terminal de votre éditeur puis exécuter la commande:

```shell
yarn install
```

puis

```shell
yarn start
```

Si le navigateur ne s'ouvre pas automatiquement allez à :

- http://localhost:3000/

**Backend**

Ouvrir le dossier "Backend" dans le terminal de votre éditeur puis exécuter la commande:

```shell
yarn install
```

Puis

```shell
nodemon server
```

**Base de données**

Se connecter au serveur MySql de votre choix. Exécuter la commande:

```shell
CREATE DATABASE groupomania;
```

Importer le fichier "datas.sql" (ou "schema.sql" si vous souhaitez seulement utiliser le schéma de données) :

```shell
mysql -u root -p groupomania < /path/to/datas.sql
```

Important : il faut remplacer "/path/to/datas.sql" par le chemin du fichier dans votre machine. Par exemple :

```shell
mysql -u root -p groupomania < /Utilisateurs/sebastien/Bureau/datas.sql
```

Entrez votre mot de passe.

Si nécessaire, rendez-vous dans le fichier "database.js" du backend et remplacez le mot de passe par le votre.

**Compte administrateur**

Un compte administrateur a été crée à l'adresse de la chargée de communication de Groupomania et prêt à l'emploi, vous trouverez les identifiants dans le fichier "adminitrateur-login.txt".
