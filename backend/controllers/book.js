const Book = require("../models/book")
const Genre = require("../models/genre")
// const formidable = require("formidable")
const fs = require("fs")

// middleware for req.book
exports.getBookByID = async (req, res, next, id) => {
  try {
    const book = await Book.findById(id).populate("genre")
    if (!book) {
      return res.status(400).json({
        error: "Book not found!",
      })
    }
    req.book = book
    next()
  } catch (error) {
    return res.status(400).json({
      error: "An error occured... Unable to find",
    })
  }
}

// get book route
exports.getBook = (req, res) => {
  return res.json(req.book)
}

exports.createBook = async (req, res, next) => {
  const { title, description, genre } = req.body
  let bookGenres = []
  const parsedGenre = JSON.parse(genre)
  const url = req.protocol + "://" + req.get("host")
  const response = await Genre.find({ name: { $in: parsedGenre } })
  if (!title || !description) {
    return res.status(400).json({
      error: "Please provide all the relevant details",
    })
  }
  response.forEach((genre) => {
    bookGenres.push(genre._id)
  })
  let bookCover = url + "/resources/" + req.file.filename
  Book.create(
    { title, description, genre: bookGenres, bookCover },
    (err, book) => {
      if (err) {
        return res.status(400).json({
          error: "An error occured! Please try again!",
        })
      }
      res.json(book)
    }
  )
}
exports.getBooksByGenre = async (req, res) => {
  console.log(req.genre)
  let books = await Book.find().populate("genre").exec()
  books = books.filter((item) => {
    return item.genre.filter((e) => e.name === req.params.type).length > 0
  })
  res.json(books)
}
exports.deleteBook = (req, res) => {
  const book = req.book
  book.remove((err, deletedBook) => {
    if (err) {
      return res.status(400).json({
        error: "Error occured while deleting the book",
      })
    }
    res.json({
      message: "The book has been successfully removed",
      deletedBook,
    })
  })
}

exports.getAllBooks = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6 // default limit set to 12
  let sortBy = req.query.sort ? req.query.sort : { name: 1 } // will sort alphabetical by book name

  Book.find()
    .populate("genre user")
    .limit(limit)
    .sort(sortBy)
    .exec((err, books) => {
      if (err) {
        return res.status(400).json({
          error: "An error occured! Please try again after sometime",
        })
      }
      res.json(books)
    })
}

exports.getBookByAuthorName = (req, res) => {
  const author = req.user
  Book.find()
    .populate("user")
    .exec((err, books) => {
      if (err) {
        return res.status(400).json({
          error: "An error occured! Please try again after sometime",
        })
      }
      const searchResult = books.map((book) => {
        return book.user.filter((obj) => obj.name === author.name)
      })
      res.json(searchResult)
    })
}
