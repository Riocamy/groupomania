const express = require('express');
const router = express.Router();
const auth =  require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const likeCtrl = require('../controllers/like')
const postCtrl = require('../controllers/post')

//Routes pour les posts
router.get('/getAll', auth, postCtrl.allPublish);
router.post('/publish/:id',auth, multer, postCtrl.publish);
router.delete('/delete/:idPost/:id',auth, postCtrl.deletePublish);

//Routes pour les likes
router.get("/", auth, likeCtrl.numberlike);
router.get("/:id", auth, likeCtrl.selectLike);
router.post('/:id', auth, likeCtrl.like);
router.delete('/deletelike/:id/:postId', auth, likeCtrl.dislike);

module.exports = router;