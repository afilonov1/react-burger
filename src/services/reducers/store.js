import {combineReducers} from "redux";
import {cartReducer} from "./cart";
import {modalReducer} from "./modal";

export const rootReducer = combineReducers({
    cart: cartReducer,
    modal: modalReducer
})