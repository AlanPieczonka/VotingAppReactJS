import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
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
    <Grid container justify="center">
      <Grid item xs={12} md={8} lg={6}>
        <LoginForm
          onSubmit={handleSignIn}
        />
      </Grid>
    </Grid>
  );
};

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  showSnack: PropTypes.func.isRequired,
};

export default connect(null, { login, showSnack })(LoginPage);
