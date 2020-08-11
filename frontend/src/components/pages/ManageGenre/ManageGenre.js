import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
import AuthContext from "../../../context/Auth/AuthContext"
export const ManageGenre = () => {
  const [name, setName] = useState("")
  const context = useContext(AuthContext)
  const [userId, setUserId] = useState()
  const { user } = context
  useEffect(() => {
    if (user) {
      console.log(user._id)
      setUserId(user._id)
    }
  }, [user])
  const addGenre = (e) => {
    e.preventDefault()
    axios.post(`/api/v1/genre/create/${userId}`, JSON.stringify({ name }), {
      headers: {
        "Content-Type": "application/json",
      },
    })
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}
