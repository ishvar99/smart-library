import React, { useContext, useState, useEffect } from "react"
import axios from "axios"
import AuthContext from "../../../context/Auth/AuthContext"
export const AddBook = () => {
  const context = useContext(AuthContext)
  const { user } = context
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [genre, setGenre] = useState()
  const [bookCover, setBookCover] = useState("")
  const [userId, setUserId] = useState()
  useEffect(() => {
    if (user) {
      console.log(user._id)
      setUserId(user._id)
    }
  }, [user])
  async function addBook(e) {
    e.preventDefault()
    let fd = new FormData()
    fd.append("title", title)
    fd.append("description", description)
    fd.append("genre", genre)
    fd.append("bookcover", bookCover)

    try {
      const response = await axios.post(`/api/v1/book/create/${userId}`, fd, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="container">
      <form onSubmit={addBook} enctype="multipart/form-data">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            id="title"
          />
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea
            class="form-control"
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            rows="3"
          ></textarea>
        </div>
        <div class="form-group">
          <select
            class="form-control"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>Mystery</option>
            <option>Horror</option>
            <option>Sci-fi</option>
            <option>Fiction</option>
            <option>Fantasy</option>
          </select>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Choose Image</label>
          <div class="col-sm-10">
            <input
              class="form-control"
              accept="image/*"
              type="file"
              name="bookcover"
              onChange={(e) => setBookCover(e.target.files[0])}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}
