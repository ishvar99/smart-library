const express = require("express")
const { getUserByID } = require("../controllers/user")
const { getGenreByID } = require("../controllers/genre")
const { getBookByID, getBook } = require("../controllers/book")
const router = express.Router()

// params
router.param("userID", getUserByID)
router.param("genreID", getGenreByID)
router.param("bookID", getBookByID)

//routes
router.get("/book/:bookID", getBook)

module.exports = router
