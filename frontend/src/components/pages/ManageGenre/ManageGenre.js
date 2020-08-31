import React, { useState, useEffect, useContext } from "react"
import AuthContext from "../../../context/Auth/AuthContext"
import GenreContext from "../../../context/Genre/GenreContext"
import { Loader } from "../../utils/Loader/Loader"
export const ManageGenre = () => {
  const [name, setName] = useState("")
  const authContext = useContext(AuthContext)
  const genreContext = useContext(GenreContext)
  const [userId, setUserId] = useState()
  const { addGenre, loading, error } = genreContext
  const { user } = authContext
  useEffect(() => {
    if (user) {
      setUserId(user._id)
    }
  }, [user])
  const onSubmit = async (e) => {
    e.preventDefault()
    addGenre(userId, name)
  }

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="container">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
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
