import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginForm from '../forms/LoginForm';
import { login } from '../../actions/auth';
import { showSnack } from '../../actions/snackbar';

const LoginPage = (props) => {
  const handleSignIn = (values) => {
    props.login(values)
      .then(() => {
        props.history.push('/');
        props.showSnack('You have successfully logged in!');
      })
      .catch((err) => {
        props.showSnack(
          err.response !== undefined
            ? err.response.data.errors.global
            : 'There has been an error!',
        );
      });
  };
  return (
    <Fragment>
      <LoginForm
        onSubmit={handleSignIn}
      />
    </Fragment>
  );
};

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  showSnack: PropTypes.func.isRequired,
};

export default connect(null, { login, showSnack })(LoginPage);
