import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';

class MessageSnackbar extends React.Component {
  state = {
    open: true,
    vertical: 'top',
    horizontal: 'center',
  }
  handleClose = () => {
    this.setState({ open: false });
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
};

export default MessageSnackbar;
