import {
    ADD_CONTAINER_ITEM,
    GET_INGREDIENTS_ERROR,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    MOVE_CART_ITEM_TO_INDEX, POST_ORDER_ERROR, POST_ORDER_REQUEST, POST_ORDER_SUCCESS,
    REMOVE_CONTAINER_ITEM,
    REPLACE_CART_INGREDIENTS,
    SET_CONTAINER_BUN,
    SET_ORDER
} from "./types/cart";
import {v4 as uuid} from "uuid";
import {requestData} from "../api";


export function getIngredients(
  url,
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
  url,
  body,
  payload,
  method = "POST",
  requestAction = postOrderRequest,
  successAction = postOrderSuccess,
  errorAction = postOrderError
) {
    return requestData({method, url, payload, requestAction, successAction, errorAction, body});
}



const getIngredientsRequest = () => ({
    type: GET_INGREDIENTS_REQUEST
})
const getIngredientsSuccess = (json) => ({
    type: GET_INGREDIENTS_SUCCESS,
    payload: json.data
})
const getIngredientsError = () => ({
    type: GET_INGREDIENTS_ERROR
})
const postOrderRequest = () => ({
    type: POST_ORDER_REQUEST
})
const postOrderSuccess = (json, cartIDs) => ({
    type: POST_ORDER_SUCCESS,
    payload: json,
    cartIDs
})
const postOrderError = () => ({
    type: POST_ORDER_ERROR
})
export const setOrder = (name, number, cartSum, cartIDs) => ({
    type: SET_ORDER,
    name,
    number,
    cartSum,
    cartIDs
})
export const addContainerItem = (id) => ({
    type: ADD_CONTAINER_ITEM,
    id,
    hash: uuid()
})
export const removeContainerItem = (hash) => ({
    type: REMOVE_CONTAINER_ITEM,
    hash
})
export const setContainerBun = (id) => ({
    type: SET_CONTAINER_BUN,
    id,
    hashTop: uuid(),
    hashBottom: uuid()
})
export const replaceCartIngredients = (indexFrom, indexAt) => ({
    type: REPLACE_CART_INGREDIENTS,
    indexFrom,
    indexAt
})
export const moveCartItemToIndex = (hash, indexAt) => ({
    type: MOVE_CART_ITEM_TO_INDEX,
    hash,
    indexAt
})
