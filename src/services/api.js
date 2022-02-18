import Cookies from 'js-cookie';

export function requestData({method, url, requestAction, successAction, errorAction, body, payload, setCookie, additionalAction}) {

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

const getUserRequest = (url) =>
  fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: Cookies.get("accessToken")
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });
const getNewAccessTokenRequest = (url) =>
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

export async function getNewAccessToken(url) {
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

export async function checkAccessToken(url) {
  try {
    const response = await getUserRequest(url);

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
export function getUser(url, setUserName, setUserEmail) {
  return async function (dispatch) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: Cookies.get("accessToken")
        },
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
export function updateUser(url, body, setUserName, setUserEmail) {
  return async function (dispatch, state) {
    try {

      const response = await fetch(url, {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: Cookies.get("accessToken")
        },
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

export async function logoutUser(url) {
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

export async function resetPasswordRequest(url, body) {
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
export async function forgotPasswordRequest(url, email) {
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
