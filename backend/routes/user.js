const express = require("express")
const { getUserByID, getUser, updateUser } = require("../controllers/user")
const { isLoggedin, isAuthenticated } = require("../middlewares/protect")
const router = express.Router()

router.param("userID", getUserByID)
router.get("/user/:userID", isLoggedin, isAuthenticated, getUser)
router.put("/user/:userID", isLoggedin, isAuthenticated, updateUser)

module.exports = router
