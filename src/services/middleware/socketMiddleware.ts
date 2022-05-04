import type {Middleware, MiddlewareAPI} from "redux";
import {AppDispatch, RootState} from "../../utils/types";
import {AppActions} from "../actions";
import {WS_CONNECTION_START, WS_SEND_MESSAGE} from "../actionTypes/wsActionTypes";
import {
  wsConnectionClosed,
  wsConnectionError,
  wsConnectionStart,
  wsConnectionSuccess,
  wsGetMessage
} from "../actions/wsActions";

export const socketMiddleware = (wsUrl: string): Middleware => ((store: MiddlewareAPI<AppDispatch, RootState>) => {
  let socket: WebSocket | null = null;

  return next => (action: AppActions) => {
    // const {dispatch, getState} = store;
    const {dispatch} = store;
    //@ts-ignore
    const {type, payload} = action;
    if (type === WS_CONNECTION_START) {
      socket = new WebSocket(wsUrl);
    }
    if (socket) {
      socket.onopen = () => {
        console.log("opened");
        dispatch(wsConnectionSuccess());
      }
      socket.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        console.log("got message", data);
        dispatch(wsGetMessage(data));
      }
      socket.onerror = (event: Event) => {
        console.log("got Error")
        dispatch(wsConnectionError());
        socket = null;
      }
      socket.onclose = (event: CloseEvent) => {
        console.log("closed")
        dispatch(wsConnectionClosed());
        socket = null;
        const interval = setInterval(() => {
          if (socket?.readyState === 1) {
            console.log(socket)
            clearInterval(interval);
          } else {
            socket = new WebSocket(wsUrl);
          }
        }, 2000)
      }
      if (type === WS_SEND_MESSAGE) {
        console.log("sending message", payload)
        socket.send(JSON.stringify(payload));
      }
    }

    next(action);
  }
}) as Middleware;

