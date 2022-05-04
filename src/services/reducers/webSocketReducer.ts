import {createReducer, PayloadAction} from "@reduxjs/toolkit";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE
} from "../actionTypes/wsActionTypes";
import {IwsMessage} from "../../utils/types";

type WebSocketState = {
  wsConnected: boolean;
  messages: IwsMessage[];
  error?: Event;
}

const initialState: WebSocketState = {
  wsConnected: false,
  messages: [],
}

export default createReducer(initialState, {
  [WS_CONNECTION_SUCCESS]: (state: WebSocketState) => {
    state.error = undefined;
    state.wsConnected = true;
  },
  [WS_CONNECTION_CLOSED]: (state: WebSocketState) => {
    state.wsConnected = false;
  },
  [WS_CONNECTION_ERROR]: (state: WebSocketState, action: PayloadAction<Event>) => {
    state.error = action.payload;
    state.wsConnected = false;
  },
  [WS_GET_MESSAGE]: (state: WebSocketState, action: PayloadAction<IwsMessage>) => {
    state.messages = [action.payload];
  }
});
