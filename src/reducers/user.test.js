import reducer from './user';

const fakeCredentials = {
  email: 'example@email.com',
  password: '123456',
};

describe('User reducer', () => {
  test('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });
  test('handles USER_LOGGED_IN', () => {
    const loginAction = {
      type: 'USER_LOGGED_IN',
      user: fakeCredentials,
    };
    expect(reducer({}, loginAction)).toEqual(fakeCredentials);
  });
  test('handles USER_LOGGED_OUT', () => {
    expect(reducer({}, { type: 'USER_LOGGED_OUT' })).toEqual({});
  });
});
