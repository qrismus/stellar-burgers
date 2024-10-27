import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { TConstructorIngredient } from '@utils-types';

type TBurgerConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      const ingredient = { ...action.payload, id: uuidv4() };
      if (ingredient.type === 'bun') {
        state.bun = ingredient;
      } else {
        state.ingredients.push(ingredient);
      }
    },
    removeIngredient: (
      state: TBurgerConstructorState,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },
    resetConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export default burgerConstructorSlice.reducer;
export const { addIngredient, removeIngredient, resetConstructor } =
  burgerConstructorSlice.actions;
