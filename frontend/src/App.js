import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import "./App.scss"
import { Routing } from "./components/basic/Routing"
import { Header } from "./components/basic/Header/Header"
import { Footer } from "./components/basic/Footer/Footer"

function App() {
  return (
    <Router>
      <Header />
      <Routing />
      <Footer />
    </Router>
  )
}

export default App
