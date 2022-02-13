import React, {useEffect} from "react";
import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";
import useInit from "../../services/useInit";
import Loader from "../../components/loader/loader";
import PropTypes from "prop-types";

function ProtectedFromAuthenticated({component, ...rest}) {
  const {init, isInitLoaded} = useInit();

  useEffect(() => {
    init();
  }, [init]);

  const isAuth = useSelector(store => store.auth.isAuth);
  if (!isInitLoaded) {
    return (
      <Loader type="secondary"/>
    )
  }
  const RenderComponent = () => {
    return (
      component()
    )
  }
  return (
    <Route
      {...rest}
      render={() =>
        !isAuth ? (
          <RenderComponent/>
        ) : (
          <Redirect to="/"/>
        )
      }
    />
  );
}

export default ProtectedFromAuthenticated;

ProtectedFromAuthenticated.propTypes = {
  component: PropTypes.elementType.isRequired,
  exact: PropTypes.bool,
  path: PropTypes.string.isRequired
}
