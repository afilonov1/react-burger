import {combineReducers} from "redux";
import {cartReducer} from "./cart";
import {modalReducer} from "./modal";
import authSlice from "./auth";
import webSocketReducer from "./webSocketReducer";

export const rootReducer = combineReducers({
    cart: cartReducer,
    modal: modalReducer,
    auth: authSlice,
    ws: webSocketReducer
});

