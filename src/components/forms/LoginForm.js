import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import validate from './../../validation/UserValidation';
import CreateTextField from '../fields/CreateTextField';

const LoginForm = ({
  handleSubmit, reset, pristine, submitting,
}) => (
  <div style={{ border: '2px solid black', padding: '5%' }}>
    <h2 className="weight300">This is LoginForm</h2>
    <div>
      <form onSubmit={handleSubmit}>
        <Field
          name="email"
          type="email"
          label="Email"
          component={CreateTextField}
        />
        <div style={{ margin: '20px 0' }}>
          <Field
            name="password"
            type="password"
            label="Password"
            component={CreateTextField}
          />
        </div>
        <Button type="submit" variant="raised" color="primary" disabled={pristine || submitting}>
                  Login
        </Button>
        <Button type="button" variant="raised" color="secondary" disabled={pristine || submitting} onClick={reset}>
                  Clear values
        </Button>
        <p><Link to="/join" className="link--black">Never been to Voting App?</Link></p>
      </form>
    </div>
  </div>
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'LoginForm',
  validate,
})(LoginForm);
