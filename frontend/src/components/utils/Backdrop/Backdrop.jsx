import React from "react"
import "./backdrop.scss"

export const Backdrop = ({ data }) => {
  return (
    <div class='Backdrop container my-3'>
      <div class='backdrop-carousel'></div>
      <div class='row-wrapper'>
        {[...Array(6)].map((i) => {
          return <div key={i} className='backdrop-book-img '></div>
        })}
      </div>
    </div>
  )
}
