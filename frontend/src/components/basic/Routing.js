import React from "react"
import { Switch, Route } from "react-router-dom"
import { Home } from "../pages/Home/Home"
import { Login } from "../pages/Login/Login"
import { Register } from "../pages/Register/Register"
import { Profile } from "../pages/Profile/Profile"
import { AddBook } from "../pages/AddBook/AddBook"
import { ManageGenre } from "../pages/ManageGenre/ManageGenre"
import { Books } from "../pages/Books/Books"
import { Book } from "../pages/Book/Book"
export const Routing = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/register" component={Register}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/profile" component={Profile}></Route>
      <Route exact path="/book" component={AddBook}></Route>
      <Route exact path="/genre" component={ManageGenre}></Route>
      <Route exact path="/books/:type" component={Books}></Route>
      <Route exact path="/books/:type/:id" component={Book}></Route>
    </Switch>
  )
}
