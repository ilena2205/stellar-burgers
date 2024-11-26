import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../utils/burger-api';
import { TOrder } from '../utils/types';

type FeedsState = {
  orders: TOrder[];
  feeds: {
    total: number;
    totalToday: number;
  };
  isFeedsLoading: boolean;
  error: string | null;
};

const initialState: FeedsState = {
  orders: [],
  feeds: {
    total: 0,
    totalToday: 0
  },
  isFeedsLoading: false,
  error: null
};

// Асинхронная функция для получения данных
export const getFeeds = createAsyncThunk('feeds/getFeeds', getFeedsApi);

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isFeedsLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isFeedsLoading = false;
        state.orders = action.payload.orders;
        state.feeds.total = action.payload.total;
        state.feeds.totalToday = action.payload.totalToday;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isFeedsLoading = false;
        state.error = 'Ошибка';
      });
  },
  selectors: {
    selectLoading: (state) => state.isFeedsLoading,
    selectOrders: (state) => state.orders,
    selectFeeds: (state) => state.feeds
  }
});

export const { selectLoading, selectOrders, selectFeeds } =
  feedsSlice.selectors;
export default feedsSlice.reducer;
