const express = require("express")
const { getUserByID, getUser, updateUser } = require("../controllers/user")
const { isLoggedin } = require("../middlewares/protect")
const router = express.Router()

router.param("userID", isLoggedin, getUserByID)
router.get("/user/:userID", isLoggedin, getUser)
router.put("/user/:userID", isLoggedin, updateUser)

module.exports = router
