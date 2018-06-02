import React from 'react';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import validate from './../../validation/UserValidation';
import CreateTextField from '../fields/CreateTextField';

const JoinForm = ({
  handleSubmit, reset, pristine, submitting, classes,
}) => (
  <div className={classes.container}>
    <h2 className="weight300">Join the community!!!</h2>
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
        <div className={classes.field}>
          <Field
            name="passwordConfirmation"
            type="password"
            label="Password confirmation"
            component={CreateTextField}
          />
        </div>
        <Button type="submit" variant="raised" color="primary" disabled={pristine || submitting} className={classes.button}>
                  Join
        </Button>
        <Button type="button" variant="raised" color="secondary" disabled={pristine || submitting} onClick={reset} className={classes.button}>
                  Clear values
        </Button>
        <div className={classes.field}>
          <Button type="link" color="primary">
            <Link to="/login" className="link--black">Already a member?</Link>
          </Button>
        </div>
      </form>
    </div>
  </div>
);

JoinForm.propTypes = {
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
    form: 'JoinForm',
    validate,
  }),
  withStyles(styles),
)(JoinForm);

