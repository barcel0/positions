import React, { useState, useEffect } from 'react';
import numbersWithCommas from '../../helpers/numberWithCommas';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import tooltipDesc from '../../helpers/tooltipDesc';
import InfoIcon from '../Icons/InfoIcon';

const DoughtnutChart = (props) => {

  useEffect(() => {
    setTitle(props.title);
  }, [props.title]);

  const [title, setTitle] = useState('');
  const options = {
    circumference: 1 * Math.PI,
    rotation: 1 * Math.PI,
    cutoutPercentage: 60,
    legend: {
      display: false
    }
  };

  const data = {
    labels: ["Long", "Short", "Spreading"],
    datasets: [{
      backgroundColor: ["#37517e", "#fcb22d", "#00a4df"],
      data: props.week.positions
    }]
  };

  const percentage = (total, change) => {
    const value = ((change * 100) / total).toFixed(2)
    if (value > 0) {
      return (<span className="data-positive">+{value}%</span>);
    } else if (value < 0) {
      return (<span className="data-negative">{value}%</span>);
    } else if (value === 0) {
      return (<span>{value}%</span>);
    } else {
      return (<span>0.00%</span>);
    }
  }

  const setDataColor = (data) => {
    if (data > 0) {
      return (<span className="data-positive">+{numbersWithCommas(data)}</span>)
    } else if (data < 0) {
      return (<span className="data-negative">{numbersWithCommas(data)}</span>)
    } else {
      return (<span>{data}</span>)
    }
  }

  const setTooltipDesc = (type) => {
    switch (type) {
      case 'Prod / Merch / Proc / User':
        return tooltipDesc.disaggregated.prodMerc;
      case 'Swap Dealers':
        return tooltipDesc.disaggregated.swapDealier;
      case 'Managed Money':
        return tooltipDesc.disaggregated.moneyManager;
      case 'Other Reportables':
        return tooltipDesc.disaggregated.otherReportables;
      case 'Nonreportable Positions':
        return tooltipDesc.disaggregated.nonReportable;
      case 'Dealer Intermediary':
        return tooltipDesc.financial.dealer;
      case 'Asset Mger / Institutional':
        return tooltipDesc.financial.assetMgr;
      case 'Leveraged Funds':
        return tooltipDesc.financial.levFunds;
      default:
        return '';
    }
  }

  return (

    <li className="trader-card">
      <div className="trader-chart">
        <Doughnut data={data} options={options} />
      </div>
      <div className="trader-card-title">
        <h3>{title}</h3><span data-tip={setTooltipDesc(title)}><InfoIcon /></span>
      </div>

      <div className="trader-data-section">
        <h4>Positions</h4>
        <ul>
          <li><span>Long</span> <span>{numbersWithCommas(props.week.positions[0])}</span></li>
          <li><span>Short</span> <span>{numbersWithCommas(props.week.positions[1])}</span></li>
          <li><span>Spreading</span> <span>{numbersWithCommas(props.week.positions[2])}</span></li>
        </ul>
      </div>
      <div className="trader-data-section">
        <h4>Change</h4>
        <ul>
          <li>
            <span>Long</span>
            <span>{setDataColor(props.week.changes[0])} ({percentage(props.week.positions[0], props.week.changes[0])})</span>
          </li>
          <li>
            <span>Short</span>
            <span>{setDataColor(props.week.changes[1])} ({percentage(props.week.positions[1], props.week.changes[1])})</span>
          </li>
          <li>
            <span>Spreading</span>
            <span>{setDataColor(props.week.changes[2])} ({percentage(props.week.positions[2], props.week.changes[2])})</span>
          </li>
        </ul>
      </div>
      <div className="trader-data-section">
        <h4>Open Interest</h4>
        <ul>
          <li><span>Long</span> <span>{props.week.openInterest[0]}%</span></li>
          <li><span>Short</span> <span>{props.week.openInterest[1]}%</span></li>
          <li><span>Spreading</span> <span>{props.week.openInterest[2]}%</span></li>
        </ul>
      </div>
      <div className="trader-data-section">
        <h4>Traders</h4>
        <ul>
          <li><span>Long</span> <span>{props.week.traders[0]}</span></li>
          <li><span>Short</span> <span>{props.week.traders[1]}</span></li>
          <li><span>Spreading</span> <span>{props.week.traders[2]}</span></li>
        </ul>
      </div>
    </li>

  );
}

DoughtnutChart.propTypes = {
  contracts: propTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  contracts: state.contracts
});

export default connect(mapStateToProps)(DoughtnutChart);