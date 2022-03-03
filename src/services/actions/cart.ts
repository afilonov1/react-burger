import {
    ADD_CONTAINER_ITEM, CLEAR_CART, CLEAR_ORDER,
    GET_INGREDIENTS_ERROR,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    MOVE_CART_ITEM_TO_INDEX, POST_ORDER_ERROR, POST_ORDER_REQUEST, POST_ORDER_SUCCESS,
    REMOVE_CONTAINER_ITEM,
    REPLACE_CART_INGREDIENTS, SET_CART_STATE_TO_INITIAL,
    SET_CONTAINER_BUN,
    SET_ORDER
} from "./types/cart";
import {v4 as uuid} from "uuid";
import {requestData} from "../api";
import {IIngredient} from "../../utils/types";


export function getIngredients(
  url: string,
  method = "GET",
  requestAction = getIngredientsRequest,
  successAction = getIngredientsSuccess,
  errorAction = getIngredientsError
) {
    return requestData(
      {method, url, requestAction, successAction, errorAction}
    );
}
export function postOrder (
  url: string,
  body: {
      ingredients: string[];
  },
  payload: string[],
  method = "POST",
  requestAction = postOrderRequest,
  successAction = postOrderSuccess,
  errorAction = postOrderError,
) {
    return requestData({method, url, payload, requestAction, successAction, errorAction, body});
}



const getIngredientsRequest = () => ({
    type: GET_INGREDIENTS_REQUEST
})
const getIngredientsSuccess = (json: {success: boolean; data: IIngredient[]}) => ({
    type: GET_INGREDIENTS_SUCCESS,
    ingredients: json.data
})
const getIngredientsError = () => ({
    type: GET_INGREDIENTS_ERROR
})
const postOrderRequest = () => ({
    type: POST_ORDER_REQUEST
})
const postOrderSuccess = (json: {name: string; order: {number: number}; success: boolean}, cartIDs: Array<string>) => ({
    type: POST_ORDER_SUCCESS,
    payload: json,
    cartIDs
})
const postOrderError = () => ({
    type: POST_ORDER_ERROR
})
export const setOrder = (name: string, number: number, cartSum: number, cartIDs: Array<string>) => ({
    type: SET_ORDER,
    name,
    number,
    cartSum,
    cartIDs
})
export const addContainerItem = (id: string) => ({
    type: ADD_CONTAINER_ITEM,
    id,
    hash: uuid()
})
export const removeContainerItem = (hash: string) => ({
    type: REMOVE_CONTAINER_ITEM,
    hash
})
export const setContainerBun = (id: string) => ({
    type: SET_CONTAINER_BUN,
    id,
    hashTop: uuid(),
    hashBottom: uuid()
})
export const replaceCartIngredients = (indexFrom: number, indexAt: number) => ({
    type: REPLACE_CART_INGREDIENTS,
    indexFrom,
    indexAt
})
export const moveCartItemToIndex = (hash: string, indexAt: number) => ({
    type: MOVE_CART_ITEM_TO_INDEX,
    hash,
    indexAt
})
export const setCartToInitial = () => ({
    type: SET_CART_STATE_TO_INITIAL
})
export const clearCart = () => ({
    type: CLEAR_CART
})
export const clearOrder = () => ({
    type: CLEAR_ORDER
})
