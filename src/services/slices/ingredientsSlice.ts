import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '@utils-types';

export const getIngredients = createAsyncThunk(
  'ingredients/getAll',
  getIngredientsApi
);

type TIngredientsState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null | undefined;
};

export const initialState: TIngredientsState = {
  ingredients: [],
  loading: true,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      });
  }
});

export default ingredientsSlice.reducer;
