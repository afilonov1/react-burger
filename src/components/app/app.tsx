import React from 'react';

import AppHeader from "../app-header/app-header";
import Main from "../../pages/main/main";
import {Route, Switch} from "react-router-dom";
import LoginPage from "../../pages/login-page/login-page";
import RegisterPage from "../../pages/register-page/register-page";
import ForgotPasswordPage from "../../pages/forgot-password-page/forgot-password-page";
import ResetPasswordPage from "../../pages/reset-password-page/reset-password-page";
import ProfilePage from "../../pages/profile-page/profile-page";
import ProtectedRoute from "../../pages/protected-route/protected-route";
import NotFound404 from "../../pages/not-found-404/not-found-404";
import ProtectedFromAuthenticated from "../../pages/protected-from-authenticated/protected-from-authenticated";
import Logout from "../../pages/logout/logout";
import IngredientPage from "../../pages/ingredient-page/ingredient-page";


function App() {
  return (
    <div>
      <AppHeader/>
      <Switch>
        <Route path="/" component={Main} exact/>
        <ProtectedFromAuthenticated path="/login" component={LoginPage} exact/>
        <ProtectedFromAuthenticated path="/register" component={RegisterPage} exact/>
        <ProtectedFromAuthenticated path="/forgot-password" component={ForgotPasswordPage} exact/>
        <ProtectedFromAuthenticated path="/reset-password" component={ResetPasswordPage} exact/>
        <ProtectedRoute path="/profile" component={ProfilePage}/>
        <Route path="/logout" component={Logout} exact/>
        <Route path="/ingredients/:ingredientId" component={IngredientPage} exact/>
        <Route path="*" component={NotFound404}/>
      </Switch>

    </div>
  );
}

export default App;
