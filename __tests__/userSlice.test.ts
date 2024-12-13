import {expect, test, describe, jest} from '@jest/globals';

import { loginUser, logoutUser, updateUser, registerUser, getUser, checkUserAuth, initialState } from "../src/slices/userSlice";
import userSliceReducer from "../src/slices/userSlice";

const userData = {
    success: true,
    refreshToken: "test",
    accessToken: "test",
    user: {    
        email: 'test@test.test',
        name: 'test',}
  };
  
  const registerData = {
    success: true,
    user: {
        email: 'test@test.test',
        name: 'test',
        password: 'test'
    }
  };
  
  const loginData = {
    email: 'test@test.test',
    password: 'test'
  };


describe("Слайс для user", () => {
    describe("Вход в аккаунт для юзера: loginUser", () => {
        test("Ожидание запроса: pending", () => {
            const newState = userSliceReducer(initialState, loginUser.pending('pending', loginData));
            expect(newState.loading).toBeTruthy();
            expect(newState.error).toBeNull();
        });

        test("Результат запроса: fulfilled", () => {
            const newState = userSliceReducer(initialState, loginUser.fulfilled(userData.user, 'fulfilled', loginData));
            expect(newState.loading).toBeFalsy();
            expect(newState.error).toBeNull();
            expect(newState.isChecked).toBeTruthy();
            expect(newState.user).toEqual(userData.user);
        });

        test("Ошибка запроса: rejected", () => {
            const error = 'Ошибка';
            const newState = userSliceReducer(initialState, loginUser.rejected(new Error(error), 'rejected', loginData));
            expect(newState.loading).toBeFalsy();
            expect(newState.isChecked).toBeFalsy();
            expect(newState.error).toEqual(error)
        });
    });

    describe("Выход из аккаунта для юзера: logoutUser", () => {
        test("Ожидание запроса: pending", () => {
            const newState = userSliceReducer(initialState, logoutUser.pending('pending'));
            expect(newState.loading).toBeTruthy();
            expect(newState.error).toBeNull();
        });

        test("Результат запроса: fulfilled", () => {
            const newState = userSliceReducer(initialState, logoutUser.fulfilled(undefined, 'fulfilled'));
            expect(newState.loading).toBeFalsy();
            expect(newState.user).toBeNull();
        });

        test("Ошибка запроса: rejected", () => {
            const error = 'Ошибка';
            const newState = userSliceReducer(initialState, logoutUser.rejected(new Error(error), 'rejected'));
            expect(newState.loading).toBeFalsy();
            expect(newState.isChecked).toBeTruthy();
            expect(newState.error).toEqual(error)
        });
    });

    describe("Функция изменения данных пользователя: updateUser", () => {
        test("Ожидание запроса: pending", () => {
            const newState = userSliceReducer(initialState, updateUser.pending('pending', userData.user));
            expect(newState.loading).toBeTruthy();
            expect(newState.error).toBeNull();
        });

        test("Результат запроса: fulfilled", () => {
            const newState = userSliceReducer(initialState, updateUser.fulfilled(userData, 'fulfilled', userData.user));
            expect(newState.loading).toBeFalsy();
            expect(newState.user).toEqual(userData.user);
        });

        test("Ошибка запроса: rejected", () => {
            const error = 'Ошибка';
            const newState = userSliceReducer(initialState, updateUser.rejected(new Error(error), 'rejected', userData.user));
            expect(newState.loading).toBeFalsy();
            expect(newState.error).toEqual(error)
        });
    });

    describe("Регистрация юзера: loginUser", () => {
        test("Ожидание запроса: pending", () => {
            const newState = userSliceReducer(initialState, registerUser.pending('pending', registerData.user));
            expect(newState.loading).toBeTruthy();
            expect(newState.error).toBeNull();
        });

        test("Результат запроса: fulfilled", () => {
            const newState = userSliceReducer(initialState, registerUser.fulfilled(userData, 'fulfilled', registerData.user));
            expect(newState.loading).toBeFalsy();
            expect(newState.isChecked).toBeTruthy();
            expect(newState.user).toEqual(userData.user);
        });

        test("Ошибка запроса: rejected", () => {
            const error = 'Ошибка';
            const newState = userSliceReducer(initialState, registerUser.rejected(new Error(error), 'rejected', registerData.user));
            expect(newState.loading).toBeFalsy();
            expect(newState.error).toEqual(error)
        });
    });

    describe("Проверка получения данных юзера: getUser", () => {
        test("Ожидание запроса: pending", () => {
            const newState = userSliceReducer(initialState, getUser.pending('pending'));
            expect(newState.loading).toBeTruthy();
            expect(newState.error).toBeNull();
        });

        test("Результат запроса: fulfilled", () => {
            const newState = userSliceReducer(initialState, getUser.fulfilled(userData, 'fulfilled'));
            expect(newState.loading).toBeFalsy();
            expect(newState.isChecked).toBeTruthy();
            expect(newState.user).toEqual(userData.user);
        });

        test("Ошибка запроса: rejected", () => {
            const error = 'Ошибка';
            const newState = userSliceReducer(initialState, getUser.rejected(new Error(error), 'rejected'));
            expect(newState.loading).toBeFalsy();
            expect(newState.error).toEqual(error)
        });
    });
})