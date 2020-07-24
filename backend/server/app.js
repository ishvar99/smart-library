const dotenv = require('dotenv').config();
const express = require('express');
require('colors');
const app = express();
const PORT = process.env.PORT;
const morgan = require('morgan');
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}
const connectDB = require('../database/db');
connectDB();
app.use(express.json());
app.get('/api',(req,res)=>{
res.json("WELCOME TO LIBRARY MANAGEMENT SYSTEM");
})
app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on PORT ${PORT}`.bold
  );
});