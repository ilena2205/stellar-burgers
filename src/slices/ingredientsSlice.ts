import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../utils/burger-api';
import { TIngredient } from '../utils/types';

type IngredientsState = {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  error: string | null;
};

const initialState: IngredientsState = {
  ingredients: [],
  isIngredientsLoading: false,
  error: null
};

// Асинхронная функция для получения данных
export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.isIngredientsLoading = false;
        state.error = 'Ошибка';
      });
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectLoading: (state) => state.isIngredientsLoading,
    selectBuns: (state) =>
      state.ingredients.filter((ingredients) => ingredients.type === 'bun'),
    selectMains: (state) =>
      state.ingredients.filter((ingredients) => ingredients.type === 'main'),
    selectSauces: (state) =>
      state.ingredients.filter((ingredients) => ingredients.type === 'sauce')
  }
});

export const {
  selectIngredients,
  selectLoading,
  selectBuns,
  selectMains,
  selectSauces
} = ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
