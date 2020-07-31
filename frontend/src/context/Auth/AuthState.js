import React, { useReducer } from "react"
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOADING,
  LOGOUT,
} from "../types"
import AuthReducer from "./AuthReducers"
import AuthContext from "./AuthContext"
import axios from "axios"
const AuthState = (props) => {
  const intialState = {
    isAuthenticated: null,
    user: null,
    loading: false,
    error: null,
  }

  const [state, dispatch] = useReducer(AuthReducer, intialState)
  const loadUser = async () => {
    try {
      dispatch({ type: LOADING, payload: true })
      const response = await axios.get("/api/v1/auth/me")
      dispatch({ type: USER_LOADED, payload: response.data })
    } catch (error) {
      console.log(error)
    }
  }
  const registerUser = async (formData) => {
    try {
      dispatch({ type: LOADING, payload: true })
      const response = await axios.post(
        "/api/v1/auth/register",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      dispatch({ type: REGISTER_SUCCESS, payload: response.data })
      loadUser()
    } catch (err) {
      console.log(err.response)
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.error })
    }
  }
  const logout = () => {
    dispatch({ type: LOGOUT })
  }
  const loginUser = async (formData) => {
    try {
      dispatch({ type: LOADING, payload: true })
      const response = await axios.post(
        "/api/v1/auth/login",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      dispatch({ type: LOGIN_SUCCESS, payload: response.data })
      loadUser()
    } catch (err) {
      console.log(err.response)
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.error })
    }
  }
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        registerUser,
        loginUser,
        loadUser,
        logout,
        error: state.error,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState
