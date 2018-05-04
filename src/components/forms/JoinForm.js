import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import validate from './../../validation/UserValidation';
import CreateTextField from '../fields/CreateTextField';

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
        <div style={{ margin: '20px 0' }}>
          <Field
            name="passwordConfirmation"
            type="password"
            label="Password"
            component={CreateTextField}
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
