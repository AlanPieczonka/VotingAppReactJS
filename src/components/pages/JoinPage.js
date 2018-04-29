import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import JoinForm from '../forms/JoinForm';
import { signup } from '../../actions/join';

const JoinPage = (props) => {
  const handleSignIn = values => props.signup(values).then(props.history.push('/'));
  return (
    <JoinForm
      onSubmit={handleSignIn}
    />
  );
};

JoinPage.propTypes = {
  signup: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, { signup })(JoinPage);
