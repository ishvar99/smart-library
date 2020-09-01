import React, { useEffect, useState } from "react"
import "./trending.scss"
import axios from "axios"

export const Trending = () => {
  const [booksList, setBooksList] = useState([])
  useEffect(() => {
    async function loadBooks() {
      const response = await axios.get("/api/v1/books")
      console.log(response.data)
      setBooksList(response.data)
    }
    loadBooks()
  }, [])
  return (
    <div className="Trending">
      <div className="section-title">
        <h4>Treadings</h4>
        <h6>Explore</h6>
      </div>
      <div className="main-wrapper">
        {booksList.map((item, index) => {
          return (
            // <div key={i} className='book-wrapper'>
            //   <div class='card' style={{ width: "18rem" }}>
            //     <div class='card-body'>
            //       <p class='card-text'>
            //         <Link to={`/books/${item.name}`} className='nav-link'>
            //           {item.title}
            //           {item._id}
            //           {/* {item.name.slice(0, 1).toUpperCase() + item.name.slice(1)} */}
            //         </Link>
            //       </p>
            //     </div>
            //   </div>
            // </div>
            <div key={index} className="book-wrapper card border-0 shadow">
              <img className="book-img" src={item.bookCover} alt="book-cover" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
