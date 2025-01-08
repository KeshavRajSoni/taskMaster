//packages
const express = require('express')
//controllers
const userController = require('../../controllers/user/userController');
const authController = require('../../controllers/auth/authController');


//initaile work
const router = express.Router({ mergeParams: true });

//routes

//unprotected routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);

//protected routes
router.use(authController.protect);


//resticted routes
router.use(authController.restrictTo('admin'));

router.get('/users', userController.getAllUsers);
router.get('/users/:userId', userController.getUser);



//final work
module.exports = router;