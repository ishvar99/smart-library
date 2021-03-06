import { GENRE_ADD, GENRE_ERROR, GENRE_LOADING, GENRE_FETCH } from "../types"

export default (state, action) => {
  switch (action.type) {
    case GENRE_ADD: {
      return {
        ...state,
        loading: false,
        error: null,
        genre: action.payload,
      }
    }
    case GENRE_FETCH: {
      return {
        ...state,
        genres: action.payload,
        loading: false,
        error: null,
      }
    }
    case GENRE_LOADING: {
      return {
        ...state,
        loading: action.payload,
        error: null,
      }
    }
    case GENRE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }
    default:
      return state
  }
}
