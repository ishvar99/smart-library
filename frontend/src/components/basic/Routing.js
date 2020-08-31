import React, { useContext } from "react"
import { Switch, Route } from "react-router-dom"
import { Home } from "../pages/Home/Home"
import { Login } from "../pages/Login/Login"
import { Register } from "../pages/Register/Register"
import { Profile } from "../pages/Profile/Profile"
import { AddBook } from "../pages/AddBook/AddBook"
import { ManageGenre } from "../pages/ManageGenre/ManageGenre"
import { Books } from "../pages/Books/Books"
import { Book } from "../pages/Book/Book"
import PrivateRoute from "../basic/PrivateRoute"
import AuthContext from "../../context/Auth/AuthContext"
export const Routing = () => {
  const { isAuthenticated } = useContext(AuthContext)
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/register" component={Register}></Route>
      <Route exact path="/login" component={Login}></Route>
      <PrivateRoute exact path="/profile" component={Profile}></PrivateRoute>
      <PrivateRoute exact path="/book" component={AddBook}></PrivateRoute>
      <PrivateRoute exact path="/genre" component={ManageGenre}></PrivateRoute>
      <Route exact path="/books/:type" component={Books}></Route>
      <Route exact path="/books/:type/:id" component={Book}></Route>
    </Switch>
  )
}
