import {
  SET_LOADING,
  GET_CONTRACTS,
  GET_TOP_CONTRACTS,
  FILTER_CONTRACTS,
  UPDATE_SEARCH_FILTER,
  UPDATE_LIST_FILTER,
  GET_CONTRACT_POSITIONS,
  SET_ACTIVE_WEEK,
  SET_SELECTED_CONTRACT_TYPE,
} from '../actions/types';

const initialState = {
  list: [],
  top: [],
  filteredList: [],
  searchFilter: '',
  listFilter: 'all',
  selectedContractPositions: [],
  selectedContractActiveWeek: {},
  selectedContractType: 'FutOnly',
  loading: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case GET_CONTRACTS:
      return {
        ...state,
        list: action.payload,
        loading: false
      }
    case GET_TOP_CONTRACTS:
      return {
        ...state,
        top: action.payload,
        loading: false
      }
    case FILTER_CONTRACTS:
      return {
        ...state,
        filteredList: action.payload
      }
    case UPDATE_SEARCH_FILTER:
      return {
        ...state,
        searchFilter: action.payload
      }
    case UPDATE_LIST_FILTER:
      return {
        ...state,
        listFilter: action.payload
      }
    case SET_SELECTED_CONTRACT_TYPE:
      return {
        ...state,
        selectedContractType: action.payload
      }
    case GET_CONTRACT_POSITIONS:
      return {
        ...state,
        selectedContractPositions: action.payload
      }
    case SET_ACTIVE_WEEK:
      return {
        ...state,
        selectedContractActiveWeek: action.payload
      }
    default:
      return state;
  }
}