import axios from 'axios';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';
import { PARSE_FAIL, PARSE_SUCCESS, PARSE_LOADING } from './types';

export const parsePositions = (positions, category) => (dispatch, getState) => {

  dispatch(setParsing());
  axios.post('/api/admin/parser/' + category, positions, tokenConfig(getState))
    .then(res => dispatch({
      type: PARSE_SUCCESS,
      payload: res.data
    }))
    .catch(err => {
      if (err.response) {
        dispatch(returnErrors(err.response.data, err.response.status, 'PARSE_FAIL'));
        dispatch({ type: PARSE_FAIL });
      }
    })
}

export const setParsing = () => {
  return {
    type: PARSE_LOADING
  }
}