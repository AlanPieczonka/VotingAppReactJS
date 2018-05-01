import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import JoinForm from '../forms/JoinForm';
import { signup } from '../../actions/join';
import MessageSnackbar from '../messages/MessageSnackbar';

class JoinPage extends Component {
  state = {
    error: false,
  }
  handleSignIn = (values) => {
    this.props.signup(values)
      .then(() => this.props.history.push('/'))
      .catch((err) => {
        const error = err.response.data.errors.email || 'There has been an error';
        this.setState({ error });
      });
  }
  render() {
    const { error } = this.state;
    return (
      <Fragment>
        {error && <MessageSnackbar message={error} /> }
        <JoinForm
          onSubmit={this.handleSignIn}
        />
      </Fragment>
    );
  }
}

JoinPage.propTypes = {
  signup: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, { signup })(JoinPage);
