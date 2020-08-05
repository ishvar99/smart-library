const express = require("express")
const { getUserByID } = require("../controllers/user")
const {
  getGenreByID,
  createGenre,
  getAllGenres,
  updateGenre,
  deleteGenre,
  getGenre,
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

// get genre
router.get("/genre/:genreID", getGenre)

// get all genres
router.get("/genres", getAllGenres)

//update genre name
router.put(
  "/genre/:genreID/update/:userID",
  isLoggedin,
  isAuthenticated,
  isAdmin,
  updateGenre
)

//delete genre
router.delete(
  "/genre/:genreID/delete/:userID",
  isLoggedin,
  isAuthenticated,
  isAdmin,
  deleteGenre
)

module.exports = router
