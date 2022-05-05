import {configureStore} from "@reduxjs/toolkit";
import { rootReducer } from './';
import {socketMiddleware} from "../middleware/socketMiddleware";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware()),

})

export default store;
