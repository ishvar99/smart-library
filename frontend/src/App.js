import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import "./App.scss"
import { Routing } from "./components/common/Routing"
import { Header } from "./components/common/Header"
import { Footer } from "./components/common/Footer"

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
