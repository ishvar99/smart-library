import { PROFILE_UPDATE, PROFILE_ERROR, PROFILE_LOADING } from "../types"

export default (state, action) => {
  switch (action.type) {
    case PROFILE_UPDATE: {
      return {
        ...state,
        loading: false,
        error: null,
      }
    }
    case PROFILE_LOADING: {
      return {
        ...state,
        loading: action.payload,
        error: null,
      }
    }
    case PROFILE_ERROR: {
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
