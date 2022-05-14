import {cartReducer} from "./cart";
import {
  addContainerItem,
  clearCart,
  getIngredientsError,
  getIngredientsRequest,
  getIngredientsSuccess, moveCartItemToIndex,
  postOrderError,
  postOrderRequest, postOrderSuccess, removeContainerItem, replaceCartIngredients, setCartToInitial, setContainerBun
} from "../actions/cart";
import {testCartTemplate} from "../../utils/dataForTests";
import {ADD_CONTAINER_ITEM, SET_CONTAINER_BUN} from "../actionTypes/cart";
import {v4 as uuid} from "uuid";

const initialState = {
  ingredientsData: null,
  constructorData: [],
  getIngredients: {
    isRequest: false,
    isSuccess: false,
    isError: false,
  },
  postOrder: {
    isRequest: false,
    isSuccess: false,
    isError: false,
  },
  order: {
    name: "",
    number: 0,
    cartSum: 0,
    cartIDs: []
  }
};
const generatedHash = "hash generated from UUID";
const generatedHashTop = "hashTop generated from UUID";
const generatedHashBottom = "hashBottom generated from UUID";

describe("cart reducer", () => {
  it("test initial state", () => {
    // @ts-ignore
    expect(cartReducer(undefined, {})).toEqual(initialState)
  })

  it("handle CLEAR_CART", () => {
    expect(cartReducer(undefined, clearCart())).toEqual(initialState)
  })
  it("handle GET_INGREDIENTS_REQUEST", () => {
    expect(cartReducer(undefined, getIngredientsRequest())).toEqual({
      ...initialState,
      getIngredients: {
        ...initialState.getIngredients,
        isRequest: true,
      }
    })
  })
  it("handle GET_INGREDIENTS_SUCCESS", () => {
    expect(cartReducer(undefined, getIngredientsSuccess({
      success: true, data: testCartTemplate.ingredientsData!
    }))).toEqual({
      ...initialState,
      getIngredients: {
        ...initialState.getIngredients,
        isSuccess: true,
      },
      ingredientsData: testCartTemplate.ingredientsData!
    })
  })
  it("handle GET_INGREDIENTS_ERROR", () => {
    expect(cartReducer(undefined, getIngredientsError())).toEqual({
      ...initialState,
      getIngredients: {
        ...initialState.getIngredients,
        isError: true,
      }
    })
  })
  it("handle POST_ORDER_REQUEST", () => {
    expect(cartReducer(undefined, postOrderRequest())).toEqual({
      ...initialState,
      postOrder: {
        ...initialState.postOrder,
        isRequest: true,
      }
    })
  })
  it("handle POST_ORDER_SUCCESS", () => {
    const orderName = "Кратрный рецерт";
    const orderNumber = 12345;
    const json = {name: orderName, order: {number: orderNumber}, success: true};
    const cartIDs = ["60d3b41abdacab0026a733c6", "60d3b41abdacab0026a733ca", "60d3b41abdacab0026a733c6"];
    const orderPrice = 1255 + 3000 + 1255;
    expect(cartReducer(testCartTemplate, postOrderSuccess(
      json, cartIDs
    ))).toEqual({
      ...testCartTemplate,
      postOrder: {
        isRequest: false,
        isError: false,
        isSuccess: true,
      },
      order: {
        name: orderName,
        number: orderNumber,
        cartSum: orderPrice,
        cartIDs
      }
    })
  })
  it("handle POST_ORDER_ERROR", () => {
    expect(cartReducer(undefined, postOrderError())).toEqual({
      ...initialState,
      postOrder: {
        ...initialState.postOrder,
        isError: true,
      }
    })
  })
  it("handle ADD_CONTAINER_ITEM", () => {
    expect(cartReducer(testCartTemplate,
      {
        type: "ADD_CONTAINER_ITEM",
        id: "60d3b41abdacab0026a733c9",
        hash: generatedHash
      }
    )).toEqual({
      ...testCartTemplate,
      constructorData: [
        {
          _id: '60d3b41abdacab0026a733c9',
          name: 'Мясо бессмертных моллюсков Protostomia',
          type: 'main',
          proteins: 433,
          fat: 244,
          carbohydrates: 33,
          calories: 420,
          price: 1337,
          image: 'https://code.s3.yandex.net/react/code/meat-02.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
          __v: 0,
          hash: generatedHash
        }
      ]
    })
  })
  it("handle SET_CONTAINER_BUN", () => {


    expect(cartReducer(testCartTemplate, {
      type: SET_CONTAINER_BUN,
      id: "60d3b41abdacab0026a733c6",
      hashTop: generatedHashTop,
      hashBottom: generatedHashBottom
    })).toEqual({
      ...testCartTemplate,
      constructorData: [
        {
          _id: '60d3b41abdacab0026a733c6',
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
          __v: 0,
          hash: generatedHashTop
        },
        {
          _id: '60d3b41abdacab0026a733c6',
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
          __v: 0,
          hash: generatedHashBottom
        },
      ]
    })
  })
  it("handle REMOVE_CONTAINER_ITEM", () => {

    expect(cartReducer({
      ...testCartTemplate,
      constructorData: [{
        _id: '60d3b41abdacab0026a733c6',
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
        __v: 0,
        hash: generatedHash
      }]
    }, removeContainerItem(generatedHash))).toEqual({
      ...testCartTemplate,
      constructorData: []
    })
  })
  it("handle REPLACE_CART_INGREDIENTS", () => {
    expect(cartReducer({
      ...testCartTemplate,
      constructorData: [{
        _id: '60d3b41abdacab0026a733c6',
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
        __v: 0,
        hash: "hash1"
      },
        {
          _id: '60d3b41abdacab0026a733c8',
          name: 'Филе Люминесцентного тетраодонтимформа',
          type: 'main',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
          __v: 0,
          hash: "hash2"
        },
        {
          _id: '60d3b41abdacab0026a733c6',
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
          __v: 0,
          hash: "hash3"
        },
      ]
    }, replaceCartIngredients(1, 2))).toEqual({
      ...testCartTemplate,
      constructorData: [{
        _id: '60d3b41abdacab0026a733c6',
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
        __v: 0,
        hash: "hash1"
      },
        {
          _id: '60d3b41abdacab0026a733c6',
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
          __v: 0,
          hash: "hash3"
        },
        {
          _id: '60d3b41abdacab0026a733c8',
          name: 'Филе Люминесцентного тетраодонтимформа',
          type: 'main',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
          __v: 0,
          hash: "hash2"
        },
      ]
    })
  })
  it("handle MOVE_CART_ITEM_TO_INDEX", () => {
    expect(cartReducer({
      ...testCartTemplate,
      constructorData: [{
        _id: '60d3b41abdacab0026a733c6',
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
        __v: 0,
        hash: "hash1"
      },
        {
          _id: '60d3b41abdacab0026a733c6',
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
          __v: 0,
          hash: "hash3"
        },
        {
          _id: '60d3b41abdacab0026a733c8',
          name: 'Филе Люминесцентного тетраодонтимформа',
          type: 'main',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
          __v: 0,
          hash: "hash2"
        },
      ]
    }, moveCartItemToIndex("hash2", 0))).toEqual({
      ...testCartTemplate,
      constructorData: [
        {
          _id: '60d3b41abdacab0026a733c8',
          name: 'Филе Люминесцентного тетраодонтимформа',
          type: 'main',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
          __v: 0,
          hash: "hash2"
        },
        {
          _id: '60d3b41abdacab0026a733c6',
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
          __v: 0,
          hash: "hash1"
        },
        {
          _id: '60d3b41abdacab0026a733c6',
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
          __v: 0,
          hash: "hash3"
        },
      ]
    })
  })
  it("handle SET_CART_STATE_TO_INITIAL", () => {
    expect(cartReducer(testCartTemplate, setCartToInitial())).toEqual(initialState)
  })

})
