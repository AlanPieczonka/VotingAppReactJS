import { SHOW_SNACKBAR, CLOSE_SNACKBAR } from '../types';

export default function snackbar(state = '', action = {}) {
  switch (action.type) {
    case SHOW_SNACKBAR:
      return action.message;
    case CLOSE_SNACKBAR:
      return '';
    default:
      return state;
  }
}
