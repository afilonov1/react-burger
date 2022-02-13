import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    user: {
      name: "",
      email: "",
    },
    register: {
      request: false,
      success: false,
      error: false,
    },
    login: {
      request: false,
      success: false,
      error: false,
    },
  },
  reducers: {
    registerSuccess(state, action) {
      const data = action.payload;
      state.isAuth = true;
      state.user.name = data.user.name;
      state.user.email = data.user.email;
      state.register.success = true;
      state.register.request = false;
    },
    registerRequest(state) {
      state.register.error = false;
      state.register.request = true;

    },
    registerError(state) {
      state.register.request = false;
      state.register.error = true;
    },
    logout(state) {
      state.isAuth = false;
      state.user.name = "";
      state.user.email = "";
      state.register.success = false;
      state.register.request = false;
      state.register.error = false;
      state.login.success = false;
      state.login.request = false;
      state.login.error = false;
    },
    loginSuccess(state, action) {
      const data = action.payload;
      state.isAuth = true;
      state.user.name = data.user.name;
      state.user.email = data.user.email;
      state.login.success = true;
      state.login.request = false;
    },
    loginRequest(state) {
      state.login.error = false;
      state.login.request = true;

    },
    loginError(state) {
      state.login.request = false;
      state.login.error = true;
    },

    setAuthFalse(state) {
      state.isAuth = false;
    },
    setAuthTrue(state) {
      state.isAuth = true;
    },
    setUserName(state, action) {
      state.user.name = action.payload;
    },
    setUserEmail(state, action) {
      state.user.email = action.payload;
    },
  }
})

export default authSlice.reducer;
export const { actions } = authSlice;
