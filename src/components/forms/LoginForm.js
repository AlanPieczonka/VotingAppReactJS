import React from 'react';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import validate from './../../validation/UserValidation';
import CreateTextField from '../fields/CreateTextField';

const LoginForm = ({
  handleSubmit, reset, pristine, submitting, classes,
}) => (
  <div className={classes.container}>
    <h2 className="weight300">Login</h2>
    <div>
      <form onSubmit={handleSubmit}>
        <Field
          name="email"
          type="email"
          label="Email"
          component={CreateTextField}
        />
        <div className={classes.field}>
          <Field
            name="password"
            type="password"
            label="Password"
            component={CreateTextField}
          />
        </div>
        <Button type="submit" variant="raised" color="primary" disabled={pristine || submitting} className={classes.button}>
                  Login
        </Button>
        <Button type="button" variant="raised" color="secondary" disabled={pristine || submitting} onClick={reset} className={classes.button}>
                  Clear values
        </Button>
      </form>
    </div>
  </div>
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};

const styles = () => ({
  container: {
    padding: '5%',
  },
  field: {
    margin: '20px 0',
  },
  button: {
    margin: '0 5px !important',
  },
});

export default compose(
  reduxForm({
    form: 'LoginForm',
    validate,
  }),
  withStyles(styles),
)(LoginForm);

// export default reduxForm({
//   form: 'LoginForm',
//   validate,
// })(LoginForm);
