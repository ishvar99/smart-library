import React, { useReducer } from "react"
import { BOOK_ADD, BOOK_LOADING, BOOK_ERROR } from "../types"
import BookReducer from "./BookReducers"
import BookContext from "./BookContext"
import axios from "axios"

const BookState = (props) => {
  const intialState = {
    book: null,
    loading: false,
    error: null,
  }
  const [state, dispatch] = useReducer(BookReducer, intialState)
  const addBook = async (userId, formData) => {
    dispatch({ type: BOOK_LOADING, payload: true })
    try {
      const response = await axios.post(
        `/api/v1/book/create/${userId}`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      )
      dispatch({ type: BOOK_ADD, payload: response.data })
    } catch (err) {
      dispatch({ type: BOOK_ERROR, payload: err.response.data.error })
    }
  }
  return (
    <BookContext.Provider
      value={{
        error: state.error,
        loading: state.loading,
        book: state.book,
        addBook,
      }}
    >
      {props.children}
    </BookContext.Provider>
  )
}

export default BookState
