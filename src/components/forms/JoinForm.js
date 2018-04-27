import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import validate from './../../validation/UserValidation';

const createTextField = ({
  input,
  label,
  type,
  fullWidth = true,
  meta: { touched, error },
}) => (
  <TextField
    label={label}
    fullWidth={fullWidth}
    type={type}
    error={touched && error}
    helperText={error}
    {...input}
  />
);

const JoinForm = ({
  handleSubmit, onSubmit, pristine, reset, submitting,
}) => (
  <div style={{ border: '2px solid black', padding: '5%' }}>
    <h2 className="weight300">This is JoinForm</h2>
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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

export default reduxForm({
  form: 'JoinForm',
  validate,
})(JoinForm);
