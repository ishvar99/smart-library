const asyncHandler = require("./asyncHandler")
const User = require("../models/user")
const ErrorResponse = require("../utils/errorResponse")
const jwt = require("jsonwebtoken")

exports.isLoggedin = asyncHandler(async (req, res, next) => {
  let token = req.cookies["token"]
  if (!token) {
    return next(new ErrorResponse("Login Failed!", 401))
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.currentUser = await User.findById(decoded.id)
    next()
  } catch (error) {
    return next(new ErrorResponse("Login Failed!", 401))
  }
})

// middleware - is user Authenticated to edit details

exports.isAuthenticated = (req, res, next) => {
  // console.log(req.currentUser)
  // console.log(req.foundUser)

  let checkAuth =
    req.currentUser && req.foundUser && req.foundUser.id == req.currentUser.id

  // console.log(checkAuth)
  if (!checkAuth) {
    return res.status(403).json({
      error: "Authentication failed",
    })
  }
  next()
}

// middleware for isAdmin
exports.isAdmin = (req, res, next) => {
  console.log(req.foundUser.role)

  if (req.foundUser.role === 0 || req.foundUser.role === 1) {
    return res.status(403).json({
      error: "Access Denied! No admin creds found",
    })
  }
  next()
}
