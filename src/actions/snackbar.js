export const showSnackbar = message => ({
  type: 'SHOW_SNACKBAR',
  message,
});

export const closeSnackbar = () => ({
  type: 'CLOSE_SNACKBAR',
});

export const showSnack = message => dispatch => dispatch(showSnackbar(message));

