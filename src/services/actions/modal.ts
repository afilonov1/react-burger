import {
    OPEN_ORDER_MODAL,
    SET_MODAL_INVISIBLE,

} from "../actionTypes/modal";

interface ICloseModal {
    readonly type: typeof SET_MODAL_INVISIBLE;
}

interface IOpenOrderModal {
    readonly type: typeof OPEN_ORDER_MODAL;
}

export type TModalActions = ICloseModal | IOpenOrderModal;


export const closeModal = (): ICloseModal => ({
    type: SET_MODAL_INVISIBLE
})

export const openOrderModal = (): IOpenOrderModal => ({
    type: OPEN_ORDER_MODAL
})
