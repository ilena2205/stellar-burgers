import {expect, test, describe, jest} from '@jest/globals';
import { addIngredient,
    deleteIngredient,
    changeIngredientsPlace,
    nullIngredients } from "../src/slices/constructorSlice";
import burgerConstructorSliceReducer from "../src/slices/constructorSlice";


const ingredientBun = {
    _id:"643d69a5c3f7b9001cfa093c",
    id:"1221",
    name:"Краторная булка N-200i",
    type:"bun",
    proteins:80,
    fat:24,
    carbohydrates:53,
    calories:420,
    price:1255,
    image:"https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile:"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large:"https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v:0
}

const ingredientMain = {
    _id:"643d69a5c3f7b9001cfa093e",
    id:"123321",
    name:"Филе Люминесцентного тетраодонтимформа",
    type:"main",
    proteins:44,
    fat:26,
    carbohydrates:85,
    calories:643,
    price:988,
    image:"https://code.s3.yandex.net/react/code/meat-03.png",
    image_mobile:"https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    image_large:"https://code.s3.yandex.net/react/code/meat-03-large.png",
    __v:0
}

const ingredientSauce = {
    _id:"643d69a5c3f7b9001cfa0942",
    id:"321123",
    name:"Соус Spicy-X",
    type:"sauce",
    proteins:30,
    fat:20,
    carbohydrates:40,
    calories:30,
    price:90,
    image:"https://code.s3.yandex.net/react/code/sauce-02.png",
    image_mobile:"https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    image_large:"https://code.s3.yandex.net/react/code/sauce-02-large.png",
    __v:0
}
describe("Слайс для constructor", () => {
    afterAll(() => {
        jest.clearAllMocks(); // Очищаем мокированные данные
      });

    describe("Reducer: addIngredientNotBun", () => {
        const InitialConstructorState = {
            ingredients: [],
            bun: null
        }
        test("должен добавлять ингредиент, не булку", () => {
            const newState = burgerConstructorSliceReducer(InitialConstructorState, addIngredient(ingredientMain));
            const newObject = { ...newState.ingredients[0] } as Record<string, any>;
            delete newObject['id'];
      
            const initialObject = { ...ingredientMain } as Record<string, any>;
            delete initialObject['id'];

            expect(newObject).toEqual(initialObject)
        })
    });

    describe("Reducer: addIngredientBun", () => {
        const InitialConstructorState = {
            ingredients: [ingredientSauce],
            bun: null
        }
        test("должен добавлять булку", () => {
            const newState = burgerConstructorSliceReducer(InitialConstructorState, addIngredient(ingredientBun));
            const newObject = { ...newState.bun } as Record<string, any>;
            delete newObject['id'];
      
            const initialObject = { ...ingredientBun } as Record<string, any>;
            delete initialObject['id'];
            expect(newState.ingredients).toEqual([ingredientSauce]);
            expect(newObject).toEqual(initialObject);
        })
    });

    describe("Reducer: deleteIngredient", () => {
        const InitialConstructorState = {
            ingredients: [ingredientSauce, ingredientMain],
            bun: null
        }
        test("должен удалять ингредиент", () => {
            const newState = burgerConstructorSliceReducer(InitialConstructorState, deleteIngredient(ingredientSauce.id));
            expect(newState.ingredients[0]).toEqual(ingredientMain);
            expect(newState.bun).toBeNull();
        })
    });

    describe("Reducer: nullIngredients", () => {
        const InitialConstructorState = {
            ingredients: [ingredientSauce, ingredientMain],
            bun: ingredientBun
        }
        test("обнуление конструктора", () => {
            const newState = burgerConstructorSliceReducer(InitialConstructorState, nullIngredients());
            expect(newState.ingredients).toHaveLength(0);
            expect(newState.bun).toBeNull();
        })
    })

    describe("Reducer: changeIngredientsPlace", () => {
        const InitialIngredState = {
            ingredients: [ingredientSauce, ingredientMain],
            bun: null
        }
      test("должен правильно менять порядок ингредиентов", () => {
            const newState = burgerConstructorSliceReducer(InitialIngredState, changeIngredientsPlace({ current: 0, next: 1 }));
            expect(newState.ingredients).toEqual([ingredientMain, ingredientSauce]);
      })
    });
})

