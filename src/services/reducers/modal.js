import {OPEN_INGREDIENT_MODAL, OPEN_ORDER_MODAL, SET_MODAL_INVISIBLE} from "../actions/types/modal";

const initialState = {
    isOrderModalVisible: false,
    isIngredientModalVisible: false,
    currentDetailsItem: null
}

export const modalReducer = (state = initialState, action) => {
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