import React, { useContext, useState, useEffect } from "react"
import AuthContext from "../../../context/Auth/AuthContext"
import BookContext from "../../../context/Book/BookContext"
import GenreContext from "../../../context/Genre/GenreContext"
import { Loader } from "../../utils/Loader/Loader"
export const AddBook = () => {
  const authContext = useContext(AuthContext)
  const bookContext = useContext(BookContext)
  const genreContext = useContext(GenreContext)
  const { user } = authContext
  const { fetchGenres, genres } = genreContext
  const genreLoading = genreContext.loading
  const { loading, addBook, error, book } = bookContext
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [bookCover, setBookCover] = useState("")
  const [userId, setUserId] = useState()
  const [msg, setMsg] = useState()
  const [genresList, setGenresList] = useState([])
  useEffect(() => {
    if (genres) {
      setGenresList(genres)
    }
  }, [genres])
  useEffect(() => {
    if (error) {
      setMsg({ data: error, type: "danger" })
    } else if (book) {
      setMsg({ data: `${book.title} successfully added!`, type: "success" })
    }
    setTimeout(() => {
      setMsg("")
    }, 5000)
  }, [book, error])
  useEffect(() => {
    async function loadGenres() {
      await fetchGenres()
    }
    loadGenres()
  }, [])
  useEffect(() => {
    if (user) {
      setUserId(user._id)
    }
  }, [user])
  const submit = async (e) => {
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
    await addBook(userId, fd)
  }
  return (
    <>
      {loading || genreLoading ? <Loader /> : null}
      <div className="container" style={{ marginTop: "50px" }}>
        {msg ? (
          <div
            class={`alert alert-${msg.type}`}
            role="alert"
            style={{ marginBottom: "25px" }}
          >
            <strong>{msg.data}</strong>
          </div>
        ) : null}

        <form onSubmit={submit} enctype="multipart/form-data">
          <div className="form-group">
            <label>Title</label>
            <input
              required
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              id="title"
            />
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea
              required
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
            Add Book
          </button>
        </form>
      </div>
    </>
  )
}
