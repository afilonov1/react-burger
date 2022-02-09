import React from "react";
import {Route} from "react-router-dom";
import LoginPage from "../login-page/login-page";

function ProtectedRoute({path, children}) {

  const isAuth = true;
  const authComponent = children;
  console.log(children)
  const notAuthComponent = <Route path="/login" component={LoginPage} />;
  const renderComponent = isAuth ? authComponent : notAuthComponent;

  return (
    <Route path={path} >
      {renderComponent}
    </Route>
  );
}

export default ProtectedRoute;
