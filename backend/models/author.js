const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    min: 3,
  },
  about: {
    type: String,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
  },
  nickname: {
    type: String,
    trim: true,
  },
  origin: {
    //country
    type: String,
    required: true,
    trim: true,
  },
  books: [
    {
      type: ObjectId,
      ref: "Book",
    },
  ],
})

module.exports = mongoose.model("Author", authorSchema)
