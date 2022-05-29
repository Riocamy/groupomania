const dbc = require("../database");
const db = dbc.getDB();

// Ajout d'un like
exports.like = (req, res, next) => {
  let postId = req.body.data;
  const user_id = req.params.id;

  let likePost = `INSERT INTO postlike (user_id, post_id) VALUES ('${user_id}', '${postId}')`;

  db.query(likePost, function(err, result) {
    if (err) {
      return res.status(404).json({
        message: "Like erreur"
      });
    } else {
      res.status(200).json({
        message: "Like valide !"
      });
    };
  })
}

// Annulation d'un like
exports.dislike = (req, res, next) => {
  const userId = req.params.id;
  const postId = req.params.postId

  let dislike = `DELETE postlike FROM postlike WHERE user_id='${userId}' AND post_id='${postId}' `;

  db.query(dislike, function(err, result) {
    if (err) {
      return res.status(404).json({
        message: "dislike erreur"
      });
    } else {
      res.status(200).json({
        message: "dislike valide !"
      });
    };
  })
}

// Affichage du nombre de likes par post 
exports.numberlike = (req, res, next) => {
  let numblike = `SELECT COUNT(postlike.post_id) AS Nblike, post_id, user_id, idlike FROM postlike GROUP BY post_id`;

  db.query(numblike, function(err, result) {
    if (err) {
      return res.status(404).json({
        message: "dislike erreur"
      });
    } else {
      res.status(200).json({
        result
      });
    };
  })
}