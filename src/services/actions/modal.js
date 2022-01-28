import {
    OPEN_INGREDIENT_MODAL,
    OPEN_ORDER_MODAL,
    REQUEST_IS_READY,
    SET_MODAL_INVISIBLE,

} from "./types/modal";

export const requestIsReady = () => ({
    type: REQUEST_IS_READY
})

export const closeModal = () => ({
    type: SET_MODAL_INVISIBLE
})

export const openIngredientModal = (itemData) => ({
    type: OPEN_INGREDIENT_MODAL,
    payload: itemData
})
export const openOrderModal = () => ({
    type: OPEN_ORDER_MODAL
})