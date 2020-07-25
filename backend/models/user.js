const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      min: 3,
      required: [true, 'Please provide a name'],
    },
    age: {
      type: Number,
      trim: true,
      required: [true, 'Please provide an age'],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
      required: [true, 'Please provide an email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password should be atleast 6 characters'],
      select: false, //never returns password when we call user
    },
    role: {
      type: Number,
      default: 0,
      // 0 - simple user - reader
      // 1 - author /
      // 2 - admin / superuser
    },
    userdetails: {
      type: String,
      trim: true,
    },
    transactions: {
      type: Array,
      default: [],
    },
    plan: {
      type: Number,
      default: 0,
      // 0 - free plan,
      // 1 - basic plan,
      // 2 - premium plan
    },
  },
  { timestamps: true }
);
userSchema.pre('save', async function (next) {
  const user = this;
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});
userSchema.methods.getSignedJwtToken = function () {
  const user = this;
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
userSchema.methods.comparePasswords = async function (plainPassword) {
  const user = this;
  return await bcrypt.compare(plainPassword, user.password);
};
module.exports = mongoose.model('User', userSchema);
