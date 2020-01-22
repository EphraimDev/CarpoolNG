import {
  LOAD_ASSEST,
  LOAD_ASSESTS,
  ADD_ASSEST,
  EDIT_ASSEST,
  DELETE_ASSEST,
  ASSET_ERROR
} from '../actions/types';

const initialState = {
  asset: null,
  assets: null,
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_ASSESTS:
      return {
        ...state,
        assets: action.payload.assets,
        loading: false
      };
    case ASSET_ERROR:
      return {
        ...state,
        asset: null,
        assets: null,
        loading: false
      };
    default:
      return state;
  }
}
