import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
export const Books = ({ match }) => {
  const [books, setBooks] = useState([])
  useEffect(() => {
    async function loadBooks() {
      const response = await axios.get(`/api/v1/books/${match.params.type}`)
      console.log(response.data)
      setBooks(response.data)
    }
    loadBooks()
  }, [])

  return (
    <div className="main-wrapper">
      {books.map((item, i) => {
        return (
          <div key={i} className="book-wrapper">
            <div class="card" style={{ width: "18rem" }}>
              <div class="card-body">
                <p class="card-text">
                  <Link to={`/book/${item._id}`} className="nav-link">
                    {item.title}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
