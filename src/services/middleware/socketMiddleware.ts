import type {Middleware, MiddlewareAPI} from "redux";
import {AppDispatch, RootState} from "../../utils/types";
import {AppActions} from "../actions";
import {WS_CLOSE_CONNECTION, WS_CONNECTION_START, WS_SEND_MESSAGE} from "../actionTypes/wsActionTypes";
import {
  wsConnectionClosed,
  wsConnectionError,
  wsConnectionSuccess,
  wsGetMessage
} from "../actions/wsActions";
import {TSocketType} from "../reducers/webSocketReducer";

export const socketMiddleware = (): Middleware => ((store: MiddlewareAPI<AppDispatch, RootState>) => {
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
        dispatch(wsConnectionSuccess());
      }
      socket.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        dispatch(wsGetMessage({data, type: currentType}));
      }
      socket.onerror = (event: Event) => {
        dispatch(wsConnectionError());
        socket = null;
      }
      socket.onclose = (event: CloseEvent) => {
        dispatch(wsConnectionClosed());
        socket = null;
      }
      if (type === WS_SEND_MESSAGE) {
        socket.send(JSON.stringify(payload));
      }
      if (type === WS_CLOSE_CONNECTION) {
        socket.close();
      }
    }

    next(action);
  }
}) as Middleware;

