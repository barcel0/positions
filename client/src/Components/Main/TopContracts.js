import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTopContracts } from '../../actions/contractActions';
import { Link } from 'react-router-dom';
import numbersWithCommas from '../../helpers/numberWithCommas';
import HotIcon from '../Icons/HotIcon';
import FileIcon from '../Icons/FileIcon';

const TopContracts = (props) => {
    const getTopContracts = props.getTopContracts;
    useEffect(() => {

        getTopContracts();
    }, [getTopContracts]);

    const serveChangeData = (data) => {
        if (data > 0) {
            return <span className='data-positive'>+{numbersWithCommas(data)}</span>;
        } else if (data < 0) {
            return <span className='data-negative'>{numbersWithCommas(data)}</span>;
        } else {
            return <span>0</span>
        }
    }

    const serveTopContractsList = (list, maxItems) => {
        if (list) {
            const formattedTopList = list.map(item => {
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
            return formattedTopList;
        }

    }

    return (
        <div className="box-white column-layout">
            <div className="box-header">
                <div className="box-title">
                    <HotIcon />
                    <h2>Popular Contracts</h2>
                </div>


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
                {serveTopContractsList(props.topContracts)}
            </ul>

        </div>
    );

}

const mapStateToProps = (state) => ({
    topContracts: state.contracts.top,
});

export default connect(mapStateToProps, { getTopContracts })(TopContracts);