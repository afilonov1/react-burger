import React, {useEffect} from "react";
import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";
import useInit from "../../services/useInit";
import Loader from "../../components/loader/loader";
import {IStore} from "../../utils/types";

const ProtectedFromAuthenticated: React.FC<{path: string; exact: boolean}> = ({children, path, exact}) => {
  const {init, isInitLoaded} = useInit();
  useEffect(() => {
    init();
  }, [init]);

  const isAuth = useSelector((store: IStore) => store.auth.isAuth);
  if (!isInitLoaded) {
    return (
      <Loader type="secondary"/>
    )
  }

  return (
    <Route
      path={path}
      exact={exact}
      render={() =>
        !isAuth ? (
          <>
          {children}
          </>
        ) : (
          <Redirect to="/"/>
        )
      }
    />
  );
}

export default ProtectedFromAuthenticated;
