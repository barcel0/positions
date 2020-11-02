import {
  SET_LOADING,
  GET_CONTRACTS,
  FILTER_CONTRACTS,
  UPDATE_SEARCH_FILTER,
  UPDATE_LIST_FILTER,
  GET_CONTRACT_POSITIONS,
  SET_ACTIVE_WEEK,
  SET_SELECTED_CONTRACT_TYPE,
  GET_TOP_CONTRACTS
} from './types';
import axios from 'axios';

export const setLoading = (status) => dispatch => {
  dispatch({
    type: SET_LOADING,
    payload: status
  });
}

export const getContracts = () => dispatch => {
  axios
    .get('/api/contract')
    .then(res => {
      dispatch({
        type: GET_CONTRACTS,
        payload: res.data
      })
    })
    .then(() => dispatch(setLoading(false)));
}

export const getTopContracts = () => dispatch => {
  axios
    .get('/api/contract/top')
    .then(res => {
      dispatch({
        type: GET_TOP_CONTRACTS,
        payload: res.data
      })
    })
    .then(dispatch(setLoading(false)))
}

export const filterContracts = (list, listFilter, searchFilter) => dispatch => {
  if (listFilter !== 'all') {
    const filteredList = list.filter(item => item.category === listFilter && item.name.toLowerCase().match(searchFilter.toLowerCase()));
    dispatch({
      type: FILTER_CONTRACTS,
      payload: filteredList
    });
  } else {
    const filteredList = list.filter(item => item.name.toLowerCase().match(searchFilter.toLowerCase()));
    dispatch({
      type: FILTER_CONTRACTS,
      payload: filteredList
    });
  }
}


export const updateSearchFilter = (searchString) => dispatch => {
  dispatch({
    type: UPDATE_SEARCH_FILTER,
    payload: searchString
  });
}

export const updateListFilter = (filter) => dispatch => {
  dispatch({
    type: UPDATE_LIST_FILTER,
    payload: filter
  });
}

export const setSelectedContractType = (type) => dispatch => {
  dispatch({
    type: SET_SELECTED_CONTRACT_TYPE,
    payload: type
  });
}

export const getContractPositions = (category, slug, type) => dispatch => {
  const apiURL = `/api/position/${category}/${slug}/${type}`;
  dispatch(setLoading(true));
  dispatch(updateSearchFilter(''));
  axios
    .get(apiURL)
    .then(res => {
      dispatch(setActiveWeek(category, res.data, res.data.length - 1));
      dispatch({
        type: GET_CONTRACT_POSITIONS,
        payload: res.data
      });
    })
    .then(() => dispatch(setSelectedContractType(type)))
    .then(() => dispatch(setLoading(false)))
}

