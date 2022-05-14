import {cartReducer} from "./cart";
import {
  clearCart,
  getIngredientsError,
  getIngredientsRequest,
  getIngredientsSuccess, moveCartItemToIndex,
  postOrderError,
  postOrderRequest, postOrderSuccess, removeContainerItem, replaceCartIngredients, setCartToInitial, setContainerBun
} from "../actions/cart";
import {testCartTemplate} from "../../utils/testConstants/dataForTests";
import {SET_CONTAINER_BUN} from "../actionTypes/cart";
import {
  addContainerItemResult,
  cartIDs,
  generatedHash,
  generatedHashBottom,
  generatedHashTop,
  initialState,
  json,
  moveCartItemToIndexInitial,
  moveCartItemToIndexResult,
  postOrderResult,
  removeContainerItemInitial,
  replaceCartIngredientsInitial,
  replaceCartIngredientsResult,
  setContainerBunResult
} from "../../utils/testConstants/cartConstants";



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
    expect(cartReducer(testCartTemplate, postOrderSuccess(
      json, cartIDs
    ))).toEqual(postOrderResult)
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
    )).toEqual(addContainerItemResult)
  })
  it("handle SET_CONTAINER_BUN", () => {


    expect(cartReducer(testCartTemplate, {
      type: SET_CONTAINER_BUN,
      id: "60d3b41abdacab0026a733c6",
      hashTop: generatedHashTop,
      hashBottom: generatedHashBottom
    })).toEqual(setContainerBunResult)
  })
  it("handle REMOVE_CONTAINER_ITEM", () => {

    expect(cartReducer(removeContainerItemInitial, removeContainerItem(generatedHash))).toEqual({
      ...testCartTemplate,
      constructorData: []
    })
  })
  it("handle REPLACE_CART_INGREDIENTS", () => {
    expect(cartReducer(replaceCartIngredientsInitial, replaceCartIngredients(1, 2))).toEqual(replaceCartIngredientsResult)
  })
  it("handle MOVE_CART_ITEM_TO_INDEX", () => {
    expect(cartReducer(moveCartItemToIndexInitial, moveCartItemToIndex("hash2", 0))).toEqual(moveCartItemToIndexResult)
  })
  it("handle SET_CART_STATE_TO_INITIAL", () => {
    expect(cartReducer(testCartTemplate, setCartToInitial())).toEqual(initialState)
  })

})
