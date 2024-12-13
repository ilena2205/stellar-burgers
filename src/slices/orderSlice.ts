import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../utils/types';
import {
  getOrdersApi,
  orderBurgerApi,
  getOrderByNumberApi
} from '../utils/burger-api';

type OrdersState = {
  orders: TOrder[];
  orderId: string | null;
  orderRequest: boolean;
  OrderData: TOrder | null;
  loading: boolean;
  error: string | null;
};

export const initialState: OrdersState = {
  orders: [],
  orderId: null,
  orderRequest: false,
  OrderData: null,
  loading: false,
  error: null
};

// Асинхронная функция для получения заказов
export const getOrders = createAsyncThunk('orders/getOrders', getOrdersApi);

// Асинхронная функция для создания заказа
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (data: string[]) => {
    const response = await orderBurgerApi(data);
    return response;
  }
);
// Асинхронная функция для получения заказа по номеру
export const getOrder = createAsyncThunk(
  'orders/getOrder',
  getOrderByNumberApi
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearData: (state) => {
      state.OrderData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Ошибка';
      })
      .addCase(createOrder.pending, (state, action) => {
        state.orderRequest = true;
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.loading = false;
        state.OrderData = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.loading = false;
        state.error = 'Ошибка';
      })
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderRequest = false;
        state.OrderData = action.payload.orders[0];
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.orderRequest = false;
        state.error = 'Ошибка';
      });
  },
  selectors: {
    selectOrderData: (state) => state.OrderData,
    selectOrderId: (state) => state.orderId,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrders: (state) => state.orders
  }
});

export default ordersSlice.reducer;
export const {
  selectOrderData,
  selectOrders,
  selectOrderRequest,
  selectOrderId
} = ordersSlice.selectors;
export const { clearData } = ordersSlice.actions;
