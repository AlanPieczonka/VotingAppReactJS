export default function (values) {
  // debugger;
  const errors = {};
  const requiredFields = [
    'email',
    'password',
    'passwordConfirmation',
  ];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (
    values.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address!!!';
  }
  if (
    values.password &&
        values.password.length < 6
  ) {
    errors.password = 'Password should be at least 6 characters long';
  }
  if (
    values.password &&
        values.passwordConfirmation &&
        values.password !== values.passwordConfirmation
  ) {
    errors.passwordConfirmation = 'Password confirmation does not match password!';
  }
  return errors;
}
