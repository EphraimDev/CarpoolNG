import { SET_ALERT, REMOVE_ALERT } from './types';

//    Set Alert
export const setAlert = (msg, type, timer = 50000000000) => dispatch => {
    console.log(msg, type)
  dispatch({
    type: SET_ALERT,
    payload: { msg, type }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT }), timer);
};
