const Book = require("../models/book")

// middleware for req.book
exports.getBookByID = (req, res, next, id) => {
  Book.findById(id).exec((err, book) => {
    if (err) {
      return res.status(400).json({
        error: "An error occured... Unable to find",
      })
    }
    if (!book) {
      return res.status(400).json({
        error: "Book not found!",
      })
    }
    req.book = book
  })
}

// get book route
exports.getBook = (req, res) => {
  return res.json(req.book)
}
