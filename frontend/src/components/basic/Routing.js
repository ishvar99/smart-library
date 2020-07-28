import React from "react"
import { Switch, Route } from "react-router-dom"
import { Home } from "../pages/Home/Home"
import { Login } from "../pages/Login/Login"
import { Register } from "../pages/Register/Register"

export const Routing = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/register'>
        <Register />
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
    </Switch>
  )
}