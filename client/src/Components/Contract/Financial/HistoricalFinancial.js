import React, { useState } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import VolumeFinancial from './VolumeFinancial';
import PositionsFinancial from './PositionsFinancial';
import TrendUpIcon from '../../Icons/TrendUpIcon';
import ArrowUpCircleIcon from '../../Icons/ArrowUpCircleIcon';

const HistoricalFinancial = (props) => {
  const [timeRange, setTimeRange] = useState(104); //in weeks
  const [classDealer, setClassDealer] = useState(true);
  const [classAssetMgr, setClassAssetMgr] = useState(true);
  const [classLevFunds, setClassLevFunds] = useState(true);
  const [classOtherRep, setClassOtherRep] = useState(false);
  const [classNonRep, setClassNonRep] = useState(false);

  const handleCheck = (checkId) => {
    switch (checkId) {
      case 'dealer':
        setClassDealer(!classDealer);
        break;
      case 'assetMgr':
        setClassAssetMgr(!classAssetMgr);
        break;
      case 'levFunds':
        setClassLevFunds(!classLevFunds);
        break;
      case 'otherRep':
        setClassOtherRep(!classOtherRep);
        break;
      case 'nonRep':
        setClassNonRep(!classNonRep);
        break;
      default:
        break;
    }
  }

  const serveTimeRangeButtons = () => {

    return (
      <div className="box-filters">
        <div className={"btn " + (timeRange === 52 ? 'btn-active' : 'btn-unactive')} onClick={() => setTimeRange(52)}>1Y</div>
        <div className={"btn " + (timeRange === 104 ? 'btn-active' : 'btn-unactive')} onClick={() => setTimeRange(104)}>2Y</div>
        <div className={"btn " + (timeRange === 156 ? 'btn-active' : 'btn-unactive')} onClick={() => setTimeRange(156)}>3Y</div>
        <div className={"btn " + (timeRange === 208 ? 'btn-active' : 'btn-unactive')} onClick={() => setTimeRange(208)}>4Y</div>
        <div className={"btn " + (timeRange === 260 ? 'btn-active' : 'btn-unactive')} onClick={() => setTimeRange(260)}>5Y</div>
        <div className={"btn " + (timeRange === props.contracts.selectedContractPositions.length ? 'btn-active' : 'btn-unactive')} onClick={() => setTimeRange(props.contracts.selectedContractPositions.length)}>All</div>
      </div>
    );
  }

  return (
    <section >
      <div className="box-white column-layout">
        <div className="box-header">

          <div className="box-title">
            <TrendUpIcon />
            <h2>Historical Data</h2>
          </div>
          {serveTimeRangeButtons()}
        </div>

        <ul className="trader-filter">
          <div className="trader-filter-option">
            <input type="checkbox" id="dealer" defaultChecked={classDealer} onChange={() => handleCheck('dealer')} />
            <label htmlFor="dealer">Dealer Intermediary</label>
          </div>
          <div className="trader-filter-option">
            <input type="checkbox" id="assetMgr" defaultChecked={classAssetMgr} onChange={() => handleCheck('assetMgr')} />
            <label htmlFor="assetMgr">Asset Manager / Institutional</label>
          </div>
          <div className="trader-filter-option">
            <input type="checkbox" id="levFunds" defaultChecked={classLevFunds} onChange={() => handleCheck('levFunds')} />
            <label htmlFor="levFunds">Leveraged Funds</label>
          </div>
          <div className="trader-filter-option">
            <input type="checkbox" id="otherRep" defaultChecked={classOtherRep} onChange={() => handleCheck('otherRep')} />
            <label htmlFor="otherRep">Other Reportables</label>
          </div>
          <div className="trader-filter-option">
            <input type="checkbox" id="nonRep" defaultChecked={classNonRep} onChange={() => handleCheck('nonRep')} />
            <label htmlFor="nonRep">Nonreportable Positions</label>
          </div>
        </ul>

        <div className="historical-data-section">
          <h3>Positions</h3>
          <div className="historical-data-chart chart-md">
            <PositionsFinancial
              timeRange={timeRange}
              handleWeekClick={props.handleWeekClick}
              classDealer={classDealer}
              classAssetMgr={classAssetMgr}
              classLevFunds={classLevFunds}
              classOtherRep={classOtherRep}
              classNonRep={classNonRep}
            />
          </div>
        </div>

        <div className="historical-data-section ">
          <h3>Volume</h3>
          <div className="historical-data-chart chart-sm">
            <VolumeFinancial
              timeRange={timeRange}
              handleWeekClick={props.handleWeekClick}
              classDealer={classDealer}
              classAssetMgr={classAssetMgr}
              classLevFunds={classLevFunds}
              classOtherRep={classOtherRep}
              classNonRep={classNonRep}
            />
          </div>
        </div>

        <div className="box-footer">
          <a href="#top"><ArrowUpCircleIcon /></a>
        </div>


      </div>
    </section>

  );
}

HistoricalFinancial.propTypes = { contracts: propTypes.object.isRequired }

const mapStateToProps = (state) => ({
  contracts: state.contracts
});

export default connect(mapStateToProps)(HistoricalFinancial);