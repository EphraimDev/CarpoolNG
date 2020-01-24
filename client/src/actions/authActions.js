import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  AUTH_FAIL,
  LOAD_USER,
  SET_LOADING,
  LOG_OUT,
  UPDATE_USER,
  DELETE_USER
} from './types';
import axios from 'axios';

const authConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
};

const config = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
};

export const register = formData => async dispatch => {
  try {
    setLoading(true);
    const res = await axios.post('/api/users', formData, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    window.location.href = '/profile';
  } catch (err) {
    dispatch({
      type: AUTH_FAIL,
      payload: err.response.data.msg
    });
  }
};

export const login = formData => async dispatch => {
  try {
    setLoading(true);
    const res = await axios.post('/api/auth', formData, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    window.location.href = '/profile';
  } catch (err) {
    dispatch({
      type: AUTH_FAIL,
      payload: err.response.data
    });
  }
};

export const updateUser = formData => async dispatch => {
  try {
    const res = await axios.put('/api/users', formData, authConfig);

    dispatch({
      type: UPDATE_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_FAIL,
      payload: err.response.data
    });
  }
};

export const loadUser = () => async dispatch => {
  try {
    setLoading(true);
    const res = await axios.get('/api/users');

    dispatch({
      type: LOAD_USER,
      payload: res.data
    });
  } catch (err) {
    console.log(err.response.data.msg);
    dispatch({
      type: AUTH_FAIL
    });
  }
};

export const deleteUser = () => async dispatch => {
  try {
    await axios.delete('/api/users');

    dispatch({
      type: DELETE_USER
    });

    window.location.href = '/';
  } catch (err) {
    window.location.href = '/profile';
  }
};

export const setLoading = state => async dispatch => {
  dispatch({
    type: SET_LOADING,
    payload: state
  });
};

export const logOutAuth = () => async dispatch => {
  localStorage.removeItem('x-auth-token');
  dispatch({
    type: LOG_OUT
  });
};
