import React, { useEffect, useState } from "react"
import axios from "axios"
export const Book = ({ match }) => {
  const [book, setBook] = useState()
  useEffect(() => {
    async function loadBook() {
      const response = await axios.get(`/api/v1/book/${match.params.id}`)
      console.log(response.data.genre)
      setBook(response.data)
    }
    loadBook()
  }, [])
  return (
    <div>
      {book ? (
        <div class="card ml-auto mr-auto mt-5" style={{ width: "18rem" }}>
          <img src={book.bookCover} class="card-img-top" alt="" />
          <div class="card-body">
            <h5 class="card-title">{book.title}</h5>
            <p class="card-text">{book.description}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              Genre: {book.genre.map((e) => e.name + ",")}
            </li>
            <li class="list-group-item">Dapibus ac facilisis in</li>
            <li class="list-group-item">Vestibulum at eros</li>
          </ul>
          {/* <div class="card-body">
            <a href="#" class="card-link">
              Card link
            </a>
            <a href="#" class="card-link">
              Another link
            </a>
          </div> */}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  )
}
