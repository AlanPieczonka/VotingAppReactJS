export default function (values) {
  const errors = {};
  const requiredFields = [
    'title',
  ];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (
    values.title &&
    values.title.length < 5
  ) {
    errors.title = 'Title should be at least 5 characters long';
  }
  if (
    values.title &&
    values.title.length >= 100
  ) {
    errors.title = 'Title should be max 100 characters long';
  }
  return errors;
}
