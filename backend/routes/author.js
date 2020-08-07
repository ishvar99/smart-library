const express = require("express")
const { route } = require("./auth")
const { getUserByID } = require("../controllers/user")
const { getBookByID } = require("../controllers/book")
const {
  getAuthor,
  getAuthorByID,
  createAuthor,
  getAuthorPicture,
} = require("../controllers/author")
const {
  isLoggedin,
  isAuthenticated,
  isAdmin,
} = require("../middlewares/protect")
const router = express.Router()

// params
router.param("userID", getUserByID)
router.param("bookID", getBookByID)
router.param("authorID", getAuthorByID)

//routes
router.get("/author/:authorID", getAuthor)
router.get("/author/picture/:authorID", getAuthorPicture)
router.get(
  "/author/create/:userID",
  isLoggedin,
  isAuthenticated,
  isAdmin,
  createAuthor
)

module.exports = router
