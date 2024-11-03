import { TIngredient } from '@utils-types';
import ingredientReducer, { initialState } from './ingredientsSlice';
import { getIngredients } from './ingredientsSlice';

describe(' tests', () => {
  const testIgr: TIngredient[] = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa093f',
      name: 'Мясо бессмертных моллюсков Protostomia',
      type: 'main',
      proteins: 433,
      fat: 244,
      carbohydrates: 33,
      calories: 420,
      price: 1337,
      image: 'https://code.s3.yandex.net/react/code/meat-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
    }
  ];

  test('ingredients pending', () => {
    const action = { type: getIngredients.pending.type, payload: testIgr };
    const state = ingredientReducer(initialState, action);

    expect(state.loading).toEqual(true);
    expect(state.error).toEqual(null);
  });

  test('ingredients rejected', () => {
    const error = 'err';
    const action = {
      type: getIngredients.rejected.type,
      error: { message: error }
    };
    const state = ingredientReducer(initialState, action);

    expect(state.loading).toEqual(false);
    expect(state.error).toEqual(error);
  });

  test('ingredients fulfilled', () => {
    const action = { type: getIngredients.fulfilled.type, payload: testIgr };
    const state = ingredientReducer(initialState, action);

    expect(state.loading).toEqual(false);
    expect(state.ingredients).toEqual(testIgr);
  });
});
