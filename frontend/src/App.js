import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import "./App.scss"
import { Routing } from "./components/basic/Routing"
import { Header } from "./components/basic/Header/Header"
import { Footer } from "./components/basic/Footer/Footer"
import AuthState from "./context/Auth/AuthState"
import GenreState from "./context/Genre/GenreState"
import ProfileState from "./context/Profile/ProfileState"
function App() {
  return (
    <AuthState>
      <GenreState>
        <ProfileState>
          <Router>
            <Header />
            <Routing />
            <Footer />
          </Router>
        </ProfileState>
      </GenreState>
    </AuthState>
  )
}

export default App
