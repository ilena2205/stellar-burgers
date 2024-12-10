import {expect, test, describe, jest} from '@jest/globals';
import { getFeeds, initialState } from "../src/slices/feedSlice";
import feedsSliceReducer from "../src/slices/feedSlice";

const feedsData = {
    success: true,
    orders: [],
    total: 2,
    totalToday: 2
  };

describe("Слайс для feed", () => {
    describe("Запрос для получения feeds: getFeeds", () => {
        test("Ожидание запроса: pending", () => {
            const newState = feedsSliceReducer(initialState, getFeeds.pending('pending'));
            expect(newState.isFeedsLoading).toBeTruthy();
            expect(newState.error).toBeNull();
        });

        test("Результат запроса: fulfilled", () => {
            const newState = feedsSliceReducer(initialState, getFeeds.fulfilled(feedsData, 'fulfilled'));
            expect(newState.isFeedsLoading).toBeFalsy();
            expect(newState.error).toBeNull();
            expect(newState.orders).toEqual(feedsData.orders);
            expect(newState.feeds.total).toEqual(feedsData.total);
            expect(newState.feeds.totalToday).toEqual(feedsData.totalToday);
        });

        test("Ошибка запроса: rejected", () => {
            const error = 'Ошибка';
            const newState = feedsSliceReducer(initialState, getFeeds.rejected(new Error(error), 'rejected'));
            expect(newState.isFeedsLoading).toBeFalsy();
            expect(newState.error).toEqual(error)
        });
    })
})
