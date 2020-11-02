import React, { useState, useEffect } from 'react';
import SettingsIcon from '../Icons/SettingsIcon';
import EyeIcon from '../Icons/EyeIcon';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { logout } from '../../actions/authActions';
import { parsePositions } from '../../actions/adminActions';
import { clearErrors } from '../../actions/errorActions';

const AdmPanel = (props) => {
  const [positions, setPositions] = useState([]);
  const [parseCategory, setParseCategory] = useState('');
  const clearErrors = props.clearErrors;
  useEffect(() => {

    clearErrors();
  }, [clearErrors]);

  const handleInputChange = (e) => {
    setPositions(e.target.value);
  }

  const handleParseSubmit = (e) => {
    e.preventDefault();
    props.clearErrors();
    props.parsePositions(positions, parseCategory);
  }

  const serveError = () => {
    if (props.error.status) {
      return (
        <section>
          <div className="box-white column-layout">
            <h4>Something went wrong! <span style={{ cursor: 'pointer' }} onClick={props.clearErrors}>[Dismiss]</span></h4>
            <ul style={{ fontSize: '0.8rem' }}>
              <li>Message: {props.error.msg}</li>
              <li>Status: {props.error.status}</li>
              <li>ID: {props.error.id}</li>
            </ul>
          </div>
        </section>
      )
    }
  }

  const serveParserLog = () => {
    if (Array.isArray(props.parser.log)) {
      const data = props.parser.log;
      const formattedArr = data.map(logLine => <li style={{ fontSize: '0.8rem' }}>{logLine}</li>);
      return (
        <div>
          <h3>Parsing done:</h3>
          <ul>
            {formattedArr}
          </ul>
        </div>
      );
    } else if (props.parser.log === 'Loading...' && !props.error.status) {
      return (
        <div>
          <h3>Parsing in progress...</h3>
        </div>
      )
    }
  }

  return (
    <main>

      <section>
        <div className="contract-header">
          <div className="contract-header-icon">
            <SettingsIcon />
          </div>
          <div className="contract-header-content">
            <div className="contract-header-main-row">
              <h1>Adm stuff</h1>
              <span onClick={props.logout}>Logout</span>
            </div>

          </div>
        </div>
      </section>

      {serveError()}
      <section>
        <div className="box-white column-layout">

          <div className="box-header">
            <div className="box-title">
              <EyeIcon />
              <h2>Weekly Data Parser</h2>
            </div>
          </div>

          <div className="parser-container">
            <h3>Chose Category, Paste JSON data, Click Parse, Cross fingers.</h3>

            <form onSubmit={(e) => handleParseSubmit(e)} action={`http://localhost:3001/api/admin/parser/${parseCategory}`} method='POST'>
              <input type="submit" value="Parse" className="data-url-submit" />
              <select name="category" id="category-select" onChange={(e) => setParseCategory(e.target.value)}>
                <option value="">Choose Category</option>
                <option value="financial" >Financial</option>
                <option value="disaggregated">Disaggregated</option>
              </select>
              <textarea name="data" id="data" rows={30} placeholder="Paste JSON here" onChange={(e) => handleInputChange(e)}></textarea>
            </form>

            {serveParserLog()}


          </div>

        </div>
      </section>



    </main>
  );

}

AdmPanel.propTypes = {
  isAuthenticated: propTypes.bool.isRequired,
  logout: propTypes.func.isRequired,
  parsePositions: propTypes.func.isRequired,
  clearErrors: propTypes.func.isRequired,
  error: propTypes.object.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  parser: state.parser,
  error: state.error,
})

export default connect(mapStateToProps, { logout, parsePositions, clearErrors })(AdmPanel);