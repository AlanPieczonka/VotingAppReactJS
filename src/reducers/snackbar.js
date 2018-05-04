export default function snackbar(state = '', action = {}) {
  switch (action.type) {
    case 'SHOW_SNACKBAR':
      return action.text;
    case 'CLOSE_SNACKBAR':
      return '';
    default:
      return state;
  }
}
