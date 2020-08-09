const Genre = require("../models/genre")

// middleware to access req.genre

exports.getGenreByID = (req, res, next, id) => {
  Genre.findById(id).exec((err, genre) => {
    if (err) {
      return res.status(400).json({
        error: "An error occured! - Genre not found",
      })
    }
    req.genre = genre
    next()
  })
}

exports.getGenre = (req, res) => {
  return res.json(req.genre)
}

exports.createGenre = (req, res) => {
  let newGenre = new Genre(req.body)
  newGenre.save((err, genre) => {
    if (err) {
      return res.status(400).json({
        error: "Error saving into the database!",
      })
    }
    return res.json(genre)
  })
}

exports.updateGenre = (req, res) => {
  Genre.findOneAndUpdate(
    { _id: req.genre._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, updatedGenre) => {
      if (err) {
        return res.status(400).json({
          error: "Error! updating genre",
        })
      }
      return res.json(updatedGenre)
    }
  )
}

exports.getAllGenres = (req, res) => {
  Genre.find().exec((err, genres) => {
    if (err) {
      return res.status(400).json({
        error: "Error occured",
      })
    }
    return res.json(genres)
  })
}

exports.deleteGenre = (req, res) => {
  const genre = req.genre
  genre.remove((err, deletedGenre) => {
    if (err) {
      return res.status(400).json({
        error: "Error occured while deleting",
      })
    }
    res.json(
      {
        message: "Deleted successfully",
      },
      deletedGenre
    )
  })
}
