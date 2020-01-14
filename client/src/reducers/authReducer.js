import { REGISTER_SUCCESS, AUTH_FAIL } from '../actions/types';

const initialState = {
  isAuthenticated: null,
  loading: false,
  token: null,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      localStorage.setItem('x-auth-token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        token: action.payload.token,
        user: action.payload.data
      };
    case AUTH_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        token: null,
        user: null
      };
    default:
      return state;
  }
}
