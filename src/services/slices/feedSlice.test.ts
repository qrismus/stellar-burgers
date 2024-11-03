import { TOrdersData } from '@utils-types';
import feedReducer, { initialState } from './feedSlice';
import { getFeeds } from './feedSlice';

describe('tests', () => {
  test('getFeeds', () => {
    const testOrder: TOrdersData = {
      orders: [
        {
          _id: '6726afc3b27b06001c3e60c0',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa0946',
            '643d69a5c3f7b9001cfa093c'
          ],
          status: 'done',
          name: 'Краторный минеральный бургер',
          createdAt: '2024-11-02T23:03:31.941Z',
          updatedAt: '2024-11-02T23:03:32.894Z',
          number: 58487
        },
        {
          _id: '6726afa6b27b06001c3e60bf',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa0940',
            '643d69a5c3f7b9001cfa093c'
          ],
          status: 'done',
          name: 'Краторный метеоритный бургер',
          createdAt: '2024-11-02T23:03:02.994Z',
          updatedAt: '2024-11-02T23:03:03.801Z',
          number: 58486
        }
      ],
      total: 58113,
      totalToday: 94
    };

    const action = { type: getFeeds.fulfilled.type, payload: testOrder };
    const state = feedReducer(initialState, action);

    expect(state.orders).toEqual(testOrder.orders);
    expect(state.total).toBe(testOrder.total);
    expect(state.totalToday).toBe(testOrder.totalToday);
  });
});
