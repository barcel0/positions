import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import AdmPanel from './AdmPanel';
import Login from './Login';
// import Register from './Register';


const Adm = (props) => {

  const serveContent = () => {
    if (props.isAuthenticated) {
      return <AdmPanel />;
    } else {
      return <Login />;
      // return <Register />;
    }
  }

  return serveContent();

}

Adm.propTypes = {
  isAuthenticated: propTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, {})(Adm);