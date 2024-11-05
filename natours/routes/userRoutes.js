const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.get('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.get('/logout', authController.logout);
router.get('/callback', authController.callback);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protectRoutes);

router.patch('/updatePassword', authController.updatePassword);
router.delete('/deleteMe', userController.deleteMe);
router.get('/userinfo', authController.usersInfo);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
