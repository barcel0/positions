import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateSearchFilter } from '../../actions/contractActions';
import propTypes from 'prop-types';
import SearchIcon from '../Icons/SearchIcon';
import CloseIcon from '../Icons/CloseIcon';

const SearchBar = (props) => {

  const [formValue, setFormValue] = useState('');

  const handleSearchInput = (e) => {
    setFormValue(e.target.value);
    if (e.target.value.length > 2) {
      props.updateSearchFilter(e.target.value);
    } else {
      props.updateSearchFilter('');

    }
  }

  const handleCloseClick = () => {
    props.updateSearchFilter('');
    setFormValue('');
  }

  const serveCloseIcon = () => {
    if (props.contracts.searchFilter.length > 0) {
      return <div className="clear-search-bar" onClick={() => handleCloseClick()}><CloseIcon /></div>;
    }
  }

  return (
    <div className="box-white">
      <div className="search-container">
        <SearchIcon />
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search"
          value={formValue}
          onChange={(e) => handleSearchInput(e)}
        />
        {serveCloseIcon()}
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  updateSearchFilter: propTypes.func.isRequired,
  contracts: propTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  contracts: state.contracts
});

export default connect(mapStateToProps, { updateSearchFilter })(SearchBar);