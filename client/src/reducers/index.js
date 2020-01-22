import { combineReducers } from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import assetReducer from './assetReducer';

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  asset: assetReducer
});
