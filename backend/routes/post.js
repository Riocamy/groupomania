const express = require('express');
const router = express.Router();
const auth =  require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const likeCtrl = require('../controllers/like')
const postCtrl = require('../controllers/post')

// Routes pour les posts
router.get('/getAll', postCtrl.allPublish);
router.post('/publish/:id', auth, multer, postCtrl.publish);
router.delete('/delete/:idPost/:id', auth, postCtrl.deletePublish);

// Routes pour les likes
router.get("/", likeCtrl.numberlike);
router.get("/:id", likeCtrl.selectLike);
router.post('/:id', likeCtrl.like);
router.delete('/deletelike/:id/:postId', likeCtrl.dislike);

module.exports = router;