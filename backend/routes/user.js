const express = require("express")
const { getUserByID, getUser, updateUser } = require("../controllers/user")
const router = express.Router()

router.param("userID", getUserByID)
router.get("/user/:userID", getUser)
router.put("/user/:userID", updateUser)

module.exports = router
