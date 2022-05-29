// Import de la base de données
const dbc = require("../database");
const db = dbc.getDB();

// Affichage du commentaire
exports.comment = (req, res, next) => {
  const user_id = req.params.id;
  const name = req.body.data.pseudo;
  const message = req.body.data.message;
  const post_id = req.body.data.idPost;

  let sqlComment = `INSERT INTO comment ( user_id, message, user_name, post_id ) VALUES ( '${user_id}', '${message}', '${name}', '${post_id}' )`;

  db.query(sqlComment, function(err, result) {
    if (err) {
      return res.status(404).json({
        message: "Commentaire erreur"
      });
    };
    res.status(200).json({
      message: "Commentaire valide !"
    });
  });
}

// Suppression d'un comentaire 
exports.delete = (req, res, next) => {
  let com_id = req.params.idCom;
  let user_id = req.params.id;
  // Récupération de l'userId
  let sqlAdmin = `SELECT Admin FROM users WHERE id = '${user_id}'`;
  db.query(sqlAdmin, (err, result) => {
    let admin = result[0].Admin;
    let sqlCheck = `SELECT user_id FROM comment WHERE id_com='${com_id}'`;
    // Comparaison avec l'utilisateur voulant supprimer le commentaire
    db.query(sqlCheck, (err, result) => {
      // Si l'utilisateur est différent
      if (admin == null && result[0].user_id != user_id) {
        return res.status(404).json({
          message: "Supression non authorisée"
        });
      } else { // S'il est identique
        let sqlDelete = `DELETE FROM comment WHERE id_com ='${com_id}'`;
        db.query(sqlDelete, (err, result) => {
          if (err) {
            return res.status(404).json({
              message: "Suppression erreur "
            });
          };
          res.status(200).json({
            message: "Commentaire suprimé !"
          });
        })
      }
    })
  })
}

// Affichage de tous les commentaires
exports.allComment = (req, res, next) => {
  const sqlAll = `SELECT comment.id_com AS id_com,comment.user_id AS u_id,comment.message AS message_com, user_name,post_id FROM comment JOIN post ON (post.id = comment.post_id) WHERE post_id ORDER BY date DESC`
  db.query(sqlAll, (err, result) => {
    if (err) {
      return res.status(404).json({
        message: "tous les commentaires erreur"
      });
    } else {
      return res.status(200).json(
        result
      );
    }
  })
}