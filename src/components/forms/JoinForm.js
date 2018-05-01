import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import validate from './../../validation/UserValidation';

const createTextField = ({
  input,
  label,
  type,
  fullWidth,
  meta: { touched, error },
}) => {
  const isError = !!error;
  return (
    <TextField
      label={label}
      fullWidth={fullWidth}
      type={type}
      error={touched && isError}
      helperText={error}
      {...input}
    />
  );
};

createTextField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
};

createTextField.defaultProps = {
  fullWidth: true,
  meta: {
    touched: false,
    error: null,
  },
};

const JoinForm = ({
  handleSubmit, reset, pristine, submitting,
}) => (
  <div style={{ border: '2px solid black', padding: '5%' }}>
    <h2 className="weight300">This is JoinForm</h2>
    <div>
      <form onSubmit={handleSubmit}>
        <Field
          name="email"
          type="email"
          label="Email"
          component={createTextField}
        />
        <div style={{ margin: '20px 0' }}>
          <Field
            name="password"
            type="password"
            label="Password"
            component={createTextField}
          />
        </div>
        <div style={{ margin: '20px 0' }}>
          <Field
            name="passwordConfirmation"
            type="password"
            label="Password"
            component={createTextField}
          />
        </div>
        <Button type="submit" variant="raised" color="primary" disabled={pristine || submitting}>
                  Join
        </Button>
        <Button type="button" variant="raised" color="secondary" disabled={pristine || submitting} onClick={reset}>
                  Clear values
        </Button>
        <p><Link to="/login" className="link--black">Already a member?</Link></p>
      </form>
    </div>
  </div>
);

JoinForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'JoinForm',
  validate,
})(JoinForm);
