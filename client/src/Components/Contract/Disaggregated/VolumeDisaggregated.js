import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import dateFormatter from '../../../helpers/dateFormatter';


const VolumeDisaggregated = (props) => {
  const [data, setData] = useState({});
  const options = {
    title: {
      display: false,
      text: 'VOLUME',
      fontSize: 16,
    },
    legend: {
      display: false
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
        stacked: true,
        ticks: { fontSize: 11, fontStyle: 'bold' },
      }],
      xAxes: [{
        stacked: true,
        ticks: { maxRotation: 45, minRotation: 45, fontSize: 11, fontStyle: 'bold' },
      }]
    },
    onClick: {}
  };

  useEffect(() => {

    const fillPositions = (data, timeRange) => {
      let newData = {
        labels: [],
        datasets: [
          { label: "Long", backgroundColor: "#37517e", data: [] },
          { label: "Short", backgroundColor: "#fcb22d", data: [] },
          { label: "Spreading", backgroundColor: "#00a4df", data: [] },
        ]
      };

      const rangedData = data.slice(-timeRange + 1);
      rangedData.forEach(position => {
        newData.labels.push(dateFormatter(position.As_of_Date_In_Form_YYMMDD, 'long'));
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
    };

    fillPositions(props.contracts.selectedContractPositions, props.timeRange);
  }, [props]);

  const handleBarClick = (elems) => {
    if (elems.length > 0) {
      const rawDate = elems[0]._model.label;
      console.log(rawDate); //debug
      props.handleWeekClick(rawDate);
      window.scrollTo(0, 0);
    }
  };

  return (
    <Bar
      data={data}
      height={50}
      options={options}
      getElementAtEvent={(elems) => handleBarClick(elems)}
    />
  );
};

VolumeDisaggregated.propTypes = { contracts: propTypes.object.isRequired }

const mapStateToProps = (state) => ({
  contracts: state.contracts
});

export default connect(mapStateToProps)(VolumeDisaggregated);