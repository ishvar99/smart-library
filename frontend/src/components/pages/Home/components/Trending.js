import React from "react"
import "./trending.scss"

export const Trending = ({ data }) => {
  return (
    <div className='Trending'>
      <div className='section-title'>
        <h4>Treadings</h4>
        <h6>Explore</h6>
      </div>
      <div className='main-wrapper'>
        {data.map((item, index) => {
          return (
            <div key={index} className='book-wrapper'>
              <img className='book-img' src={item.image} alt='book-cover' />
            </div>
          )
        })}
      </div>
    </div>
  )
}
