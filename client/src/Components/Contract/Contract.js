import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { getContractPositions, setSelectedContractType, setActiveWeek, setLoading, getContracts } from '../../actions/contractActions';
import propTypes from 'prop-types';
import FileTextIcon from '../Icons/FileTextIcon';
import Weekly from './Weekly';
import HistoricalFinancial from './Financial/HistoricalFinancial';
import HistoricalDisaggregated from './Disaggregated/HistoricalDisaggregated';
import dateFormatter from '../../helpers/dateFormatter';
import ReactGA from 'react-ga';
import ReactToolTip from 'react-tooltip';

const Contract = (props) => {
  const [contractType] = useState('FutOnly'); //FutOnly || Combined
  const getContractPositions = props.getContractPositions;

  useEffect(() => {
    getContractPositions(props.contractCategory, props.contractSlug, props.contracts.selectedContractType);
    ReactGA.initialize('UA-164495098-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [getContractPositions, props.contractCategory, props.contractSlug, props.contracts.selectedContractType, contractType]);

  const handleWeekClick = (rawDate) => {
    const targetDate = dateFormatter(rawDate, 'short');
    const weekIndex = props.contracts.selectedContractPositions.findIndex(obj => obj.As_of_Date_In_Form_YYMMDD === targetDate);
    const category = props.contracts.selectedContractActiveWeek.category;
    const data = props.contracts.selectedContractPositions;
    props.setActiveWeek(category, data, weekIndex);
  }

  const handleTypeClick = (contractType) => {
    if (props.contracts.selectedContractType !== contractType) {
      props.getContractPositions(props.contractCategory, props.contractSlug, contractType);
    }
  }

  const serveType = () => {
    if (props.contracts.selectedContractType === 'FutOnly') {
      return ' (Futures Only)';
    } else {
      return ' (Futures and Options)';
    }
  }

  const serveFilterButtons = (filter) => {
    return (
      <div className="box-filters">
        <div className={"btn " + (filter === 'FutOnly' ? 'btn-active' : 'btn-unactive')} onClick={() => handleTypeClick('FutOnly')}>Futures Only</div>
        <div className={"btn " + (filter === 'Combined' ? 'btn-active' : 'btn-unactive')} onClick={() => handleTypeClick('Combined')}>Futures and Options</div>
      </div>
    );
  }

  const serveContract = () => {
    if (props.contractCategory === 'financial') {
      return (
        <div className="contract-body">
          <Weekly />
          <HistoricalFinancial handleWeekClick={handleWeekClick} />
        </div>
      );
    } else if (props.contractCategory === 'disaggregated') {
      return (
        <div className="contract-body">
          <Weekly />
          <HistoricalDisaggregated handleWeekClick={handleWeekClick} />
        </div>
      );
    }
  }

  const serveContent = () => {
    if (!props.contracts.loading) {
      const marketName = props.contracts.selectedContractActiveWeek.mktName;
      return (
        <div>
          <Helmet>
            <title>{`${marketName} CFTC COT Report - Commitments of Traders`}</title>
            <meta name="description" content={`${marketName} CFTC COT Report. Commitments of traders weekly reports, volume/positions charts and trader changes detailed data.`} />
          </Helmet>
          <main>
            <section>
              <div className="contract-header">
                <div className="contract-header-icon">
                  <FileTextIcon />
                </div>
                <div className="contract-header-content">
                  <div className="contract-header-main-row">
                    <h1>{marketName} CFTC COT Report {serveType()}</h1>
                  </div>
                  {serveFilterButtons(props.contracts.selectedContractType)}
                </div>
              </div>
            </section>
            {serveContract()}
          </main>
          <ReactToolTip className='tooltip' />
        </div>

      );
    } else {
      return (
        <div className="spinner">
          <div className="rect1"></div>
          <div className="rect2"></div>
          <div className="rect3"></div>
          <div className="rect4"></div>
          <div className="rect5"></div>
        </div>
      );
    }
  }

  return serveContent();
}

Contract.propTypes = {
  getContractPositions: propTypes.func.isRequired,
  setSelectedContractType: propTypes.func.isRequired,
  setLoading: propTypes.func.isRequired,
  contracts: propTypes.object.isRequired,
  getContracts: propTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  contracts: state.contracts,
});

export default connect(mapStateToProps, { getContractPositions, setSelectedContractType, setLoading, getContracts, setActiveWeek })(Contract);