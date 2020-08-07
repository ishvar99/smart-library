const express = require("express")
const { getUserByID } = require("../controllers/user")
const { getGenreByID } = require("../controllers/genre")
const {
  getBookByID,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/book")
const {
  isLoggedin,
  isAuthenticated,
  isAdmin,
} = require("../middlewares/protect")
const router = express.Router()

// params
router.param("userID", getUserByID)
router.param("genreID", getGenreByID)
router.param("bookID", getBookByID)

//routes
router.get("/book/:bookID", getBook)

router.post(
  "/book/create/:userID",
  isLoggedin,
  isAuthenticated,
  isAdmin,
  createBook
)

router.delete(
  "/book/:bookID/remove/:userID",
  isLoggedin,
  isAuthenticated,
  isAdmin,
  deleteBook
)

module.exports = router
