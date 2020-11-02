import { PARSE_FAIL, PARSE_SUCCESS, PARSE_LOADING} from '../actions/types';

const initialState = {
  isLoading: false,
  log: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case PARSE_LOADING:
      return {
        ...state,
        isLoading: true,
        log: 'Loading...'
      }
    case PARSE_SUCCESS:
      return {
        ...state,
        log: action.payload,
        isLoading: false,
      }
    case PARSE_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state;
  }
}
