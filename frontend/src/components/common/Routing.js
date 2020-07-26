import React from "react"
import { Switch, Route } from "react-router-dom"
import { Home } from "../pages/Home"
import { Signin } from "../pages/Signin"
import { Signup } from "../pages/Signup"

export const Routing = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/signin'>
        <Signin />
      </Route>
      <Route path='/signup'>
        <Signup />
      </Route>
    </Switch>
  )
}
