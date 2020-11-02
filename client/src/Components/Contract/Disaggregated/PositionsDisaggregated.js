import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import dateFormatter from '../../../helpers/dateFormatter';

const PositionsDisaggregated = (props) => {
  const [data, setData] = useState({});
  const options = {
    title: {
      display: false,
      text: 'POSITIONS',
      fontSize: 16
    },
    hover: {
      onHover: function (e) {
        var point = this.getElementAtEvent(e);
        if (point.length) e.target.style.cursor = 'pointer';
        else e.target.style.cursor = 'default';
      }
    },
    scales: {
      yAxes: [{
        stacked: false,
        ticks: { fontSize: 11, fontStyle: 'bold' },
      }],
      xAxes: [{
        stacked: true,
        ticks: { maxRotation: 45, minRotation: 45, fontSize: 11, fontStyle: 'bold' },
      }],
    },
  };

  useEffect(() => {

    const fillPositions = (data, timeRange) => {
      let newData = {
        labels: [],
        datasets: [
          { label: "Long", lineTension: 0, borderWidth: 1, borderColor: "#37517e", pointBackgroundColor: "#37517e", pointRadius: 1, backgroundColor: 'rgba(0, 0, 0, 0.0)', data: [] },
          { label: "Short", lineTension: 0, borderWidth: 1, borderColor: "#fcb22d", pointBackgroundColor: "#fcb22d", pointRadius: 1, backgroundColor: 'rgba(0, 0, 0, 0.0)', data: [] },
          { label: "Spreading", lineTension: 0, borderWidth: 1, borderColor: "#00a4df", pointBackgroundColor: "#00a4df", pointRadius: 1, backgroundColor: 'rgba(0, 0, 0, 0.0)', data: [] },
        ]
      };

      const rangedData = data.slice(-timeRange + 1);

      rangedData.forEach(position => {
        newData.labels.push(dateFormatter(position.As_of_Date_In_Form_YYMMDD, 'long'))
        let [longTotal, shortTotal, spreadTotal] = [0, 0, 0];

        if (props.classProdMerc) {
          longTotal += position.Prod_Merc_Positions_Long_ALL;
          shortTotal += position.Prod_Merc_Positions_Short_ALL;
        }
        if (props.classSwap) {
          longTotal += position.Swap_Positions_Long_All;
          shortTotal += position.Swap__Positions_Short_All;
          spreadTotal += position.Swap__Positions_Spread_All;
        }
        if (props.classMMoney) {
          longTotal += position.M_Money_Positions_Long_ALL;
          shortTotal += position.M_Money_Positions_Short_ALL;
          spreadTotal += position.M_Money_Positions_Spread_ALL;
        }
        if (props.classOtherRep) {
          longTotal += position.Other_Rept_Positions_Long_ALL;
          shortTotal += position.Other_Rept_Positions_Short_ALL;
          spreadTotal += position.Other_Rept_Positions_Spread_ALL;
        }
        if (props.classNonRep) {
          longTotal += position.NonRept_Positions_Long_All;
          shortTotal += position.NonRept_Positions_Short_All;
        }

        newData.datasets[0].data.push(longTotal);
        newData.datasets[1].data.push(shortTotal);
        newData.datasets[2].data.push(spreadTotal);

      });
      setData(newData);
    }

    fillPositions(props.contracts.selectedContractPositions, props.timeRange);
  }, [props]);


  const handleLineClick = (elems) => {
    if (elems.length > 0) {
      const elemIndex = elems[0]._index;
      const rawDate = elems[0]._xScale._ticks[elemIndex].value;
      props.handleWeekClick(rawDate);
      window.scrollTo(0, 0);
    }
  }

  return (
    <Line
      data={data}
      options={options}
      height={100}
      getElementAtEvent={(elems) => handleLineClick(elems)}
    />
  );
}


PositionsDisaggregated.propTypes = { contracts: propTypes.object.isRequired }

const mapStateToProps = (state) => ({
  contracts: state.contracts
});

export default connect(mapStateToProps)(PositionsDisaggregated);
