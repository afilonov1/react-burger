import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    name: "",
    email: "",
    accessToken: "",
    refreshToken: "",
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
      state.name = data.user.name;
      state.email = data.user.email;
      state.refreshToken = data.refreshToken;
      state.accessToken = data.accessToken;
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
      state.name = "";
      state.email = "";
      state.refreshToken = "";
      state.accessToken = "";
      state.register.success = false;
      state.register.request = true;
      state.register.error = false;
      state.login.success = false;
      state.login.request = true;
      state.login.error = false;
    },
    loginSuccess(state, action) {
      const data = action.payload;
      state.isAuth = true;
      state.name = data.user.name;
      state.email = data.user.email;
      state.refreshToken = data.refreshToken;
      state.accessToken = data.accessToken;
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
    refreshAccessToken(state, action) {
      const data = action.payload;
      state.accessToken = data.accessToken;
      state.refreshToken = data.refreshToken;
    }
  }
})

export default authSlice.reducer;
export const { actions } = authSlice;
