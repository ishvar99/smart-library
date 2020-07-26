const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    max: 2000,
    required: true,
  },
  genre: [
    {
      type: ObjectId,
      ref: "Genre",
    },
  ],

  rating: [
    {
      value: {
        type: Number,
        min: 0,
        max: 10,
      },
      givenBy: {
        type: ObjectId,
        ref: "User",
      },
    },
  ],
  comment: [
    {
      text: {
        type: String,
        max: 100,
      },
      postedby: {
        type: ObjectId,
        ref: "User",
      },
    },
  ],
})

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
  books: [BookSchema],
})

module.exports = mongoose.model("Author", authorSchema)
