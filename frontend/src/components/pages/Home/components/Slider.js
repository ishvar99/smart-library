import React, { useState } from "react"
import { Carousel } from "react-bootstrap"
import "./slider.scss"

export const Slider = ({ data }) => {
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

  return (
    <div className='Slider'>
      <Carousel
        className='carousel-container'
        fade={true}
        activeIndex={index}
        onSelect={handleSelect}
      >
        {data.map((item, index) => {
          return (
            <Carousel.Item key={index}>
              <img
                className='d-block w-100 wall'
                src={item.wall}
                alt='First slide'
              />
              <div className='slide-container'>
                <img
                  src={item.image}
                  alt='book-page'
                  height='200'
                  width='150'
                  className='image'
                />
                <div className='content-div'>
                  <h1>{item.title}</h1>
                  <h4>by {item.author}</h4>
                  <h5 className='badge badge-warning text-white p-1'>
                    {item.genre}
                  </h5>
                </div>
              </div>
            </Carousel.Item>
          )
        })}
      </Carousel>
    </div>
  )
}
