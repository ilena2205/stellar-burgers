import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { TIngredient } from '../utils/types';
import { TConstructorIngredient } from '@utils-types';

type burgerConstructorState = {
  ingredients: TConstructorIngredient[];
  bun: TIngredient | null;
};

export const initialState: burgerConstructorState = {
  ingredients: [],
  bun: null
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    deleteIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    nullIngredients: (state) => {
      (state.ingredients = []), (state.bun = null);
    },
    changeIngredientsPlace: (
      state,
      action: PayloadAction<{ current: number; next: number }>
    ) => {
      const { current, next } = action.payload;
      const ingredients = [...state.ingredients];
      ingredients.splice(next, 0, ingredients.splice(current, 1)[0]);
      state.ingredients = ingredients;
    }
  },
  selectors: {
    selectburgerIngredients: (state) => state
  }
});

export const { selectburgerIngredients } = burgerConstructorSlice.selectors;
export const {
  addIngredient,
  deleteIngredient,
  changeIngredientsPlace,
  nullIngredients
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
