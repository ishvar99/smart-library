const asyncHandler = require("./asyncHandler")
const User = require("../models/user")
const ErrorResponse = require("../utils/errorResponse")
const jwt = require("jsonwebtoken")

exports.isLoggedin = asyncHandler(async (req, res, next) => {
  let token = req.cookies["token"]
  if (!token) {
    return next(new ErrorResponse("Authentication Failed!", 401))
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.currentUser = await User.findById(decoded.id)
    next()
  } catch (error) {
    return next(new ErrorResponse("Authentication Failed!", 401))
  }
})

exports.isAuthenticated = (req, res, next) => {
  // console.log(req.currentUser)
  // console.log(req.foundUser)

  let checkAuth =
    req.currentUser && req.foundUser && req.foundUser.id == req.currentUser.id

  // console.log(checkAuth)
  if (!checkAuth) {
    return new ErrorResponse("Access Denied!", 403)
  }
  next()
}
