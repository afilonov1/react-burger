import Cookies from 'js-cookie';
import {ActionCreator, ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {AppDispatch, AppThunk} from "../utils/types";
import {
  getIngredientsError,
  getIngredientsRequest, getIngredientsSuccess,
  postOrderError,
  postOrderRequest,
  postOrderSuccess
} from "./actions/cart";
import {actions} from "./reducers/auth";

// requestAction = getIngredientsRequest,
//   successAction = getIngredientsSuccess,
//   errorAction = getIngredientsError
// requestAction = postOrderRequest,
//   successAction = postOrderSuccess,
//   errorAction = postOrderError,
//  const {registerError, registerRequest, registerSuccess} = actions;
//  const {loginSuccess, loginError, loginRequest} = actions;
const {registerError, registerRequest, registerSuccess, loginSuccess, loginError, loginRequest} = actions;
type TRequest =
  ReturnType<typeof getIngredientsRequest> |
  ReturnType<typeof postOrderRequest> |
  ReturnType<typeof registerRequest> |
  ReturnType<typeof loginRequest>;
type TSuccess =
  ReturnType<typeof getIngredientsSuccess> |
  ReturnType<typeof postOrderSuccess> |
  ReturnType<typeof registerSuccess> |
  ReturnType<typeof loginSuccess>;
type TError =
  ReturnType<typeof getIngredientsError> |
  ReturnType<typeof postOrderError> |
  ReturnType<typeof registerError> |
  ReturnType<typeof loginError>;
export const requestData: AppThunk = function (
  {method, url, requestAction, successAction, errorAction, body, payload, setCookie}: {
    method: string;
    url: string;
    requestAction: ActionCreator<TRequest>;
    successAction: ActionCreator<TSuccess>;
    errorAction: ActionCreator<TError>;
    body?: { email: string; password: string; } | { ingredients: string[]} ;
    payload?: string[];
    setCookie?: true;
  }) {

  return async function (dispatch: AppDispatch) {
    try {
      dispatch(requestAction());
      let header: HeadersInit = {
        'Content-Type': 'application/json',
        Authorization: Cookies.get("accessToken")!
      };
      const response = await fetch(url, {
        method: method,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: header,
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(body)
      });

      let data = await response.json();
      if (response.ok && data.success) {

        dispatch(successAction(data, payload));
        if (setCookie) {
          Cookies.set('accessToken', data.accessToken);
          Cookies.set('refreshToken', data.refreshToken);
        }
        return true;
      } else {
        dispatch(errorAction());
        return false;
      }

    } catch {
      dispatch(errorAction());
      return false;
    }
  }
}

const getUserRequest = (url: string): Promise<Response> => {
  let header: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: Cookies.get("accessToken")!
  };

  return fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: header,
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });
}
const getNewAccessTokenRequest = (url: string): Promise<Response> =>
  fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      //Authorization: token
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      token: Cookies.get("refreshToken")
    })
  });
export async function getNewAccessToken(url: string) {
  try {
    const response = await getNewAccessTokenRequest(url);
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        Cookies.set("accessToken", data.accessToken);
        Cookies.set("refreshToken", data.refreshToken);
        return data.accessToken;
      }
    }
  } catch (e) {

  }
}

export async function checkAccessToken(url: string) {
  try {
    const response = await getUserRequest(url);

    if (response.ok) {
      const data = await response.json();
      const isSucceed = data.success;
      return !!isSucceed;
    } else {
      return false;
    }

  } catch {
    return false;
  }

}

export const getUser: AppThunk = function (url: string, setUserName: ActionCreatorWithPayload<string>,
                                           setUserEmail: ActionCreatorWithPayload<string>) {
  return async function (dispatch: AppDispatch) {
    try {
      const header: HeadersInit = {
        'Content-Type': 'application/json',
        Authorization: Cookies.get("accessToken")!
      } ;
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: header,
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setUserName(data.user.name));
        dispatch(setUserEmail(data.user.email));
        return data;
      } else {

      }

    } catch {
    }

  }
}

export const updateUser: AppThunk = (url: string, body: {
  name: string,
  email: string,
  password: string
}, setUserName: ActionCreatorWithPayload<string>, setUserEmail: ActionCreatorWithPayload<string>) => {
  return async function (dispatch: AppDispatch) {
    try {
      const header: HeadersInit = {
        'Content-Type': 'application/json',
        Authorization: Cookies.get("accessToken")!
      };
      const response = await fetch(url, {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: header,
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(body)
      });
      if (response.ok) {
        const data = await response.json();
        await dispatch(setUserName(data.user.name));
        await dispatch(setUserEmail(data.user.email));

        return data;
      } else {

      }

    } catch {
    }

  }
}

export async function logoutUser(url: string) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        //Authorization: Cookies.get("refreshToken")
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        token: Cookies.get("refreshToken")
      })
    });
    if (response.ok) {
      const data = await response.json();
      return data.success;
    } else {
      return false;
    }
  } catch {
    return false;
  }

}

export async function resetPasswordRequest(url: string, body: {
  password: string,
  token: string
}) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(body)
    });
    if (response.ok) {
      const data = await response.json();
      return data.success;
    } else {
      return false;
    }
  } catch {
    return false;
  }
}

export async function forgotPasswordRequest(url: string, email: string) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        email: email
      })
    });
    if (response.ok) {
      const data = await response.json();
      return data.success;
    } else {
      return false;
    }
  } catch {
    return false;
  }
}
