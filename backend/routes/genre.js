const express = require("express")
const { getUserByID } = require("../controllers/user")
const {
  getGenreByID,
  createGenre,
  getAllGenres,
} = require("../controllers/genre")
const { route } = require("./auth")
const {
  isLoggedin,
  isAuthenticated,
  isAdmin,
} = require("../middlewares/protect")
const router = express.Router()

// param
router.param("userID", getUserByID)
router.param("genreID", getGenreByID)

// create genre route
router.post(
  "/genre/create/:userID",
  isLoggedin,
  isAuthenticated,
  isAdmin,
  createGenre
)

// get all genres
router.get("/genre/all", getAllGenres)

module.exports = router
