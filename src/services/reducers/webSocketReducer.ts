import {createReducer, PayloadAction} from "@reduxjs/toolkit";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR, WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE
} from "../actionTypes/wsActionTypes";
import {IwsMessage} from "../../utils/types";

export type TSocketType = "all" | "user" | null;
export type WebSocketState = {
  wsConnected: boolean;
  messages: IwsMessage[];
  error?: Event;
  socketType: TSocketType;
}

const initialState: WebSocketState = {
  wsConnected: false,
  messages: [],
  socketType: null
}

export default createReducer(initialState, {
  [WS_CONNECTION_START]: (state: WebSocketState) => {
    state.socketType = null;
  },
  [WS_CONNECTION_SUCCESS]: (state: WebSocketState) => {
    state.error = undefined;
    state.wsConnected = true;
  },
  [WS_CONNECTION_CLOSED]: (state: WebSocketState) => {
    state.wsConnected = false;
    state.messages = [];
    state.socketType = null;
  },
  [WS_CONNECTION_ERROR]: (state: WebSocketState, action: PayloadAction<Event>) => {
    state.error = action.payload;
    state.wsConnected = false;
  },
  [WS_GET_MESSAGE]: (state: WebSocketState, action: PayloadAction<{ data: IwsMessage, type: TSocketType }>) => {
    state.messages = [action.payload.data];
    state.socketType = action.payload.type;
  }
});
