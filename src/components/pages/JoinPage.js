import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import JoinForm from '../forms/JoinForm';
import { signup } from '../../actions/join';
import { showSnack } from '../../actions/snackbar';
import Grid from '@material-ui/core/Grid'

const JoinPage = (props) => {
  const handleSignIn = (values) => {
    props.signup(values)
      .then(() => {
        props.history.push('/');
        props.showSnack('You have successfully created account!')
      })
      .catch((err) => {
        props.showSnack(
          err.response !== undefined
            ? err.response.data.errors.email
            : 'There has been an error!',
        );
      });
  };
  return (
    <Grid container justify="center">
      <Grid item xs={12} md={8} lg={6}>
        <JoinForm
          onSubmit={handleSignIn}
        />
      </Grid>
    </Grid>
  );
};

JoinPage.propTypes = {
  signup: PropTypes.func.isRequired,
  showSnack: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, { signup, showSnack })(JoinPage);
