import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import JoinForm from '../forms/JoinForm';
import { signup } from '../../actions/join';
import { showSnack } from '../../actions/snackbar';

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
    <Fragment>
      <JoinForm
        onSubmit={handleSignIn}
      />
    </Fragment>
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
