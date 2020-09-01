import React, { useState, useEffect, useContext } from "react"
import AuthContext from "../../../context/Auth/AuthContext"
import GenreContext from "../../../context/Genre/GenreContext"
import { Loader } from "../../utils/Loader/Loader"
export const ManageGenre = () => {
  const [name, setName] = useState("")
  const authContext = useContext(AuthContext)
  const genreContext = useContext(GenreContext)
  const [userId, setUserId] = useState()
  const { addGenre, loading, error, genre } = genreContext
  const { user } = authContext
  const [msg, setMsg] = useState()
  useEffect(() => {
    console.log(msg)
  }, [])
  useEffect(() => {
    if (user) {
      setUserId(user._id)
    }
  }, [user])
  const onSubmit = async (e) => {
    e.preventDefault()
    addGenre(userId, name)
  }
  useEffect(() => {
    if (error) {
      setMsg({ data: error, type: "danger" })
    } else if (genre) {
      setMsg({ data: `${genre.name} successfully added!`, type: "success" })
    }
    setTimeout(() => {
      setMsg(null)
    }, 5000)
  }, [genre, error])
  return (
    <>
      {loading ? <Loader /> : null}
      <div className="container" style={{ marginTop: "100px" }}>
        {console.log(msg)}
        {msg ? (
          <div
            class={`alert alert-${msg.type}`}
            role="alert"
            style={{ marginBottom: "25px" }}
          >
            <strong>{msg.data}</strong>
          </div>
        ) : null}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              autoComplete="off"
              type="text"
              onChange={(e) => {
                setName(e.target.value)
                setMsg("")
              }}
              className="form-control"
              id="name"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  )
}
