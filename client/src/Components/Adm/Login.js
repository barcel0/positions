import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { login } from '../../actions/authActions';

const Login = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const error = props.error;
    if (error) {
      if (error.id === 'LOGIN_FAIL') {
        setMsg(error.msg.msg);
      } else {
        setMsg(null);
      }
    }
  }, [props.error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.login({ email, password });
  }

  const handleInputChange = (input, e) => {
    if (e.target.value.length > 2) {
      switch (input) {
        case 'email':
          setEmail(e.target.value);
          break;
        case 'password':
          setPassword(e.target.value);
          break;
        default:
          return true;
      }
    }
  }

  return (
    <main>
      <section>
        <div className="box-white column-layout">
          {msg ? <span>{msg}</span> : null}
          <form onSubmit={(e) => handleSubmit(e)} autocomplete="on" className="narrow-form">
            <input type="text" name="email" placeholder="email" autocomplete="current-email" onChange={(e) => handleInputChange('email', e)} />
            <input type="password" name="password" placeholder="password" autocomplete="current-password" onChange={(e) => handleInputChange('password', e)} />
            <input type="submit" value="Login" className="btn btn-unactive" />
          </form>
        </div>
      </section>
    </main>
  );

}

Login.propTypes = {
  isAuthenticated: propTypes.bool.isRequired,
  login: propTypes.func.isRequired,
  clearErrors: propTypes.func.isRequired,
  error: propTypes.object.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

export default connect(mapStateToProps, { login })(Login);