import {
  REGISTER_SUCCESS,
  AUTH_FAIL,
  LOAD_USER,
  LOGIN_SUCCESS,
  SET_LOADING,
  LOG_OUT
} from '../actions/types';

const initialState = {
  isAuthenticated: null,
  loading: true,
  token: null,
  user: {},
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('x-auth-token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        token: action.payload.token,
        user: action.payload.data
      };
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        token: localStorage.getItem('x-auth-token')
      };
    case AUTH_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        token: null,
        user: {},
        error: action.payload
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case LOG_OUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        token: null,
        user: {},
        error: action.payload
      };
    default:
      return state;
  }
}
