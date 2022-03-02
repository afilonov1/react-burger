import React, {ReactComponentElement, useEffect} from "react";
import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";
import useInit from "../../services/useInit";
import Loader from "../../components/loader/loader";
import PropTypes from "prop-types";
import {IStore} from "../../utils/types";

function ProtectedFromAuthenticated({component, ...rest}: {component: any; path: string; exact: boolean}) {
  const {init, isInitLoaded} = useInit();
  console.log("ProtectedFromAuthenticated")

  useEffect(() => {
    init();
  }, [init]);

  const isAuth = useSelector((store: IStore) => store.auth.isAuth);
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
