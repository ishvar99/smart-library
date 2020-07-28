import React from "react"
import { Switch, Route } from "react-router-dom"
import { Home } from "../pages/Home/Home"
import { Login } from "../pages/Login/Login"
import { Register } from "../pages/Register/Register"

export const Routing = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
    </Switch>
  )
}
