const dbc = require("../database");
const db = dbc.getDB();

// Controller pour l'ajout d'un like
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

// Controller pour l'annulation d'un like
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

// Controller pour l'affichage du nombre de likes par post 
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

// Controller pour que l'utilisateur like une seule fois un post
exports.selectLike = (req, res, next) => {
  const likeId = req.params.id;

  let numblike = `SELECT user_id FROM postlike WHERE post_id = '${likeId}'`;

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