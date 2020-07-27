const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse'); //custom error response
const asyncHandler = require('../middlewares/asyncHandler'); //avoid using try and catch
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const { sendEmail } = require('../utils/sendEmail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
templates = {
  confirm_account: process.env.CONFIRM_ACCOUNT_TEMPLATE_ID,
  reset_password: process.env.RESET_PASSWORD_TEMPLATE_ID,
};
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
// @desc    Register User
// @route   POST /api/v1/auth/register
// @access  public

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, age, email, password } = req.body;
  const user = await User.create({ name, age, email, password });
  jwt.sign(
    { id: user._id },
    process.env.EMAIL_SECRET,
    {
      expiresIn: process.env.EMAIL_EXPIRE,
    },
    (err, emailToken) => {
      const url = `${req.protocol}://${req.get(
        'host'
      )}/api/v1/auth/confirmation/${emailToken}`;
      sendEmail(url, user, process.env.CONFIRM_ACCOUNT);
    }
  );
  sendTokenResponse(user, 200, res);
});

// @desc    Login User
// @route   POST /api/v1/auth/login
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

// @desc    Get User
// @route   GET /api/v1/auth/me
// @access  private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  return res.status(200).json({ success: true, data: user });
});

// @desc    Logout User
// @route   GET /api/v1/auth/logout
// @access  private
exports.logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie('token');
  return res.status(200).json({ success: true });
});

// @desc    Forgot Password
// @route   GET /api/v1/auth/me
// @access  private
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorResponse("email doesn't exists"));
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const url = `${req.protocol}://${req.get(
    'host'
  )}/api/auth/v1/resetpassword/${resetToken}`;
  try {
    await sendEmail(url, user, process.env.RESET_PASSWORD);
  } catch (err) {
    user.getResetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorResponse('failed to send reset password mail', 500));
  }

  return res.status(200).json({ success: true, data: user });
});
exports.confirmUser = asyncHandler(async (req, res, next) => {
  const decoded = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
  await User.findByIdAndUpdate(decoded.id, { confirmed: true }, { new: true });
  res.json({ success: true, msg: 'account verified' });
  // return res.redirect('/');
});
