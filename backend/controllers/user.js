const bcrypt = require("bcrypt");
const dbc = require("../database");
const db = dbc.getDB();
const jwt = require("jsonwebtoken");
const fs = require("fs");
const dotenv = require("dotenv");
require('dotenv').config();

// Controller pour la création d'un compte utilisateur
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const password = hash
      const email = req.body.email;
      const pseudo = req.body.pseudo;
      
      let sqlSignup = `INSERT INTO users ( email, pseudo, password ) VALUES ( '${email}', '${pseudo}', '${password}' )`;

      db.query(sqlSignup, function(err, result) {
        if (err) {
          return res.status(404).json({
            message: "Signup erreur"
          });
        } else {
          res.status(200).json({
            message: "Compte créé !"
          });
        }
      });
    })
}

// Controller pour supprimer un compte
exports.delete = (req, res, next) => {
  const id = req.params.id;

  let sqlDelete = `DELETE FROM users WHERE id ='${id}'`;

  db.query(sqlDelete, (err, result) => {
    if (err) {
      return res.status(404).json({
        message: "Supression erreur"
      });
    } else {
      res.status(200).json({
        message: "Utilisateur suprimé !"
      });
    }
  })
}

// Controller pour modifier un compte
exports.update = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const password = hash;
      const profil = JSON.stringify(req.body);
      let email = req.body.email;
      const newProfil = profil.replace(/","/g, '",').replace(/":"/g, '="').replace('{"', '').replace('}', '').replace(/"/g, "'");
      let sqlUpdate = `UPDATE users SET ${newProfil}, password='${password}' WHERE email='${email}' `;

      db.query(sqlUpdate, (err, result) => {
        if (err) {
          return res.status(404).json({
            message: "Modification erreur"
          });
        } else {
          res.status(200).json({
            message: "Modification reussie"
          });
        }
      })
    })

  const id = req.params.id;
  let pseudo = req.body.pseudo;
  let sqlUserName = `UPDATE post SET name_poster ='${pseudo}' WHERE user_id ='${id}'`
  
  db.query(sqlUserName, (err, result) => {
    if (err) {
      console.log("not")
    } else {
      console.log("ok")
    }
  })
}

// Controller pour se connecter à un compte 
exports.login = (req, res, next) => {
  let password = req.body.password;
  let emailReq = req.body.email;
  let emailDb = `Select * FROM users WHERE email = '${emailReq}'`;
  db.query(emailDb, (err, result) => {
    if (err) {
      return res.status(404).json({
        message: "Identification erreur"
      });
    }
    if (result.length === 0) {
      return res
        .status(401)
        .json({
          error: "Identifiation ou mot de passe incorrect"
        });
    } else {
      bcrypt.compare(password, result[0].password)
      .then(valid => {
            if (!valid) {
              res.status(400).json({
                message: "Mot de passe invalide",
              })
            } else {
              res.status(200).json({
                pseudo: result['0'].pseudo,
                id: result['0'].id,
                token: jwt.sign({
                    id: result['0'].id
                  },
                  process.env.KEY_TOKEN, {
                    expiresIn: '24h'
                  })
              })
            }
        })
    }
  })
}

// Fonction pour afficher le profil de l'utilisateur
exports.getOneUser = (req, res, next) => {
  const id = req.params.id;

  const sqlGetUser = `SELECT email, pseudo, imageUrl, id, Emploi, Ville FROM users WHERE id = '${id}' `;
  db.query(sqlGetUser, [id], function(err, result) {
    if (err) {
      return res.status(404).json({
        message: "Affichage utilisateur erreur"
      });
    };
    if (result.length == 0) {
      return res.status(404).json({
        message: "Aucun utilisateur trouvé avec cet id"
      });
    }
    res.status(200).json(result);
  });
}