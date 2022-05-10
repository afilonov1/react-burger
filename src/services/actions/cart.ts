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
} from "../actionTypes/cart";
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

interface IGetIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}
interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly ingredients: ReadonlyArray<IIngredient>;
}
interface IGetIngredientsErrorAction {
    readonly type: typeof GET_INGREDIENTS_ERROR;
}
interface IPostOrderRequestAction {
    readonly type: typeof POST_ORDER_REQUEST;

}
interface IPostOrderSuccessAction {
    readonly type: typeof POST_ORDER_SUCCESS;
    readonly payload: {name: string; order: {number: number}; success: boolean};
    readonly cartIDs: ReadonlyArray<string>;
}
interface IPostOrderErrorAction {
    readonly type: typeof POST_ORDER_ERROR;
}
interface ISetOrderAction {
    readonly type: typeof SET_ORDER;
    readonly name: string
    readonly number: number;
    readonly cartSum: number;
    readonly cartIDs: ReadonlyArray<string>;
}
interface IAddContainerItemAction {
    readonly type: typeof ADD_CONTAINER_ITEM;
    readonly id: string;
    readonly hash: string;
}
interface IRemoveContainerItemAction {
    readonly type: typeof REMOVE_CONTAINER_ITEM;
    readonly hash: string;
}
interface ISetContainerBunAction {
    readonly type: typeof SET_CONTAINER_BUN;
    readonly id: string;
    readonly hashTop: string;
    readonly hashBottom: string;
}
interface IReplaceCartIngredientsAction {
    readonly type: typeof REPLACE_CART_INGREDIENTS;
    readonly indexFrom: number;
    readonly indexAt: number;
}
interface IMoveCartItemToIndexAction {
    readonly type: typeof MOVE_CART_ITEM_TO_INDEX;
    readonly hash: string;
    readonly indexAt: number;
}
interface ISetCartToInitialAction {
    readonly type: typeof SET_CART_STATE_TO_INITIAL;
}
interface IClearCartAction {
    readonly type: typeof CLEAR_CART;
}
interface IClearOrderAction {
    readonly type: typeof CLEAR_ORDER;
}

export type TCartActions = IGetIngredientsRequestAction | IGetIngredientsSuccessAction | IGetIngredientsErrorAction |
  IPostOrderRequestAction | IPostOrderSuccessAction | IPostOrderErrorAction | ISetOrderAction | IAddContainerItemAction |
  IRemoveContainerItemAction | ISetContainerBunAction | IReplaceCartIngredientsAction | IMoveCartItemToIndexAction |
  ISetCartToInitialAction | IClearCartAction | IClearOrderAction;

export const getIngredientsRequest = (): IGetIngredientsRequestAction => ({
    type: GET_INGREDIENTS_REQUEST
})
export const getIngredientsSuccess = (json: { success: boolean; data: ReadonlyArray<IIngredient> }): IGetIngredientsSuccessAction => ({
    type: GET_INGREDIENTS_SUCCESS,
    ingredients: json.data
})
export const getIngredientsError = (): IGetIngredientsErrorAction => ({
    type: GET_INGREDIENTS_ERROR
})
export const postOrderRequest = (): IPostOrderRequestAction => ({
    type: POST_ORDER_REQUEST
})
export const postOrderSuccess = (json: {name: string; order: {number: number}; success: boolean}, cartIDs: Array<string>): IPostOrderSuccessAction => ({
    type: POST_ORDER_SUCCESS,
    payload: json,
    cartIDs
})
export const postOrderError = (): IPostOrderErrorAction => ({
    type: POST_ORDER_ERROR
})
export const setOrder = (name: string, number: number, cartSum: number, cartIDs: Array<string>): ISetOrderAction => ({
    type: SET_ORDER,
    name,
    number,
    cartSum,
    cartIDs
})
export const addContainerItem = (id: string): IAddContainerItemAction => ({
    type: ADD_CONTAINER_ITEM,
    id,
    hash: uuid()
})
export const removeContainerItem = (hash: string): IRemoveContainerItemAction => ({
    type: REMOVE_CONTAINER_ITEM,
    hash
})
export const setContainerBun = (id: string): ISetContainerBunAction => ({
    type: SET_CONTAINER_BUN,
    id,
    hashTop: uuid(),
    hashBottom: uuid()
})
export const replaceCartIngredients = (indexFrom: number, indexAt: number): IReplaceCartIngredientsAction => ({
    type: REPLACE_CART_INGREDIENTS,
    indexFrom,
    indexAt
})
export const moveCartItemToIndex = (hash: string, indexAt: number): IMoveCartItemToIndexAction => ({
    type: MOVE_CART_ITEM_TO_INDEX,
    hash,
    indexAt
})
export const setCartToInitial = (): ISetCartToInitialAction => ({
    type: SET_CART_STATE_TO_INITIAL
})
export const clearCart = (): IClearCartAction => ({
    type: CLEAR_CART
})
export const clearOrder = (): IClearOrderAction => ({
    type: CLEAR_ORDER
})
