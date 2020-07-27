// Utility to delete particular database collections
const dotenv = require('dotenv').config();
require('colors');
const User = require('./backend/models/user');
const mongoose = require('mongoose');

mongoose.connect(process.env.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
});

const destroyData = async () => {
  try {
    await User.deleteMany({});
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  console.log('Invalid Request'.red.inverse);
  process.exit();
}
