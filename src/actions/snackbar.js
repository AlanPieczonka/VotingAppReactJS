export const showSnackbar = text => ({
  type: 'SHOW_SNACKBAR',
  text,
});

export const closeSnackbar = () => ({
  type: 'CLOSE_SNACKBAR',
});

export const showSnack = text => dispatch => dispatch(showSnackbar(text));

