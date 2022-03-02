import React, {useEffect} from "react";
import {Redirect, Route} from "react-router-dom";

import useInit from "../../services/useInit";
import Loader from "../../components/loader/loader";

function ProtectedRoute({component, ...rest}: {component: any; path: string}) {
  console.log("ProtectedRoute")

  const {init, isInitLoaded, canEnter} = useInit();

  useEffect(() => {
    init("vsNotAuth");
  }, [init]);

  if (!isInitLoaded) {
    return (
      <Loader type="primary"/>
    );
  }
  const RenderComponent = () => {
    return (
      component()
    )
  }
  return (
    <Route
      {...rest}
      render={({location}) =>
        (canEnter) ? (
          <RenderComponent/>
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
