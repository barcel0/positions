import React from 'react';
import { connect } from 'react-redux';
import { setActiveWeek } from '../../actions/contractActions';
import propTypes from 'prop-types';

import DoughnutChart from './DoughnutChart';
import getWeekRange from '../../helpers/getWeekRange';
import CalendarIcon from '../Icons/CalendarIcon';
import ChevronsLeftIcon from '../Icons/ChevronsLeftIcon';
import ChevronsRightIcon from '../Icons/ChevronsRightIcon';

const Weekly = (props) => {
  const activeWeek = props.contracts.selectedContractActiveWeek;
  const activeWeekIndex = props.contracts.selectedContractActiveWeek.weekIndex;
  const mostRecentWeekIndex = props.contracts.selectedContractPositions.length - 1;
  const category = props.contracts.selectedContractActiveWeek.category;
  const data = props.contracts.selectedContractPositions;

  const serveNavigationButtons = () => {
    return (
      <div className="box-filters">
        <div className={"btn " + (activeWeekIndex <= 0 ? 'btn-deactivated' : 'btn-unactive')} onClick={() => handleNavigationClick('backward')}><ChevronsLeftIcon />Backward</div>
        <div className={"btn " + (activeWeekIndex >= mostRecentWeekIndex ? 'btn-deactivated' : 'btn-unactive')} onClick={() => handleNavigationClick('forward')}>Forward<ChevronsRightIcon /></div>
      </div>
    );
  }

  const handleNavigationClick = (direction) => {
    if (direction === 'forward' && activeWeekIndex < mostRecentWeekIndex) {
      props.setActiveWeek(category, data, activeWeekIndex + 1);
    } else if (direction === 'backward' && activeWeekIndex > 0) {
      props.setActiveWeek(category, data, activeWeekIndex - 1);
    }
  }

  const serveDoughnuts = (category) => {
    if (category === 'financial') {
      return (
        <ul className="trader-container">
          <DoughnutChart title={'Dealer Intermediary'} week={activeWeek.dealer} />
          <DoughnutChart title={'Asset Mger / Institutional'} week={activeWeek.assetMgr} />
          <DoughnutChart title={'Leveraged Funds'} week={activeWeek.levFunds} />
          <DoughnutChart title={'Other Reportables'} week={activeWeek.otherRep} />
          <DoughnutChart title={'Nonreportable Positions'} week={activeWeek.nonRep} />
        </ul>
      );
    } else if (category === 'disaggregated') {
      return (
        <ul className="trader-container">
          <DoughnutChart title={'Prod / Merch / Proc / User'} week={activeWeek.prodMerc} />
          <DoughnutChart title={'Swap Dealers'} week={activeWeek.swap} />
          <DoughnutChart title={'Managed Money'} week={activeWeek.mMoney} />
          <DoughnutChart title={'Other Reportables'} week={activeWeek.otherRep} />
          <DoughnutChart title={'Nonreportable Positions'} week={activeWeek.nonRep} />
        </ul>
      );
    }
  }

  return (
    <section>
      <div className="box-white column-layout">
        <div className="box-header" >
          <div className="box-title">
            <CalendarIcon />
            <h2>Weekly Report: {getWeekRange(activeWeek.date)}</h2>

          </div>
          {serveNavigationButtons()}
        </div>
        {serveDoughnuts(category)}
      </div>
    </section>
  );
}

Weekly.propTypes = {
  setActiveWeek: propTypes.func.isRequired,
  contracts: propTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  contracts: state.contracts
});

export default connect(mapStateToProps, { setActiveWeek })(Weekly);