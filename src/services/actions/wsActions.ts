import {createAction} from "@reduxjs/toolkit";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE, WS_SEND_MESSAGE
} from "../actionTypes/wsActionTypes";
import {IwsMessage} from "../../utils/types";

export const wsConnectionStart = createAction(WS_CONNECTION_START)
export const wsConnectionSuccess = createAction(WS_CONNECTION_SUCCESS)
export const wsConnectionError = createAction(WS_CONNECTION_ERROR)
export const wsGetMessage = createAction<IwsMessage, typeof WS_GET_MESSAGE>(WS_GET_MESSAGE)
export const wsConnectionClosed = createAction(WS_CONNECTION_CLOSED)
export const wsSendMessage = createAction<IwsMessage, typeof WS_SEND_MESSAGE>(WS_SEND_MESSAGE)

export type TWSActions = typeof wsConnectionStart | typeof wsConnectionSuccess | typeof wsConnectionError |
  typeof wsGetMessage | typeof wsConnectionClosed | typeof wsSendMessage;
