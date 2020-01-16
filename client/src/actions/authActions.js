import { REGISTER_SUCCESS, LOGIN_SUCCESS, AUTH_FAIL, LOAD_USER } from './types';
import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export const register = formData => async dispatch => {
  try {
    const res = await axios.post('/api/users', formData, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    window.location.href = '/';
  } catch (err) {
    console.log(err.response.data.msg);
    dispatch({
      type: AUTH_FAIL,
      payload: err.response.data.msg
    });
  }
};

export const login = formData => async dispatch => {
  try {
    const res = await axios.post('/api/auth', formData, config);
    
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    window.location.href = '/';
  } catch (err) {
    
    dispatch({
      type: AUTH_FAIL,
      payload: err.response.data
    });
  }
};

export const loadUser = () => async dispatch => {
  try {
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
