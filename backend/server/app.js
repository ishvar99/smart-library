require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
require('colors');
const app = express();
const PORT = process.env.PORT;
const morgan = require('morgan');
const errorHandler = require('../middlewares/error');
const authRoutes = require('../routes/auth');
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}
const connectDB = require('../database/db');
connectDB();
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/auth', authRoutes);
app.use(errorHandler);
const server = app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on PORT ${PORT}`.bold
  );
});
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`.red);
  //close and exit server
  server.close(() => process.exit(1));
});