export const setActiveWeek = (category, data, selectedWeekIndex) => dispatch => {
  const selectedWeek = data[selectedWeekIndex];

  if (selectedWeek && category === 'financial') {
    const activeWeek = {
      category: category,
      weekIndex: selectedWeekIndex,
      date: selectedWeek.As_of_Date_In_Form_YYMMDD,
      mktName: selectedWeek.Market_and_Exchange_Names,
      cftcCode: selectedWeek.CFTC_Contract_Market_Code,
      contractUnits: selectedWeek.Contract_Units,
      openInterestAll: selectedWeek.Open_Interest_All,
      tradersAll: selectedWeek.Traders_Tot_All,
      dealer: {
        positions: [selectedWeek.Dealer_Positions_Long_All, selectedWeek.Dealer_Positions_Short_All, selectedWeek.Dealer_Positions_Spread_All],
        changes: [selectedWeek.Change_in_Dealer_Long_All, selectedWeek.Change_in_Dealer_Short_All, selectedWeek.Change_in_Dealer_Spread_All],
        openInterest: [selectedWeek.Pct_of_OI_Dealer_Long_All, selectedWeek.Pct_of_OI_Dealer_Short_All, selectedWeek.Pct_of_OI_Dealer_Spread_All],
        traders: [selectedWeek.Traders_Dealer_Long_All, selectedWeek.Traders_Dealer_Short_All, selectedWeek.Traders_Dealer_Spread_All]
      },
      assetMgr: {
        positions: [selectedWeek.Asset_Mgr_Positions_Long_All, selectedWeek.Asset_Mgr_Positions_Short_All, selectedWeek.Asset_Mgr_Positions_Spread_All],
        changes: [selectedWeek.Change_in_Asset_Mgr_Long_All, selectedWeek.Change_in_Asset_Mgr_Short_All, selectedWeek.Change_in_Asset_Mgr_Spread_All],
        openInterest: [selectedWeek.Pct_of_OI_Asset_Mgr_Long_All, selectedWeek.Pct_of_OI_Asset_Mgr_Short_All, selectedWeek.Pct_of_OI_Asset_Mgr_Spread_All],
        traders: [selectedWeek.Traders_Asset_Mgr_Long_All, selectedWeek.Traders_Asset_Mgr_Short_All, selectedWeek.Traders_Asset_Mgr_Spread_All]
      },
      levFunds: {
        positions: [selectedWeek.Lev_Money_Positions_Long_All, selectedWeek.Lev_Money_Positions_Short_All, selectedWeek.Lev_Money_Positions_Spread_All],
        changes: [selectedWeek.Change_in_Lev_Money_Long_All, selectedWeek.Change_in_Lev_Money_Short_All, selectedWeek.Change_in_Lev_Money_Spread_All],
        openInterest: [selectedWeek.Pct_of_OI_Lev_Money_Long_All, selectedWeek.Pct_of_OI_Lev_Money_Short_All, selectedWeek.Pct_of_OI_Lev_Money_Spread_All],
        traders: [selectedWeek.Traders_Lev_Money_Long_All, selectedWeek.Traders_Lev_Money_Short_All, selectedWeek.Traders_Lev_Money_Spread_All]
      },
      otherRep: {
        positions: [selectedWeek.Other_Rept_Positions_Long_All, selectedWeek.Other_Rept_Positions_Short_All, selectedWeek.Other_Rept_Positions_Spread_All],
        changes: [selectedWeek.Change_in_Other_Rept_Long_All, selectedWeek.Change_in_Other_Rept_Short_All, selectedWeek.Change_in_Other_Rept_Spread_All],
        openInterest: [selectedWeek.Pct_of_OI_Other_Rept_Long_All, selectedWeek.Pct_of_OI_Other_Rept_Short_All, selectedWeek.Pct_of_OI_Other_Rept_Spread_All],
        traders: [selectedWeek.Traders_Other_Rept_Long_All, selectedWeek.Traders_Other_Rept_Short_All, selectedWeek.Traders_Other_Rept_Spread_All]
      },
      nonRep: {
        positions: [selectedWeek.NonRept_Positions_Long_All, selectedWeek.NonRept_Positions_Short_All, 0],
        changes: [selectedWeek.Change_in_NonRept_Long_All, selectedWeek.Change_in_NonRept_Short_All, 0],
        openInterest: [selectedWeek.Pct_of_OI_NonRept_Long_All, selectedWeek.Pct_of_OI_NonRept_Short_All, 0],
        traders: ['-', '-', '-']
      }
    }
    dispatch({
      type: SET_ACTIVE_WEEK,
      payload: activeWeek
    });

  } else if (selectedWeek && category === 'disaggregated') {
    const activeWeek = {
      category: category,
      weekIndex: selectedWeekIndex,
      date: selectedWeek.As_of_Date_In_Form_YYMMDD,
      mktName: selectedWeek.Market_and_Exchange_Names,
      cftcCode: selectedWeek.CFTC_Contract_Market_Code,
      contractUnits: selectedWeek.Contract_Units,
      openInterestAll: selectedWeek.Open_Interest_All,
      tradersAll: selectedWeek.Traders_Tot_All,
      prodMerc: {
        positions: [selectedWeek.Prod_Merc_Positions_Long_ALL, selectedWeek.Prod_Merc_Positions_Short_ALL, 0],
        changes: [selectedWeek.Change_in_Prod_Merc_Long_All, selectedWeek.Change_in_Prod_Merc_Short_All, 0],
        openInterest: [selectedWeek.Pct_of_OI_Prod_Merc_Long_All, selectedWeek.Pct_of_OI_Prod_Merc_Short_All, 0],
        traders: [selectedWeek.Traders_Prod_Merc_Long_All, selectedWeek.Traders_Prod_Merc_Short_All, 0]
      },
      swap: {
        positions: [selectedWeek.Swap_Positions_Long_All, selectedWeek.Swap__Positions_Short_All, selectedWeek.Swap__Positions_Spread_All],
        changes: [selectedWeek.Change_in_Swap_Long_All, selectedWeek.Change_in_Swap_Short_All, selectedWeek.Change_in_Swap_Spread_All],
        openInterest: [selectedWeek.Pct_of_OI_Swap_Long_All, selectedWeek.Pct_of_OI_Swap_Short_All, selectedWeek.Pct_of_OI_Swap_Spread_All],
        traders: [selectedWeek.Traders_Swap_Long_All, selectedWeek.Traders_Swap_Short_All, selectedWeek.Traders_Swap_Spread_All]
      },
      mMoney: {
        positions: [selectedWeek.M_Money_Positions_Long_ALL, selectedWeek.M_Money_Positions_Short_ALL, selectedWeek.M_Money_Positions_Spread_ALL],
        changes: [selectedWeek.Change_in_M_Money_Long_All, selectedWeek.Change_in_M_Money_Short_All, selectedWeek.Change_in_M_Money_Spread_All],
        openInterest: [selectedWeek.Pct_of_OI_M_Money_Long_All, selectedWeek.Pct_of_OI_M_Money_Short_All, selectedWeek.Pct_of_OI_M_Money_Spread_All],
        traders: [selectedWeek.Traders_M_Money_Long_All, selectedWeek.Traders_M_Money_Short_All, selectedWeek.Traders_M_Money_Spread_All]
      },
      otherRep: {
        positions: [selectedWeek.Other_Rept_Positions_Long_ALL, selectedWeek.Other_Rept_Positions_Short_ALL, selectedWeek.Other_Rept_Positions_Spread_ALL],
        changes: [selectedWeek.Change_in_Other_Rept_Long_All, selectedWeek.Change_in_Other_Rept_Short_All, selectedWeek.Change_in_Other_Rept_Spread_All],
        openInterest: [selectedWeek.Pct_of_OI_Other_Rept_Long_All, selectedWeek.Pct_of_OI_Other_Rept_Short_All, selectedWeek.Pct_of_OI_Other_Rept_Spread_All],
        traders: [selectedWeek.Traders_Other_Rept_Long_All, selectedWeek.Traders_Other_Rept_Short_All, selectedWeek.Traders_Other_Rept_Spread_All]
      },
      nonRep: {
        positions: [selectedWeek.NonRept_Positions_Long_All, selectedWeek.NonRept_Positions_Short_All, 0],
        changes: [selectedWeek.Change_in_NonRept_Long_All, selectedWeek.Change_in_NonRept_Short_All, 0],
        openInterest: [selectedWeek.Pct_of_OI_NonRept_Long_All, selectedWeek.Pct_of_OI_NonRept_Short_All, 0],
        traders: ['-', '-', '-']
      }
    }

    dispatch({
      type: SET_ACTIVE_WEEK,
      payload: activeWeek
    });

  }
}