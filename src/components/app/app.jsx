import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import AppHeader from "../app-header/app-header";
import { baseUrl } from '../../utils/constants';
import { getIngredients } from "../../services/actions/cart";
import Main from "../../pages/main/main";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "../../pages/login-page/login-page";
import RegisterPage from "../../pages/register-page/register-page";
import ForgotPasswordPage from "../../pages/forgot-password-page/forgot-password-page";
import ResetPasswordPage from "../../pages/reset-password-page/reset-password-page";
import ProfilePage from "../../pages/profile-page/profile-page";
import ProtectedRoute from "../../pages/protected-route/protected-route";


function App() {
  const {ingredientsData, constructorData, isFailed} = useSelector(store => ({
    ingredientsData: store.cart.ingredientsData,
    constructorData: store.cart.constructorData,
    isFailed: store.cart.getIngredients.isError || store.cart.postOrder.isError
  }))

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients(baseUrl + "ingredients"));
  }, [dispatch]);

  return (
    <div>
      <Router>
        <AppHeader />
        <Switch>
          <Route path="/" exact>
            {ingredientsData && !isFailed && constructorData && <Main/>}
            {isFailed && <p className="error">Ошибка соединения с сервером</p>}
          </Route>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/forgot-password" component={ForgotPasswordPage} />
          <Route path="/reset-password" component={ResetPasswordPage} />
          <ProtectedRoute path="/profile">
            <ProfilePage />
          </ProtectedRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
