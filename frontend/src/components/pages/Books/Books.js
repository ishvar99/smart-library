import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
export const Books = ({ match }) => {
  const [books, setBooks] = useState()
  useEffect(() => {
    async function loadBooks() {
      const response = await axios.get(`/api/v1/books/${match.params.type}`)
      console.log(response.data)
      setBooks(response.data)
    }
    loadBooks()
  }, [])

  return (
    <div className="d-flex flex-wrap mt-5 ">
      {books ? (
        books.length !== 0 ? (
          books.map((item, i) => {
            return (
              <div key={i} className="m-auto">
                <div
                  class="card mb-4 p-4"
                  style={{ width: "18rem", height: "18rem" }}
                >
                  <img src={item.bookCover} class="card-img-top" alt="" />
                  <div class="card-body">
                    <p class="card-text" style={{ textAlign: "center" }}>
                      <Link to={`/book/${item._id}`} className="nav-link">
                        {item.title}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <h1>No Books to Display</h1>
        )
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}
