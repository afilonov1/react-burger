import {OPEN_ORDER_MODAL, SET_MODAL_INVISIBLE} from "../actionTypes/modal";
import {TModalActions} from "../actions/modal";

export type TModalState = {
    isOrderModalVisible: boolean;
}
const initialState: TModalState = {
    isOrderModalVisible: false,
};

export const modalReducer = (state = initialState, action: TModalActions): TModalState => {
    switch (action.type) {

        case (SET_MODAL_INVISIBLE): {
            return {
                ...initialState
            }
        }

        case (OPEN_ORDER_MODAL): {
            return {
                ...state,
                isOrderModalVisible: true
            }
        }
        default: {
            return state;
        }
    }
}
