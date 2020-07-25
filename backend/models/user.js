const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      min: 3,
      required: true,
    },
    age: {
      type: Number,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    securepassword: {
      type: String,
      required: true,
      min: 3,
    },
    role: {
      type: Number,
      default: 0,
      // 0 - simple user - reader
      // 1 - staff /
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
)

module.exports = mongoose.model("User", userSchema)
