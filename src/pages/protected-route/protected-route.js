import React, {useEffect} from "react";
import {Redirect, Route} from "react-router-dom";

import useInit from "../../services/useInit";
import Loader from "../../components/loader/loader";
import PropTypes from "prop-types";

function ProtectedRoute({component, ...rest}) {
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
ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  exact: PropTypes.bool,
  path: PropTypes.string.isRequired
}
