const express = require("express")
const {
  registerUser,
  loginUser,
  getMe,
  forgotPassword,
  logoutUser,
  confirmUser,
  resetPassword,
} = require("../controllers/auth")
const { isLoggedin } = require("../middlewares/protect")
const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/me").get(isLoggedin, getMe)
router.route("/forgotpassword").post(forgotPassword)
router.route("/logout").get(isLoggedin, logoutUser)
router.route("/confirmation/:token").get(confirmUser)
router.route("/resetpassword/:token").put(resetPassword)
module.exports = router
