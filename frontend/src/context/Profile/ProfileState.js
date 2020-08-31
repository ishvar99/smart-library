import React, { useReducer } from "react"
import { PROFILE_UPDATE, PROFILE_ERROR, PROFILE_LOADING } from "../types"
import ProfileReducer from "./ProfileReducers"
import ProfileContext from "./ProfileContext"
import axios from "axios"

const ProfileState = (props) => {
  const intialState = {
    loading: false,
    error: null,
  }
  const [state, dispatch] = useReducer(ProfileReducer, intialState)
  const updateProfile = async (userId, formData) => {
    dispatch({ type: PROFILE_LOADING, payload: true })
    try {
      const response = await axios.put(
        `/api/v1/user/${userId}`,
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      dispatch({ type: PROFILE_UPDATE, payload: response.data })
    } catch (err) {
      dispatch({ type: PROFILE_ERROR, payload: err.response.data.error })
    }
  }
  return (
    <ProfileContext.Provider
      value={{
        loading: state.loading,
        updateProfile,
        error: state.error,
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  )
}

export default ProfileState
