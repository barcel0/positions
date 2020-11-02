import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { getContracts, getTopContracts, setLoading } from '../../actions/contractActions';
import propTypes from 'prop-types';
import TopContracts from './TopContracts';
import SearchBar from './SearchBar';
import ContractList from './ContractList';
import ReactGA from 'react-ga';

const Main = (props) => {
  const setLoading = props.setLoading;
  const getContracts = props.getContracts;

  useEffect(() => {
    setLoading(true);
    getContracts();
    ReactGA.initialize('UA-164495098-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [setLoading, getContracts]);

  const serveContent = () => {
    if (props.contracts.loading === false) {
      return (
        <div>
          <Helmet>
            <title>Commitments of Traders - tradersCMT</title>
            <meta name="description" content="Easy to read commitments of traders. Weekly report, detailed data and charts of every futures contract reported by the Commodity Futures Trading Commission." />
          </Helmet>
          <main>
            <section>
              <TopContracts />
            </section>
            <section>
              <SearchBar />
              <ContractList />
            </section>
          </main>
        </div>
      );
    } else {
      return (
        <div>
          <Helmet>
            <title>Loading... - Commitments of Traders - tradersCMT</title>
            <meta name="description" content="Easy to read commitments of traders. Weekly report, detailed data and charts of every futures contract reported by the Commodity Futures Trading Commission." />
          </Helmet>
          <main>
            <section>
              <div className="spinner">
                <div className="rect1"></div>
                <div className="rect2"></div>
                <div className="rect3"></div>
                <div className="rect4"></div>
                <div className="rect5"></div>
              </div>
            </section>
          </main>
        </div>
      );
    }
  }
  return serveContent();
}

Main.propTypes = {
  getContracts: propTypes.func.isRequired,
  contracts: propTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  contracts: state.contracts,
});

export default connect(mapStateToProps, { getContracts, getTopContracts, setLoading })(Main);