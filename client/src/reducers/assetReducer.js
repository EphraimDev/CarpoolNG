import {
  LOAD_ASSESTS,
  ADD_ASSEST,
  DELETE_ASSEST,
  ASSET_ERROR,
  SET_LOADING
} from '../actions/types';

const initialState = {
  asset: null,
  assets: null,
  loading: false,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ASSEST:
      return {
        ...state,
        asset: action.payload,
        loading: false,
        error: null 
      }
    case LOAD_ASSESTS:
      return {
        ...state,
        assets: action.payload.assets,
        loading: false
      };
    case DELETE_ASSEST:
      return {
        ...state,
        assets: state.assets.filter(
          asset => asset._id !== action.payload
        ),
        loading: false
      }
    case ASSET_ERROR:
      return {
        ...state,
        asset: null,
        assets: null,
        loading: false,
        error: action.payload
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}
