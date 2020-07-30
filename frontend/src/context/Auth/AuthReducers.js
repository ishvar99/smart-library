import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOADING,
  LOGOUT,
} from "../types"

export default (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: null,
      }
    }
    case LOADING: {
      return {
        ...state,
        loading: action.payload,
        error: null,
      }
    }
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      console.log(action.payload)
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      }

    case USER_LOADED: {
      console.log(action.payload)
      return {
        ...state,
        user: action.payload.data,
        loading: false,
        isAuthenticated: true,
        error: null,
      }
    }
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
      }

    default:
      return state
  }
}
