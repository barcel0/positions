import { combineReducers } from 'redux';
import contractReducer from './contractReducer';
import adminReducer from './adminReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  contracts: contractReducer,
  auth: authReducer,
  parser: adminReducer,
  error: errorReducer
});