import React, { useReducer } from "react"
import { GENRE_ADD, GENRE_ERROR, GENRE_LOADING, GENRE_FETCH } from "../types"
import GenreReducer from "./GenreReducers"
import GenreContext from "./GenreContext"
import axios from "axios"
const GenreState = (props) => {
  const intialState = {
    loading: false,
    genres: null,
    genre: null,
    error: null,
  }

  const [state, dispatch] = useReducer(GenreReducer, intialState)

  const addGenre = async (userId, name) => {
    try {
      dispatch({ type: GENRE_LOADING, payload: true })
      const response = await axios.post(
        `/api/v1/genre/create/${userId}`,
        JSON.stringify({ name: name.toLowerCase() }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      dispatch({ type: GENRE_ADD, payload: response.data })
    } catch (err) {
      console.log(err)
      dispatch({ type: GENRE_ERROR, payload: err.response.data.error })
    }
  }
  const fetchGenres = async () => {
    try {
      dispatch({ type: GENRE_LOADING, payload: true })
      const response = await axios.get("/api/v1/genres")
      dispatch({ type: GENRE_FETCH, payload: response.data })
    } catch (err) {
      dispatch({ type: GENRE_ERROR, payload: err.response.data.error })
    }
  }

  return (
    <GenreContext.Provider
      value={{
        loading: state.loading,
        addGenre,
        fetchGenres,
        genres: state.genres,
        genre: state.genre,
        error: state.error,
      }}
    >
      {props.children}
    </GenreContext.Provider>
  )
}

export default GenreState
