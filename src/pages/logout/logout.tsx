import React, {useCallback, useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {useDispatch} from "react-redux";
import Cookies from 'js-cookie';
import {logoutUser} from "../../services/api";
import {baseUrl, logoutEndpoint} from "../../utils/constants";
import {actions} from "../../services/reducers/auth";
import {setCartToInitial} from "../../services/actions/cart";

function Logout() {
  const dispatch = useDispatch();
  const {logout} = actions;
  const [logoutDone, setLogoutDone] = useState(false);

  const init = useCallback(async function () {
    await logoutUser(baseUrl + logoutEndpoint);
    Cookies.set("accessToken", "");
    Cookies.set("refreshToken", "");

    await dispatch(logout());
    dispatch(setCartToInitial());
    setLogoutDone(true);
  }, [logout, dispatch]);
  useEffect(() => {
    init();
  }, [init])
  if (!logoutDone) {
    return null;
  }
  return (
    <Redirect to="login"/>
  )
}

export default Logout;
