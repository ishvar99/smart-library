const express = require("express")
const { getUserByID } = require("../controllers/user")
const { getGenreByID } = require("../controllers/genre")
const multer = require("multer")
const path = require("path")
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "backend/public/uploads/")
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

var upload = multer({ storage: storage })
const {
  getBookByID,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  getBooksByGenre,
} = require("../controllers/book")
const {
  isLoggedin,
  isAuthenticated,
  isAdmin,
} = require("../middlewares/protect")
const router = express.Router()

// params
router.param("userID", getUserByID)
// router.param("genreID", getGenreByID)
router.param("bookID", getBookByID)

//routes
router.get("/book/:bookID", getBook)
router.get("/books/:type", getBooksByGenre)
// router.get("/book/cover/:bookID", getBookCover)
// router.get("/book/coverbg/:bookID", getBookCoverBg)

router.post(
  "/book/create/:userID",
  isLoggedin,
  isAuthenticated,
  upload.single("bookcover"),
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
