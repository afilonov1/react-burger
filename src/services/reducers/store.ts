import {configureStore} from "@reduxjs/toolkit";
import { rootReducer } from './';
import {socketMiddleware} from "../middleware/socketMiddleware";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware("wss://norma.nomoreparties.space/orders/all")),

})

export default store;
