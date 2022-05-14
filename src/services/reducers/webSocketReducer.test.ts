import webSocketReducer, {TSocketType, WebSocketState} from "./webSocketReducer";
import {
  wsConnectionClosed,
  wsConnectionError,
  wsConnectionStart,
  wsConnectionSuccess,
  wsGetMessage
} from "../actions/wsActions";
import {wsMessagesData} from "../../utils/dataForTests";

const initialState: WebSocketState = {
  wsConnected: false,
  messages: [],
  socketType: null
}

const reducer = webSocketReducer;
describe('socket reducer', () => {
  test("should be initial", () => {
    // @ts-ignore
    expect(reducer(undefined, {})).toEqual(initialState);
  })
  test("handle wsConnectionStart", () => {
    expect(reducer(undefined, wsConnectionStart({type: "all", url: "someUrl"}))).toEqual({
      ...initialState,
      socketType: null
    })
  })
  test("handle wsConnectionSuccess", () => {
    expect(reducer(undefined, wsConnectionSuccess())).toEqual({
      ...initialState,
      error: undefined,
      wsConnected: true
    })
  })
  test("handle wsConnectionError", () => {
    expect(reducer(undefined, wsConnectionError())).toEqual({
      ...initialState,
      wsConnected: false
    })
  })
  test("handle wsConnectionClosed", () => {
    expect(reducer(undefined, wsConnectionClosed())).toEqual(initialState)
  })
  test("handle wsGetMessage", () => {
    expect(reducer(undefined, wsGetMessage({data: wsMessagesData, type: "all"}))).toEqual({
      ...initialState,
      // error: undefined,
      messages: [wsMessagesData],
      socketType: "all"
    })
  })



})
