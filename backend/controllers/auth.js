const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse'); //custom error response
const asyncHandler = require('../middlewares/asyncHandler'); //avoid using try and catch

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
};
// @desc    Post Register User
// @route   GET /api/v1/auth/register
// @access  public

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, age, email, password } = req.body;
  console.log(name, age, email, password);
  const user = await User.create({ name, age, email, password });
  sendTokenResponse(user, 200, res);
});

// @desc    Post Login User
// @route   GET /api/v1/auth/login
// @access  public

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorResponse('Invalid Credentials', 401));
  }
  const match = await user.comparePasswords(password);
  if (!match) {
    return next(new ErrorResponse('Invalid Credentials', 401));
  }
  sendTokenResponse(user, 200, res);
});

// @desc    Get LoggedIn User
// @route   GET /api/v1/auth/me
// @access  private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  return res.status(200).json({ success: true, data: user });
});

// @desc    Get LogoutUser
// @route   GET /api/v1/auth/logout
// @access  private
exports.logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie('token');
  return res.status(200).json({ success: true });
});
