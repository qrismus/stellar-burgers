import { TBurgerConstructorState } from './burgerConstructorSlice';
import { TIngredient } from '@utils-types';
import burgerConstructorReducer, {
  addIngredient,
  removeIngredient,
  resetConstructor
} from './burgerConstructorSlice';

describe('tests', () => {
  const initialState: TBurgerConstructorState = {
    bun: null,
    ingredients: []
  };
  const stateWithData: TBurgerConstructorState = {
    bun: {
      id: '643d69a5c3f7b9001cfa093c',
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
    ingredients: [
      {
        id: '643d69a5c3f7b9001cfa0941',
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      },
      {
        id: '643d69a5c3f7b9001cfa093e',
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
      }
    ]
  };

  test('добавление булки', () => {
    const oldBun: TIngredient = {
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
    };
    const newBun: TIngredient = {
      _id: '643d69a5c3f7b9001cfa093d',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
    };

    let action = { type: addIngredient.type, payload: oldBun };
    let state = burgerConstructorReducer(initialState, action);
    expect(state.bun?._id).toEqual(oldBun._id);

    action = { type: addIngredient.type, payload: newBun };
    state = burgerConstructorReducer(initialState, action);
    expect(state.bun?._id).toEqual(newBun._id);
  });

  test('добавление других ингредиентов', () => {
    const newMain = {
      _id: '643d69a5c3f7b9001cfa0946',
      name: 'Хрустящие минеральные кольца',
      type: 'main',
      proteins: 808,
      fat: 689,
      carbohydrates: 609,
      calories: 986,
      price: 300,
      image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
      image_mobile:
        'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
      image_large:
        'https://code.s3.yandex.net/react/code/mineral_rings-large.png'
    };

    const action = { type: addIngredient.type, payload: newMain };
    const state = burgerConstructorReducer(initialState, action);

    expect(state.ingredients.length).toBe(1);
  });

  test('удаление ингредиента', () => {
    const ingredientToRemove = stateWithData.ingredients[1];
    const action = { type: removeIngredient.type, payload: ingredientToRemove };
    const state = burgerConstructorReducer(stateWithData, action);

    expect(state.ingredients.length).toBe(1);
    expect(
      state.ingredients.some((ing) => ing.id === ingredientToRemove.id)
    ).toBe(false);
  });

  test('очистить конструктор', () => {
    const action = { type: resetConstructor.type };
    const state = burgerConstructorReducer(stateWithData, action);

    expect(state.bun).toEqual(initialState.bun);
    expect(state.ingredients).toEqual(initialState.ingredients);
  });
});
