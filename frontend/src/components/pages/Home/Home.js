import React from "react"
import { Slider } from "./components/Slider"
import { Trending } from "./components/Trending"
import sampledata from "./sampleData"
import "./home.scss"
export const Home = () => {
  return (
    <div className='Home'>
      <Slider data={sampledata} />
      <div className='section-1'>
        <div className='trending-section'>
          <Trending data={sampledata} />
        </div>
      </div>
    </div>
  )
}
