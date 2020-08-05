const Genre = require("../models/genre")
const ErrorResponse = require("../utils/errorResponse")

// middleware to access req.genre

exports.getGenreByID = (req, res, next, id) => {
  Genre.findById(id).exec((err, genre) => {
    if (err) {
      return new ErrorResponse("An error occured! - Genre not found", 400)
    }
    res.genre = genre
    next()
  })
}

exports.createGenre = (req, res) => {
  let newGenre = new Genre(req.body)
  newGenre.save((err, genre) => {
    if (err) {
      return res.status(400).json({ error: "Error saving into the database!" })
    }
    res.json(genre)
  })
}

exports.getAllGenres = (req, res) => {
  Genre.find().exec((err, genres) => {
    if (err) {
      return new ErrorResponse("Error occured", 400)
    }
    res.json(genres)
  })
}
