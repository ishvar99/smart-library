const mongoose = require("mongoose")

const genreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 32,
      unique: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Genre", genreSchema)
