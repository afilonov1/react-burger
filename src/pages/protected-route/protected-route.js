import React, {useEffect, useState} from "react";
import {Redirect, Route, useHistory, useLocation} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {checkAccessToken, getNewAccessToken} from "../../services/api";
import {baseUrl} from "../../utils/constants";
import {actions} from "../../services/reducers/auth";

function ProtectedRoute({children, ...rest}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const {setTokenVerification, refreshAccessToken} = actions;
  const userName = useSelector(store => store.auth.name);
  const accessToken = useSelector(store => store.auth.accessToken);
  const refreshToken = useSelector(store => store.auth.refreshToken);
  const [isUserLoaded, setUserLoaded] = useState(false);
  const [canEnter, setCanEnter] = useState(false);
  const init = async () => {
    console.log("doing fetch... token = ", accessToken)

    const enter = await checkAccessToken({
      accessToken,
      url: baseUrl + "auth/user",
      resultAction: setTokenVerification
    });
    setCanEnter(enter);
    console.log("first try token", accessToken);
    if (!enter) {
      const newAccessToken = await dispatch(getNewAccessToken({
        refreshToken,
        url: baseUrl + "auth/token",
        successAction: refreshAccessToken
      }));
      console.log("second try token", newAccessToken);
      const enter = await checkAccessToken({
        accessToken: newAccessToken,
        url: baseUrl + "auth/user",
        resultAction: setTokenVerification
      });
      setCanEnter(enter);
    }
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }
  return (
    <Route
      {...rest}
      render={({location}) =>
        (userName && canEnter) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {from: location}
            }}
          />
        )
      }
    />


  );
}

export default ProtectedRoute;
