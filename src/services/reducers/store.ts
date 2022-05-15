import {configureStore} from "@reduxjs/toolkit";
import { rootReducer } from './';
import {socketMiddleware} from "../middleware/socketMiddleware";
import {wsConnectionClosed, wsConnectionError, wsConnectionSuccess, wsGetMessage} from "../actions/wsActions";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware({
      wsOnOpen: wsConnectionSuccess,
      wsOnMessage: wsGetMessage,
      wsOnError: wsConnectionError,
      wsOnClose: wsConnectionClosed
    })),

})

export default store;
