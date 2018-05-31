import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

const CreateTextField = ({
  input,
  label,
  type,
  fullWidth,
  meta: { touched, error },
  ...rest
}) => {
  const isError = !!error;
  return (
    <TextField
      label={label}
      fullWidth={fullWidth}
      type={type}
      error={touched && isError}
      helperText={error}
      {...input}
      {...rest}
    />
  );
};

CreateTextField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
};

CreateTextField.defaultProps = {
  fullWidth: true,
  meta: {
    touched: false,
    error: null,
  },
};

export default CreateTextField;
