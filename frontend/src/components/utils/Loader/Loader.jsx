import React from "react"
import "./Loader.scss"
export const Loader = () => {
  return (
    <div className="loader-bg">
      <div className="spinner">
        <div className="inner">
          <div className="left"></div>
          <div className="middle"></div>
          <div className="right"></div>
        </div>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <h6 className="pt-5 mt-3">
        Yesterday is not ours to recover, but tomorrow is ours to win or lose.
      </h6>
    </div>
  )
}
