const User = require("../models/user")
const ErrorResponse = require("../utils/errorResponse")

// middle to get req.foundUser

exports.getUserByID = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err) {
      return next(new ErrorResponse("An error occured", 400))
    }
    if (!user) {
      return next(new ErrorResponse("User not found", 422))
    }
    req.foundUser = user
    next()
  })
}

// get route for getUser

exports.getUser = (req, res) => {
  req.foundUser.password = undefined
  return res.status(200).json(req.foundUser)
}

// put route for update user details

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.foundUser._id },
    { $set: req.body },
    { useFindAndModify: false, new: true },
    (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "An error occured,  try again later",
        })
      }
      user.password = undefined
      return res.json(user)
    }
  )
}
