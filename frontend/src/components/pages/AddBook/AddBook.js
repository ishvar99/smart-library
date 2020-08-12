import React, { useContext, useState, useEffect } from "react"
import axios from "axios"
import AuthContext from "../../../context/Auth/AuthContext"
import Loading from "../../utils/Loading/Loading.jsx"
import { useHistory } from "react-router-dom"
export const AddBook = () => {
  const context = useContext(AuthContext)
  const { user } = context
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [bookCover, setBookCover] = useState("")
  const [userId, setUserId] = useState()
  const [genresList, setGenresList] = useState([])
  useEffect(() => {
    async function loadGenres() {
      const response = await axios.get("/api/v1/genres")
      setGenresList(response.data)
    }
    loadGenres()
  }, [])
  useEffect(() => {
    if (user) {
      console.log(user._id)
      setUserId(user._id)
    }
  }, [user])
  async function addBook(e) {
    e.preventDefault()
    let arr = []
    document
      .querySelectorAll("#form-check input[type=checkbox]:checked")
      .forEach((val) => {
        arr.push(val.value)
      })
    let fd = new FormData()
    fd.append("title", title)
    fd.append("description", description)
    fd.append("genre", JSON.stringify(arr))
    fd.append("bookcover", bookCover)

    try {
      setLoading(true)
      await axios.post(`/api/v1/book/create/${userId}`, fd, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      setLoading(false)
      history.push("/")
    } catch (e) {
      setLoading(false)
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
          {genresList.map((e, i) => (
            <div class="form-check" id="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id={e.name}
                value={e.name}
              />
              <label class="form-check-label">
                {e.name.slice(0, 1).toUpperCase() + e.name.slice(1)}
              </label>
            </div>
          ))}

          {/* <select
            class="form-control"
            onChange={(e) => setGenre(e.target.value)}
          >
            {genresList.map((e, i) => (
              <option key={i} value={e.name}>
                {e.name}
              </option>
            ))}
          </select> */}
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

        <button
          type="submit"
          className="btn btn-primary"
          style={{ opacity: loading ? "0.7" : "1" }}
        >
          {loading ? <Loading /> : "Submit"}
        </button>
      </form>
    </div>
  )
}
