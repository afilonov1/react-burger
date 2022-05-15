import {TAuth} from "../../services/reducers/auth";

export const initialAuth: TAuth = {
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
};


export const responseSuccessAuth = {
  user: {
    name: "Name123",
    email: "email333"
  }
};

export const registerSuccessResultStore = {
  ...initialAuth,
  isAuth: true,
  user: {
    name: responseSuccessAuth.user.name,
    email: responseSuccessAuth.user.email,
  },
  register: {
    request: false,
    success: true,
    error: false,
  },
};

export const loginSuccessResultStore = {
  ...initialAuth,
  isAuth: true,
  user: {
    name: responseSuccessAuth.user.name,
    email: responseSuccessAuth.user.email,
  },
  login: {
    request: false,
    success: true,
    error: false,
  },
};
