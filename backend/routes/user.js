// Import d'Express
const express = require('express');
const router = express.Router();

// Import des middlewares et controllers
const userCtrl = require('../controllers/user');
const img = require('../controllers/image');
const auth =  require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const limitTry = require ('../middlewares/limit'); 
const validEmail = require('../middlewares/email');
const validPass = require('../middlewares/password');

// Creation des routes utilisateur sécurisées
router.put('/update/:id', userCtrl.update);
router.delete('/delete/:id', userCtrl.delete); 
router.get('/profile/:id', auth, userCtrl.getOneUser);
router.post('/image/:id',multer, auth, img.uploadImage);
router.post('/signup',validEmail, validPass, userCtrl.signup);
router.post('/login',validEmail, validPass, limitTry.limiter, userCtrl.login);

// Export et explotation des routes
module.exports = router;