import { BOOK_ADD, BOOK_LOADING, BOOK_ERROR } from "../types"

export default (state, action) => {
  switch (action.type) {
    case BOOK_ADD: {
      return {
        ...state,
        loading: false,
        book: action.payload,
        error: null,
      }
    }
    case BOOK_LOADING: {
      return {
        ...state,
        loading: action.payload,
        book: null,
        error: null,
      }
    }
    case BOOK_ERROR: {
      return {
        ...state,
        loading: false,
        book: null,
        error: action.payload,
      }
    }
    default:
      return state
  }
}
