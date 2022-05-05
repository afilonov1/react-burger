import Cookies from 'js-cookie';
import {ActionCreator} from "@reduxjs/toolkit";
import {AppDispatch, AppThunk} from "../utils/types";

export const requestData: AppThunk = function (
  {method, url, requestAction, successAction, errorAction, body, payload, setCookie, additionalAction}: {
    method: string;
    url: string;
    requestAction: ActionCreator<any>;
    successAction: ActionCreator<any>;
    errorAction: ActionCreator<any>;
    body?: { email: string; password: string; } | { ingredients: string[]} ;
    payload?: any;
    setCookie?: any;
    additionalAction?: any;
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
        if (additionalAction) {
          dispatch(additionalAction());
        }
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

const getUserRequest = (url: string): any => {
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
const getNewAccessTokenRequest = (url: string) =>
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
    const response: any = await getNewAccessTokenRequest(url);
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

export const getUser: AppThunk = function (url: string, setUserName: any, setUserEmail: any) {
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

export const updateUser = function (url: string, body: any, setUserName: any, setUserEmail: any) {
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

export async function resetPasswordRequest(url: string, body: any) {
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
