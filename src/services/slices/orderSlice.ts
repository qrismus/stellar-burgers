import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi, orderBurgerApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export const getOrders = createAsyncThunk('order/getOrders', getOrdersApi);

export const orderBurger = createAsyncThunk(
  'order/orderBurger',
  async (ingredients: string[]) => {
    const result = await orderBurgerApi(ingredients);
    return result.order;
  }
);

export type TOrderState = {
  order: TOrder | null;
  userOrders: TOrder[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

export const initialState: TOrderState = {
  order: null,
  userOrders: [],
  orderRequest: false,
  orderModalData: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeOrderNumberModal: (state) => {
      state.orderRequest = false;
      state.orderModalData = null;
    }
  },
  selectors: {},
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurger.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload;
      });
  }
});

export default orderSlice.reducer;
export const { closeOrderNumberModal } = orderSlice.actions;
