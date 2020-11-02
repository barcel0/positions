import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { filterContracts, updateListFilter } from '../../actions/contractActions';
import propTypes from 'prop-types';
import ListIcon from '../Icons/ListIcon';
import FileIcon from '../Icons/FileIcon';
import ChevronsDownIcon from '../Icons/ChevronsDownIcon'
import ArrowUpCircleIcon from '../Icons/ArrowUpCircleIcon';
import numbersWithCommas from '../../helpers/numberWithCommas';

const ContractList = (props) => {
  const [loadedAmount, setLoadedAmount] = useState(20);
  const filterContracts = props.filterContracts;

  useEffect(() => {
    filterContracts(props.contracts.list, props.contracts.listFilter, props.contracts.searchFilter);
  }, [filterContracts, props.contracts.list, props.contracts.listFilter, props.contracts.searchFilter]);


  const serveFilterButtons = (filter) => {
    return (
      <div className="box-filters">
        <div className={"btn " + (filter === 'all' ? 'btn-active' : 'btn-unactive')} onClick={() => props.updateListFilter('all')}>Show All</div>
        <div className={"btn " + (filter === 'financial' ? 'btn-active' : 'btn-unactive')} onClick={() => props.updateListFilter('financial')}>Financial Only</div>
        <div className={"btn " + (filter === 'disaggregated' ? 'btn-active' : 'btn-unactive')} onClick={() => props.updateListFilter('disaggregated')}>Disaggregated Only</div>
      </div>
    );
  }

  const serveChangeData = (data) => {
    if (data > 0) {
      return <span className='data-positive'>+{numbersWithCommas(data)}</span>;
    } else if (data < 0) {
      return <span className='data-negative'>{numbersWithCommas(data)}</span>;
    } else {
      return <span>0</span>
    }
  }

  const serveList = (list) => {
    const trimmedList = list.slice(0, loadedAmount - 1);

    const formattedList = trimmedList.map(item => {
      return (
        <Link to={`/contract/${item.category}/${item.slug}`} key={item._id}>
          <li className="contract-list-item">
            <div className="contract-list-item-header">
              <FileIcon width={14} />
              <h3>{item.name}</h3>
            </div>
            <div className="contract-list-item-data">
              <span>{new Date(item.lastUpdate.date).toLocaleString("en-GB", { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              <span>{item.lastUpdate.traders}</span>
              {serveChangeData(item.lastUpdate.changeLong)}
              {serveChangeData(item.lastUpdate.changeShort)}
            </div>
          </li>
        </Link>
      );
    });
    return formattedList;
  }

  const serveLoadMore = () => {
    if (loadedAmount < props.contracts.filteredList.length) {
      return (
        <div className="load-more-btn" onClick={() => handleLoadMore()}>
          <ChevronsDownIcon />
          <span>Load More</span>
        </div>
      );
    }
  }

  const handleLoadMore = () => {
    if (loadedAmount < props.contracts.filteredList.length) {
      setLoadedAmount(loadedAmount + 20);
    }
  }

  return (
    <div className="box-white column-layout">
      <div className="box-header">
        <div className="box-title">
          <ListIcon />
          <h2>Found Contracts</h2>
        </div>

        {serveFilterButtons(props.contracts.listFilter)}

      </div>
      <ul className="contract-list">

        <li className="contract-list-item">
          <div className="contract-list-item-header">

            <h3 title="Contract Name">Contract Name</h3>
          </div>
          <div className="contract-list-item-data contract-list-item-data-header">
            <span title="Last Date Update">Last Update</span>
            <span title="Total Traders">Traders</span>
            <span title="Total Change Long Positions (Reportable Traders Only)">Change Long</span>
            <span title="Total Change Short Positions (Reportable Traders Only)">Change Short</span></div>
        </li>
        {serveList(props.contracts.filteredList)}
      </ul>

      <div className="load-more-container">
        {serveLoadMore()}
      </div>

      <div className="box-footer">
        <a href="#top" title="To Top"><ArrowUpCircleIcon /></a>
      </div>

    </div>
  );
}

ContractList.propTypes = {
  filterContracts: propTypes.func.isRequired,
  updateListFilter: propTypes.func.isRequired,
  contracts: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  contracts: state.contracts,
});

export default connect(
  mapStateToProps,
  { filterContracts, updateListFilter }
)(ContractList);