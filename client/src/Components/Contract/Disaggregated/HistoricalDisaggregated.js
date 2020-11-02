import React, { useState } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import VolumeDisaggregated from './VolumeDisaggregated';
import PositionsDisaggregated from './PositionsDisaggregated';
import TrendUpIcon from '../../Icons/TrendUpIcon';
import ArrowUpCircleIcon from '../../Icons/ArrowUpCircleIcon';

const HistoricalDisaggregated = (props) => {

  const [timeRange, setTimeRange] = useState(104); //in weeks
  const [classProdMerc, setClassProdMerc] = useState(true);
  const [classSwap, setClassSwap] = useState(true);
  const [classMMoney, setClassMMoney] = useState(true);
  const [classOtherRep, setClassOtherRep] = useState(false);
  const [classNonRep, setClassNonRep] = useState(false);

  const handleCheck = (checkId) => {
    switch (checkId) {
      case 'prodMerc':
        setClassProdMerc(!classProdMerc);
        break;
      case 'swap':
        setClassSwap(!classSwap);
        break;
      case 'mMoney':
        setClassMMoney(!classMMoney);
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

    <section>
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
            <input type="checkbox" id="prodMerc" defaultChecked={classProdMerc} onChange={() => handleCheck('prodMerc')} />
            <label htmlFor="prodMerc">Producer / Merchant / Processor / User</label>
          </div>
          <div className="trader-filter-option">
            <input type="checkbox" id="swap" defaultChecked={classSwap} onChange={() => handleCheck('swap')} />
            <label htmlFor="swap"> Swap Dealer</label>
          </div>
          <div className="trader-filter-option">
            <input type="checkbox" id="mMoney" defaultChecked={classMMoney} onChange={() => handleCheck('mMoney')} />
            <label htmlFor="mMoney">Managed Money</label>
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
            <PositionsDisaggregated
              timeRange={timeRange}
              handleWeekClick={props.handleWeekClick}
              classProdMerc={classProdMerc}
              classSwap={classSwap}
              classMMoney={classMMoney}
              classOtherRep={classOtherRep}
              classNonRep={classNonRep}
            />
          </div>
        </div>

        <div className="historical-data-section ">
          <h3>Volume</h3>
          <div className="historical-data-chart chart-sm">
            <VolumeDisaggregated
              timeRange={timeRange}
              handleWeekClick={props.handleWeekClick}
              classProdMerc={classProdMerc}
              classSwap={classSwap}
              classMMoney={classMMoney}
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


HistoricalDisaggregated.propTypes = { contracts: propTypes.object.isRequired }

const mapStateToProps = (state) => ({
  contracts: state.contracts
});

export default connect(mapStateToProps)(HistoricalDisaggregated);