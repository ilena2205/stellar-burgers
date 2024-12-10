import {expect, test, describe, jest} from '@jest/globals';

import { getOrders, getOrder, createOrder, clearData, initialState } from "../src/slices/orderSlice";
import orderSliceReducer from "../src/slices/orderSlice";

const ordersData = {
    success: true,
    orders: [{
        _id:"67461983b27b06001c3eb4cc",
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный био-марсианский бургер',
        createdAt: '2024-11-26T18:54:59.770Z',
        updatedAt: '2024-11-26T18:55:00.621Z',
        number: 60696,
    }],
}


describe("Слайс для orders", () => {
    describe("Очистка данных", () => {
        const InitialOrdersState = {
            orders: [],
            orderId: null,
            loading: false,
            orderRequest: false,
            OrderData: ordersData.orders[0],
            error: null
        };
        test("обнуление данных", () => {
            const newState = orderSliceReducer(InitialOrdersState, clearData());
            expect(newState.OrderData).toBeNull();
        })
    });

    describe("Запрос для получения orders: getOrders", () => {
        test("Ожидание запроса: pending", () => {
            const newState = orderSliceReducer(initialState, getOrders.pending('pending'));
            expect(newState.loading).toBeTruthy();
            expect(newState.error).toBeNull();
        });

        test("Результат запроса: fulfilled", () => {
            const newState = orderSliceReducer(initialState, getOrders.fulfilled(ordersData.orders, 'fulfilled'));
            expect(newState.loading).toBeFalsy();
            expect(newState.error).toBeNull();
            expect(newState.orders).toEqual(ordersData.orders);
        });

        test("Ошибка запроса: rejected", () => {
            const error = 'Ошибка';
            const newState = orderSliceReducer(initialState, getOrders.rejected(new Error(error), 'rejected'));
            expect(newState.loading).toBeFalsy();
            expect(newState.error).toEqual(error)
        });
    });

    describe("Запрос для создания order: createOrder", () => {
        test("Ожидание запроса: pending", () => {
            const newState = orderSliceReducer(initialState, createOrder.pending('pending', ordersData.orders[0].ingredients));
            expect(newState.loading).toBeTruthy();
            expect(newState.orderRequest).toBeTruthy();
        });

        test("Результат запроса: fulfilled", () => {
            const newState = orderSliceReducer(initialState, createOrder.fulfilled({ order: ordersData.orders[0], name: 'EXAMPLE', success: true },
                'fulfilled',
                ordersData.orders[0].ingredients
              ));
            expect(newState.orderRequest).toBeFalsy();
            expect(newState.loading).toBeFalsy();
            expect(newState.error).toBeNull();
            expect(newState.OrderData).toEqual(ordersData.orders[0]);
        });

        test("Ошибка запроса: rejected", () => {
            const error = 'Ошибка';
            const newState = orderSliceReducer(initialState, createOrder.rejected(new Error(error), 'rejected', []));
            expect(newState.orderRequest).toBeFalsy();
            expect(newState.loading).toBeFalsy();
            expect(newState.error).toEqual(error)
        });
    });

    describe("Запрос для получения orders: getOrder", () => {
        test("Ожидание запроса: pending", () => {
            const newState = orderSliceReducer(initialState, getOrder.pending('pending', ordersData.orders[0].number));
            expect(newState.loading).toBeTruthy();
            expect(newState.error).toBeNull();
            expect(newState.orderRequest).toBeTruthy();
        });

        test("Результат запроса: fulfilled", () => {
            const newState = orderSliceReducer(initialState, getOrder.fulfilled(ordersData, 'fulfilled', ordersData.orders[0].number));
            expect(newState.loading).toBeFalsy();
            expect(newState.error).toBeNull();
            expect(newState.orderRequest).toBeFalsy();
            expect(newState.OrderData).toEqual(ordersData.orders[0]);
        });

        test("Ошибка запроса: rejected", () => {
            const error = 'Ошибка';
            const newState = orderSliceReducer(initialState, getOrder.rejected(new Error(error), 'rejected', 0));
            expect(newState.loading).toBeFalsy();
            expect(newState.orderRequest).toBeFalsy();
            expect(newState.error).toEqual(error)
        });
    });
})