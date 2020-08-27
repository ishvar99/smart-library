import React, { useContext } from "react"
import { Slider } from "./components/Slider"
import { Trending } from "./components/Trending"
import sampledata from "./sampleData"
import AuthContext from "../../../context/Auth/AuthContext"
import "./home.scss"
import { Backdrop } from "../../utils/Backdrop/Backdrop"
export const Home = () => {
  const context = useContext(AuthContext)
  const { loading } = context

  return (
    <>
      {!loading ? (
        <div className={"Home container my-3"}>
          <Slider data={sampledata} />
          <div className="section-1">
            <div className="trending-section">
              <Trending data={sampledata} />
            </div>
          </div>
        </div>
      ) : (
        <Backdrop />
      )}
    </>
  )
}
