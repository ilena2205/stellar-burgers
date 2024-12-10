import {expect, test, describe, jest} from '@jest/globals';
import { getIngredients, initialState } from "../src/slices/ingredientsSlice";
import ingredientsSliceReducer from "../src/slices/ingredientsSlice";

const ingredientsData = [
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
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0
    }
  ];

describe("Слайс для ingredients", () => {
    describe("Запрос для получения ingredients: getIngredients", () => {
        test("Ожидание запроса: pending", () => {
            const newState = ingredientsSliceReducer(initialState, getIngredients.pending('pending'));
            expect(newState.isIngredientsLoading).toBeTruthy();
            expect(newState.error).toBeNull();
        });

        test("Результат запроса: fulfilled", () => {
            const newState = ingredientsSliceReducer(initialState, getIngredients.fulfilled(ingredientsData, 'fulfilled'));
            expect(newState.isIngredientsLoading).toBeFalsy();
            expect(newState.error).toBeNull();
            expect(newState.ingredients).toEqual(ingredientsData);
        });

        test("Ошибка запроса: rejected", () => {
            const error = 'Ошибка';
            const newState = ingredientsSliceReducer(initialState, getIngredients.rejected(new Error(error), 'rejected'));
            expect(newState.isIngredientsLoading).toBeFalsy();
            expect(newState.error).toEqual(error)
        });
    })
})
