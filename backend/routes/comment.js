const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const comCtrl = require('../controllers/comment');

// Routes pour les commentaires
router.post('/:id', comCtrl.comment);
router.get('/all', comCtrl.allComment);
router.delete('/delete/:idCom/:id',auth, comCtrl.delete);

module.exports = router;