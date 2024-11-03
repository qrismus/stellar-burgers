import { initialState as ingredientsReducerState } from './slices/ingredientsSlice';
import { initialState as constructorReducerState } from './slices/burgerConstructorSlice';
import { initialState as usersReducerState } from './slices/userSlice';
import { initialState as ordersReducerState } from './slices/orderSlice';
import { initialState as feedsReducerState } from './slices/feedSlice';
import { rootReducer } from './store';

const testState = {
  burgerConstructor: constructorReducerState,
  feed: feedsReducerState,
  ingredients: ingredientsReducerState,
  order: ordersReducerState,
  user: usersReducerState
};

describe('проверка', () => {
  test('проверяем состояние state', () => {
    const test = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(test).toEqual(testState);
  });
});
