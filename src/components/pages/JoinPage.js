import React from 'react';
import { reduxForm } from 'redux-form';
import JoinForm from '../forms/JoinForm';

export const JoinPage = ({ handleSubmit }) => {
  const submitForm = (formValues) => {
    console.log('submitting form: ', formValues);
  };

  return (
    <JoinForm
      onSubmit={submitForm}
      handleSubmit={handleSubmit}
    />
  );
};

export default reduxForm({
  form: 'JoinForm',
})(JoinPage);
