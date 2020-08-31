import React from "react"
import { Redirect, Route } from "react-router-dom"
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !localStorage.getItem("loggedIn") ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}
export default PrivateRoute
