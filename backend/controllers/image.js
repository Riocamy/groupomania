const {unlink} = require("fs");
const dbc = require("../database");
const db = dbc.getDB();

// Controller pour ajouter une image de profil
exports.uploadImage = (req, res, next) => {
  const id = req.params.id;
  if (req.file) {
    let sqlImage = `SELECT  imageUrl FROM users WHERE id='${id}' `;

    db.query(sqlImage, (err, result) => {
      if (err) {
        res.status(404).json({
          message: "Image erreur"
        });
      }
      if (result['0'].imageUrl === null) {
        console.log("next")
      } else {
        let filename = result['0'].imageUrl;
        let file = filename.slice(22);
        unlink(`${file}`, (err) => {
          if (err) return err;
        })
      }
    })
  }

  // Pour modifier une image de profil
  const image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  let sqlUpdate = `UPDATE users SET imageUrl= '${image}' WHERE id='${id}' `;

  db.query(sqlUpdate, (err, result) => {
    if (err) {
      return res.status(404).json({
        message: "Image erreur"
      });
    };
    res.status(200).json({
      message: "Image trouvée"
    });
  })
}