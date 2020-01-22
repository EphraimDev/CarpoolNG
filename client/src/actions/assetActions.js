import {
  LOAD_ASSEST,
  LOAD_ASSESTS,
  ADD_ASSEST,
  EDIT_ASSEST,
  DELETE_ASSEST,
  SET_LOADING,
  ASSET_ERROR
} from '../actions/types';
import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
};

export const addAsset = formData => async dispatch => {
  try {
    setLoading(true);
  } catch (error) {}
};

export const loadAssets = () => async dispatch => {
  try {
    setLoading(true);

    const res = await axios.get('/api/assets');
    // console.log(res.data);
    dispatch({
      type: LOAD_ASSESTS,
      payload: res.data
    });
  } catch (err) {
    console.log(err.response.data);
    dispatch({
      type: ASSET_ERROR,
      payload: err.response
    });
  }
};

export const setLoading = state => async dispatch => {
  dispatch({
    type: SET_LOADING,
    payload: state
  });
};
