import {requestIsReady} from "./actions/modal";

export function requestData({method, url, requestAction, successAction, errorAction, body, payload}) {

  return async function (dispatch) {
    try {
      dispatch(requestAction());
      const response = await fetch(url, {
        method: method,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(body)
      });

      let json;
      if (response.ok) {
        json = await response.json();
        dispatch(successAction(json, payload));
      } else {
        dispatch(errorAction());
      }

    } catch {
      dispatch(errorAction());
    }
  }
}

const getUserRequest = (url, token) =>
  fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });
const getNewAccessTokenRequest = (url, token) =>
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
      token: token
    })
  });

export function getNewAccessToken({refreshToken, url, successAction}) {
  return async function (dispatch) {
    try {
      console.log(refreshToken);
      const response = await getNewAccessTokenRequest(url, refreshToken);
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.success) {
          dispatch(successAction(data));
          return data.accessToken;
        }
      }
    } catch(e) {
        console.log(e);
    }
  }
}

export async function checkAccessToken({accessToken, url}) {
  try {
    const response = await getUserRequest("12" + url, accessToken);

    if (response.ok) {
      const data = await response.json();
      const isSucceed = data.success;
      if (isSucceed) {
        return true;
      }
    } else {
      return false;
    }

  } catch {
    return false;
  }

}
