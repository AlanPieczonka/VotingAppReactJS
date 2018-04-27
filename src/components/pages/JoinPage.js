import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import JoinForm from '../forms/JoinForm';

export const JoinPage = ({ handleSubmit }) => {
  const submitForm = (values) => {
    console.log('Form values: ', values);
  };

  return (
    <JoinForm
      onSubmit={submitForm}
      handleSubmit={handleSubmit}
    />
  );
};

JoinPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'JoinForm',
})(JoinPage);
