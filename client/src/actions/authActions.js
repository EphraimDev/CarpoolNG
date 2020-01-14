import { REGISTER_SUCCESS, AUTH_FAIL } from './types';
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
    })
  } catch (err) {
    dispatch({
      type: AUTH_FAIL
    })
  }
};
