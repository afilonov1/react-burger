import {OPEN_INGREDIENT_MODAL, OPEN_ORDER_MODAL, SET_MODAL_INVISIBLE} from "../actionTypes/modal";
import {IIngredient} from "../../utils/types";
import {TModalActions} from "../actions/modal";

export type TModalState = {
    isOrderModalVisible: boolean;
    isIngredientModalVisible: boolean;
    currentDetailsItem: null | Readonly<IIngredient>;
}
const initialState: TModalState = {
    isOrderModalVisible: false,
    isIngredientModalVisible: false,
    currentDetailsItem: null
};

export const modalReducer = (state = initialState, action: TModalActions): TModalState => {
    switch (action.type) {

        case (SET_MODAL_INVISIBLE): {
            return {
                ...state,
                ...initialState
            }
        }
        case (OPEN_INGREDIENT_MODAL): {
            return {
                ...state,
                isIngredientModalVisible: true,
                currentDetailsItem: action.payload
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
