import React, {useEffect} from 'react';

import AppHeader from "../app-header/app-header";
import Main from "../../pages/main/main";
import {Route, Switch, useHistory, useLocation} from "react-router-dom";
import LoginPage from "../../pages/login-page/login-page";
import RegisterPage from "../../pages/register-page/register-page";
import ForgotPasswordPage from "../../pages/forgot-password-page/forgot-password-page";
import ResetPasswordPage from "../../pages/reset-password-page/reset-password-page";
import ProfilePage from "../../pages/profile-page/profile-page";
import ProtectedRoute from "../../pages/protected-route/protected-route";
import NotFound404 from "../../pages/not-found-404/not-found-404";
import ProtectedFromAuthenticated from "../../pages/protected-from-authenticated/protected-from-authenticated";
import Logout from "../../pages/logout/logout";
import Modal from "../modal/modal";
import {clearCart, clearOrder, getIngredients} from "../../services/actions/cart";
import {useDispatch, useSelector} from "../../utils/hooks";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import {closeModal} from "../../services/actions/modal";
import OrderFeedPage from "../../pages/order-feed-page/order-feed-page";
import OrderIngredientsDetails from "../order-ingredients-details/order-ingredients-details";
import {baseUrl, ingredientsEndpoint} from "../../utils/constants";


function App() {
  const dispatch = useDispatch();

  const history = useHistory();
  const location: any = useLocation();
  let background = location.state && location.state.background;

  const isModalVisible = useSelector((store) => store.modal.isOrderModalVisible);

  useEffect(() => {
    dispatch(getIngredients(baseUrl + ingredientsEndpoint));
  }, [dispatch]);

  const closeWithGoBack = () => {
    dispatch(closeModal());
    history.goBack();
  }
  const closeAndClearCart = () => {
    dispatch(closeModal());
    dispatch(clearCart());
    dispatch(clearOrder());
  }
  return (
    <div>
      <AppHeader/>
      <Switch location={background || location}>
        <Route path="/" component={Main} exact/>
        <Route path="/feed" component={OrderFeedPage} exact/>
        <Route path="/feed/:id" component={OrderIngredientsDetails} exact/>
        <ProtectedFromAuthenticated path="/login" exact>
          <LoginPage />
        </ProtectedFromAuthenticated>
        <ProtectedFromAuthenticated path="/register" exact>
          <RegisterPage />
        </ProtectedFromAuthenticated>
        <ProtectedFromAuthenticated path="/forgot-password" exact>
          <ForgotPasswordPage />
        </ProtectedFromAuthenticated>
        <ProtectedFromAuthenticated path="/reset-password" exact>
          <ResetPasswordPage />
        </ProtectedFromAuthenticated>
        <ProtectedRoute path="/profile" exact={false}>
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/logout" component={Logout} exact/>
        <Route path="/ingredients/:ingredientId" component={IngredientDetails} exact/>
        <Route path="*" component={NotFound404}/>
      </Switch>
      {background && <Route path="/ingredients/:ingredientId" children={
        <Modal onClose={closeWithGoBack}>
          <IngredientDetails />
        </Modal>
      } />}
      {background && <Route path="/feed/:id" children={
        <Modal onClose={closeWithGoBack}>
          <OrderIngredientsDetails />
        </Modal>
      } />}
      {isModalVisible && (
        <Modal isOrderModal onClose={closeAndClearCart}>
          <OrderDetails/>
        </Modal>
      )}
    </div>
  );
}

export default App;
