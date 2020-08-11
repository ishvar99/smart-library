import React, { useEffect, useState } from "react"
import "./trending.scss"
import axios from "axios"
import { Link } from "react-router-dom"

export const Trending = () => {
  const [genresList, setGenresList] = useState([])
  useEffect(() => {
    async function loadGenres() {
      const response = await axios.get("/api/v1/genres")
      console.log(response.data)
      setGenresList(response.data)
    }
    loadGenres()
  }, [])
  return (
    <div className="Trending">
      <div className="section-title">
        <h4>Treadings</h4>
        <h6>Explore</h6>
      </div>
      <div className="main-wrapper">
        {genresList.map((item, i) => {
          return (
            <div key={i} className="book-wrapper">
              <div class="card" style={{ width: "18rem" }}>
                <div class="card-body">
                  <p class="card-text">
                    <Link to={`/books/${item.name}`} className="nav-link">
                      {item.name}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
