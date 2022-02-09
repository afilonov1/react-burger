import React, {useEffect, useState} from "react";
import {Redirect, Route} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {checkAccessToken, getNewAccessToken} from "../../services/api";
import {baseUrl} from "../../utils/constants";
import {actions} from "../../services/reducers/auth";

function ProtectedRoute({path, children}) {
  const dispatch = useDispatch();
  const {setTokenVerification, refreshAccessToken} = actions;
  const userName = useSelector(store => store.auth.name);
  const accessToken = useSelector(store => store.auth.accessToken);
  const refreshToken = useSelector(store => store.auth.refreshToken);
  const [isUserLoaded, setUserLoaded] = useState(false);
  let canEnter = null;
  const init = async () => {
    console.log("doing fetch... token = ", accessToken)

    canEnter = await checkAccessToken({
      accessToken,
      url: baseUrl + "auth/user",
      resultAction: setTokenVerification
    });
    console.log("first try token", accessToken);
    if (!canEnter) {
      const newAccessToken = await dispatch(getNewAccessToken({
        refreshToken,
        url: baseUrl + "auth/token",
        successAction: refreshAccessToken
      }));
      console.log("second try token", newAccessToken);
      canEnter = await checkAccessToken({
        accessToken: newAccessToken,
        url: baseUrl + "auth/user",
        resultAction: setTokenVerification
      });
    }
    setUserLoaded(true);
    console.log(canEnter)
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  return (
    <>
      {(
        <Route
          path={path}
          render={({ location }) =>
            userName ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: location }
                }}
              />
            )
          }
        />
      )}
    </>
  );
}

export default ProtectedRoute;
