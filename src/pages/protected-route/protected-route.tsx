import React, {useEffect} from "react";
import {Redirect, Route, RouteProps} from "react-router-dom";

import useInit from "../../services/useInit";
import Loader from "../../components/loader/loader";

const ProtectedRoute: React.FC<RouteProps> = ({children, path, exact}) => {
  const {init, isInitLoaded, canEnter} = useInit();

  useEffect(() => {
    init("vsNotAuth");
  }, [init]);

  if (!isInitLoaded) {
    return (
      <Loader type="primary"/>
    );
  }

  return (
    <Route
      path={path}
      exact={exact}
      render={({location}) =>
        (canEnter) ? (
          <>
            {children}
          </>
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
