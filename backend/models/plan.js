const mongoose = require("mongoose")

const planSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: 32,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
      trim: true,
      required: true,
    },
    validity: {
      type: Number,
      time: true,
      required: true,
    },
    benefits: {
      type: [String],
      default: [],
    },
    type: {
      type: String,
      // 3 types
      // Weekly,
      // montly,
      // yearly
    },
  },
  { timestamps: true } //it gives the timestamp of the creation}
)

module.exports = mongoose.model("Plan", planSchema)
