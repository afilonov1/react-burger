import {
    OPEN_INGREDIENT_MODAL,
    OPEN_ORDER_MODAL,
    REQUEST_IS_READY,
    SET_MODAL_INVISIBLE,

} from "../actionTypes/modal";
import {IIngredient} from "../../utils/types";

interface IRequestIsReady {
    readonly type: typeof REQUEST_IS_READY;
}
interface ICloseModal {
    readonly type: typeof SET_MODAL_INVISIBLE;
}
interface IOpenIngredientModal {
    readonly type: typeof OPEN_INGREDIENT_MODAL;
    readonly payload: Readonly<IIngredient>;
}
interface IOpenOrderModal {
    readonly type: typeof OPEN_ORDER_MODAL;
}

export type TModalActions = IRequestIsReady | ICloseModal | IOpenIngredientModal | IOpenOrderModal;


export const requestIsReady = (): IRequestIsReady => ({
    type: REQUEST_IS_READY
})

export const closeModal = (): ICloseModal => ({
    type: SET_MODAL_INVISIBLE
})

export const openIngredientModal = (itemData: IIngredient): IOpenIngredientModal => ({
    type: OPEN_INGREDIENT_MODAL,
    payload: itemData
})
export const openOrderModal = (): IOpenOrderModal => ({
    type: OPEN_ORDER_MODAL
})
