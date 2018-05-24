import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { closeSnackbar } from '../../actions/snackbar';

class MessageSnackbar extends Component {
  state = {
    open: true,
    vertical: 'top',
    horizontal: 'center',
  }
  handleClose = () => {
    this.setState({ open: false });
    this.props.closeSnackbar();
  }
  render() {
    const { open, vertical, horizontal } = this.state;
    const { message } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={this.handleClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{message}</span>}
        />
      </div>
    );
  }
}

MessageSnackbar.propTypes = {
  message: PropTypes.string.isRequired,
  closeSnackbar: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeSnackbar: () => dispatch(closeSnackbar()),
  }
};

export default connect(null, mapDispatchToProps)(MessageSnackbar);
