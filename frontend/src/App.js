import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import "./App.scss"
import { Routing } from "./components/basic/Routing"
import { Header } from "./components/basic/Header/Header"
import { Footer } from "./components/basic/Footer/Footer"
import AuthState from "./context/Auth/AuthState"
import GenreState from "./context/Genre/GenreState"
import ProfileState from "./context/Profile/ProfileState"
import BookState from "./context/Book/BookState"
function App() {
  return (
    <AuthState>
      <GenreState>
        <ProfileState>
          <BookState>
            <Router>
              <Header />
              <Routing />
              <Footer />
            </Router>
          </BookState>
        </ProfileState>
      </GenreState>
    </AuthState>
  )
}

export default App
