import { TUser } from '@utils-types';
import { setUser, setIsAuthChecked } from './userSlice';
import { loginUser, logoutUser, registerUser, updateUser } from './actions';
import userReducer, { initialState } from './userSlice';

describe('user', () => {
  test('setUser', () => {
    const testUser: TUser = {
      name: 'K',
      email: '11111@qwerty.ru'
    };
    const action = { type: setUser.type, payload: testUser };
    const state = userReducer(initialState, action);

    expect(state.user).toEqual(testUser);
  });

  test('setIsAuthChecked', () => {
    const action = { type: setIsAuthChecked.type, payload: true };
    const state = userReducer(initialState, action);

    expect(state.isAuthChecked).toEqual(true);
  });

  test('registerUser rejected', () => {
    const action = { type: registerUser.rejected.type };
    const state = userReducer(initialState, action);

    expect(state.isAuthChecked).toEqual(false);
  });

  test('registerUser fulfilled', () => {
    const user: TUser = {
      name: 'K',
      email: '11111@qwerty.ru'
    };
    const action = {
      type: registerUser.fulfilled.type,
      payload: { user: user }
    };
    const state = userReducer(initialState, action);

    expect(state.user).toEqual(user);
    expect(state.isAuthChecked).toEqual(true);
  });

  test('loginUser rejected', () => {
    const action = { type: loginUser.rejected.type };
    const state = userReducer(initialState, action);

    expect(state.isAuthChecked).toEqual(false);
  });

  test('loginUser fulfilled', () => {
    const user: TUser = {
      name: 'K',
      email: '11111@qwerty.ru'
    };
    const action = { type: loginUser.fulfilled.type, payload: user };
    const state = userReducer(initialState, action);

    expect(state.user).toEqual(user);
    expect(state.isAuthChecked).toEqual(true);
  });

  test('logoutUser fulfilled', () => {
    const action = { type: logoutUser.fulfilled.type };
    const state = userReducer(initialState, action);

    expect(state.user).toBeNull();
  });

  test('updateUser fulfilled', () => {
    const user: TUser = {
      name: 'K',
      email: '11111@qwerty.ru'
    };
    const action = { type: updateUser.fulfilled.type, payload: user };
    const state = userReducer(initialState, action);

    expect(state.user).toEqual(user);
  });
});
