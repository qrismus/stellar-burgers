import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrdersData } from '../../utils/types';
import { getFeedsApi } from '../../utils/burger-api';

export const getFeeds = createAsyncThunk('order/getFeeds', getFeedsApi);

export const initialState: TOrdersData = {
  orders: [],
  total: 0,
  totalToday: 0
};

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  selectors: {},
  extraReducers: (builder) => {
    builder.addCase(getFeeds.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
  },
  reducers: {}
});

export default feedsSlice.reducer;
