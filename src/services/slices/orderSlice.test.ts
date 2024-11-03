import orderReducer, { initialState } from './orderSlice';
import { getOrders, closeOrderNumberModal, orderBurger } from './orderSlice';

describe('tests', () => {
  const testOrder = {
    ...initialState,
    success: true,
    name: 'Краторный spicy минеральный бургер',
    order: {
      ingredients: [],
      _id: '67265bb6b27b06001c3e5f9f',
      status: 'done',
      name: 'Краторный spicy минеральный бургер',
      createdAt: '2024-11-02T17:04:54.323Z',
      updatedAt: '2024-11-02T17:04:55.190Z',
      number: 58467
    }
  };

  test('closeOrderNumberModal', () => {
    const action = { type: closeOrderNumberModal.type };
    const state = orderReducer(initialState, action);

    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toBeNull();
  });

  test('orderBurger pending', () => {
    const action = { type: orderBurger.pending.type, payload: testOrder };
    const state = orderReducer(initialState, action);

    expect(state.orderRequest).toEqual(true);
  });

  test('orderBurger rejected', () => {
    const action = { type: orderBurger.rejected.type, payload: testOrder };
    const state = orderReducer(initialState, action);

    expect(state.orderRequest).toEqual(false);
  });

  test('orderBurger fulfilled', () => {
    const action = { type: orderBurger.fulfilled.type, payload: testOrder };
    const state = orderReducer(initialState, action);

    expect(state.orderRequest).toEqual(false);
    expect(state.orderModalData).toEqual(testOrder);
  });

  test('getOrders fulfilled', () => {
    const action = { type: getOrders.fulfilled.type, payload: testOrder };
    const state = orderReducer(initialState, action);

    expect(state.userOrders).toEqual(testOrder);
  });
});
