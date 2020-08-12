import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import AuthContext from "../../../context/Auth/AuthContext"
import Loading from "../../utils/Loading/Loading.jsx"
export const ManageGenre = () => {
  const history = useHistory()
  const [name, setName] = useState("")
  const context = useContext(AuthContext)
  const [userId, setUserId] = useState()
  const [loading, setLoading] = useState(false)
  const { user } = context
  useEffect(() => {
    if (user) {
      console.log(user._id)
      setUserId(user._id)
    }
  }, [user])
  const addGenre = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await axios.post(
        `/api/v1/genre/create/${userId}`,
        JSON.stringify({ name: name.toLowerCase() }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      setLoading(false)
      history.push("/")
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <div className="container">
      <form onSubmit={addGenre}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            id="name"
          />
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
