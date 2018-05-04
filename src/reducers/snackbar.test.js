import reducer from './snackbar';

const testAction = {
  type: 'SHOW_SNACKBAR',
  message: 'This is a test message',
};

describe('User reducer', () => {
  test('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual('');
  });
  test('handles SHOW_SNACKBAR', () => {
    expect(reducer({}, testAction)).toEqual(testAction.message);
  });
  test('handles CLOSE_SNACKBAR', () => {
    expect(reducer({}, { type: 'CLOSE_SNACKBAR' })).toEqual('');
  });
});
