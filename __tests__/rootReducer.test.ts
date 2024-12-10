import {expect, test, describe, jest} from '@jest/globals';
import store from "../src/services/store";
import { rootReducer } from '../src/services/rootReducer';

describe("Проверка rootReducer", () => {
    test("Вызов rootReducer с undefined состоянием и экшеном возвращает корректное начальное состояние хранилища", () => {
        const initialState = store.getState();
        const newState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
        expect(newState).toEqual(initialState);
    });
})