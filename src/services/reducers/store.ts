import {configureStore} from "@reduxjs/toolkit";
import { rootReducer } from './';
import {socketMiddleware} from "../middleware/socketMiddleware";
import {wsConnectionClosed, wsConnectionError, wsConnectionSuccess, wsGetMessage} from "../actions/wsActions";
import {WS_CLOSE_CONNECTION, WS_SEND_MESSAGE} from "../actionTypes/wsActionTypes";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware({
      wsOnOpen: wsConnectionSuccess,
      wsOnMessage: wsGetMessage,
      wsOnError: wsConnectionError,
      wsOnClose: wsConnectionClosed,
      WSSendMessageType: WS_SEND_MESSAGE,
      WSCloseConnectionType: WS_CLOSE_CONNECTION
    })),

})

export default store;
