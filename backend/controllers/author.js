// const Author = require("../models/author")
// const formidable = require("formidable")
// const fs = require("fs")

// exports.getAuthorByID = (req, res, next, id) => {
//   Author.findById(id).exec((err, author) => {
//     if (err) {
//       return res.status(400).json({
//         error: "An error occrured! Author not found",
//       })
//     }
//     req.author = author
//     next()
//   })
// }

// // get author details
// exports.getAuthor = (req, res) => {
//   req.author.authorPicture = undefined
//   return res.json(req.author)
// }
// // get author picture
// exports.getAuthorPicture = (req, res, next) => {
//   if (req.author.authorPicture.data) {
//     res.set("Content-Type", req.author.authorPicture.contentType)
//     res.send(req.author.authorPicture.data)
//   }
//   next()
// }

// // create author
// exports.createAuthor = (req, res) => {
//   const form = new formidable.IncomingForm()
//   form.keepExtensions = true

//   form.parse(req, (err, fields, file) => {
//     if (err) {
//       return res.status(400).json({
//         error: "There might be an error with the file",
//       })
//     }

//     const { name, about, age, nickName, origin } = fields
//     if (!name || !about || !age || !nickName || !origin) {
//       return res.status(400).json({
//         errormsg: "Please provide all the relevant details",
//       })
//     }

//     let newAuthor = new Author(fields)

//     if (file.authorPicture) {
//       if (file.authorPicture > 2 * 1024 * 1024) {
//         return res.status(400).json({
//           errormsg: "File size is too big",
//         })
//       }
//       newAuthor.authorPicture.data = fs.readFileSync(file.authorPicture.path)
//       newAuthor.authorPicture.contentType = file.authorPicture.type
//     }
//     newAuthor.save((err, author) => {
//       if (err) {
//         return res.status(400).json({
//           error: "An error occured! while saving author in database",
//         })
//       }
//       res.json(author)
//     })
//   })
// }

// exports.deleteAuthor = (req, res) => {
//   const author = req.author
//   author.remove((err, deletedAuthor) => {
//     if (err) {
//       return res.status(400).json({
//         error: "Error occured while deleting the author",
//       })
//     }
//     res.json({
//       message: "The Author has been successfully removed from db",
//       deletedAuthor,
//     })
//   })
// }
