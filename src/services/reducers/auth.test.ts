import auth, {actions} from "./auth";
import {
  initialAuth,
  loginSuccessResultStore,
  registerSuccessResultStore,
  responseSuccessAuth
} from "../../utils/testConstants/authConstants";


const {
  registerSuccess, registerRequest, registerError,
  logout, loginSuccess, loginRequest, loginError,
  setAuthFalse, setAuthTrue, setUserName, setUserEmail
} = actions;

describe("auth reducer", () => {
  it("test initial state", () => {
    // @ts-ignore
    expect(auth(undefined, {})).toEqual(initialAuth)
  })
  it("handle registerSuccess", () => {
    expect(auth(undefined, registerSuccess(responseSuccessAuth))).toEqual(registerSuccessResultStore)
  })
  it("handle registerRequest", () => {
    expect(auth(undefined, registerRequest())).toEqual({
      ...initialAuth,
      register: {
        request: true,
        success: false,
        error: false,
      }
    })
  })
  it("handle registerError", () => {
    expect(auth(undefined, registerError())).toEqual({
      ...initialAuth,
      register: {
        request: false,
        success: false,
        error: true,
      }
    })
  })

  it("handle logout", () => {
    expect(auth(undefined, logout())).toEqual(initialAuth)
  })
  it("handle loginSuccess", () => {
    expect(auth(undefined, loginSuccess(responseSuccessAuth))).toEqual(loginSuccessResultStore)
  })
  it("handle loginRequest", () => {
    expect(auth(undefined, loginRequest())).toEqual({
      ...initialAuth,
      login: {
        request: true,
        success: false,
        error: false,
      }
    })
  })
  it("handle loginError", () => {
    expect(auth(undefined, loginError())).toEqual({
      ...initialAuth,
      login: {
        request: false,
        success: false,
        error: true,
      }
    })
  })
  it("handle setAuthFalse", () => {
    expect(auth(undefined, setAuthFalse())).toEqual({
      ...initialAuth,
      isAuth: false
    })
  })
  it("handle setAuthTrue", () => {
    expect(auth(undefined, setAuthTrue())).toEqual({
      ...initialAuth,
      isAuth: true
    })
  })
  it("handle setUserName", () => {
    expect(auth(undefined, setUserName("testString"))).toEqual({
      ...initialAuth,
      user: {
        ...initialAuth.user,
        name: "testString"
      }
    })
  })
  it("handle setUserEmail", () => {
    expect(auth(undefined, setUserEmail("testString"))).toEqual({
      ...initialAuth,
      user: {
        ...initialAuth.user,
        email: "testString"
      }
    })
  })


})
