const User = require("../models/user")
const ErrorResponse = require("../utils/errorResponse")

exports.getUserByID = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err) {
      return ErrorResponse("An error occured", 400)
    }
    if (!user) {
      return ErrorResponse("User not found", 422)
    }
    req.userData = user
    next()
  })
}

exports.getUser = (req, res) => {
  req.userData.password = undefined
  return res.json(req.userData)
}

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.userData._id },
    { $set: req.body },
    { useFindAndModify: false, new: true },
    (err, user) => {
      if (err || !user) {
        return ErrorResponse("An error occured,  try again later", 400)
      }
      user.password = undefined
      return res.json(user)
    }
  )
}
