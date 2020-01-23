import {
  LOAD_ASSESTS,
  ADD_ASSEST,
  SET_LOADING,
  DELETE_ASSEST,
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
    const res = await axios.post(`/api/assets`, formData, config);

    dispatch({
      type: ADD_ASSEST,
      payload: res.data.asset
    });
  } catch (err) {
    dispatch({
      type: ASSET_ERROR,
      payload: err.response.data.msg
    });
  }
};

export const updateAsset = (formData, id) => async dispatch => {
  try {
    const res = await axios.put(`/api/assets/${id}`, formData, config);

    dispatch({
      type: LOAD_ASSESTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ASSET_ERROR,
      payload: err.response.data.msg
    });
  }
};

export const deleteAsset = (id) => async dispatch => {
  try {
    await axios.delete(`/api/assets/${id}`);

    dispatch({
      type: DELETE_ASSEST,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: ASSET_ERROR,
      payload: err.response.data.msg
    });
  }
};

export const loadAssets = () => async dispatch => {
  try {
    setLoading(true);

    const res = await axios.get('/api/assets');

    dispatch({
      type: LOAD_ASSESTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ASSET_ERROR,
      payload: err.response
    });
  }
};

export const setLoading = state => async dispatch => {
  console.log(state);
  dispatch({
    type: SET_LOADING,
    payload: state
  });
};
