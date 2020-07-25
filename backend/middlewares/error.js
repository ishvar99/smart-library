const ErrorResponse = require('../utils/errorResponse');
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  console.log(err.stack.red);
  // Mongoose Bad Object Id
  if (err.name === 'CastError') {
    let message = `Cannot find resource with id ${err.value}`;
    error = new ErrorResponse(message, 404);
    // Mongoose Duplicate Key
  } else if (err.code === 11000) {
    let message = 'Duplicate Key Error';
    error = new ErrorResponse(message, 400);
    // Mongoose Validation Error
  } else if (err.name === 'ValidationError') {
    let message = Object.values(err.errors).map((e) => e.message);
    error = new ErrorResponse(message, 400);
  }
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
