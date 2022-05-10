import type {Middleware, MiddlewareAPI} from "redux";
import {AppDispatch, IwsMessage, RootState} from "../../utils/types";
import {AppActions} from "../actions";
import {
  WS_CLOSE_CONNECTION, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_SEND_MESSAGE
} from "../actionTypes/wsActionTypes";
import {TSocketType} from "../reducers/webSocketReducer";
import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";

export const socketMiddleware = ({
  wsOnOpen, wsOnMessage, wsOnError, wsOnClose, WSSendMessageType, WSCloseConnectionType
  }: {
    wsOnOpen: ActionCreatorWithoutPayload<typeof WS_CONNECTION_SUCCESS>,
    wsOnMessage: ActionCreatorWithPayload<{data: IwsMessage, type: TSocketType}>,
    wsOnError: ActionCreatorWithoutPayload<typeof WS_CONNECTION_ERROR>,
    wsOnClose: ActionCreatorWithoutPayload<typeof WS_CONNECTION_CLOSED>,
    WSSendMessageType: typeof WS_SEND_MESSAGE,
    WSCloseConnectionType: typeof WS_CLOSE_CONNECTION
}): Middleware => ((store: MiddlewareAPI<AppDispatch, RootState>) => {
  let socket: WebSocket | null = null;
  let currentType: TSocketType | null = null;
  return next => (action: AppActions) => {
    // const {dispatch, getState} = store;
    const {dispatch} = store;
    //@ts-ignore
    const {type, payload} = action;
    if (type === WS_CONNECTION_START) {
      socket = new WebSocket(payload.url);
      currentType = payload.type;
    }
    if (socket) {
      socket.onopen = () => {
        dispatch(wsOnOpen());
      }
      socket.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        dispatch(wsOnMessage({data, type: currentType}));
      }
      socket.onerror = (event: Event) => {
        dispatch(wsOnError());
        socket = null;
      }
      socket.onclose = (event: CloseEvent) => {
        dispatch(wsOnClose());
        socket = null;
      }
      if (type === WSSendMessageType) {
        socket.send(JSON.stringify(payload));
      }
      if (type === WSCloseConnectionType) {
        socket.close();
      }
    }

    next(action);
  }
}) as Middleware;

