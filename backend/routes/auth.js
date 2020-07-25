const express = require('express');
const {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
} = require('../controllers/auth');
const { protect } = require('../middlewares/protect');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/me').get(protect, getMe);
router.route('/logout').get(protect, logoutUser);

module.exports = router;
