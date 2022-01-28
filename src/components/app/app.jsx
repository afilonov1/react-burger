import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import AppHeader from "../app-header/app-header";
import { link } from '../../utils/constants';
import {getFeed} from "../../services/actions/cart";
import Main from "../main/main";


function App() {
    const {ingredientsData, constructorData, isFailed} = useSelector(store => ({
        ingredientsData: store.cart.ingredientsData,
        constructorData: store.cart.constructorData,
        isFailed: store.cart.isFailed
    }))

    const store = useSelector(store => store);
    console.log(store)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFeed(link));
    }, []);

  return (
    <div>
      <AppHeader />
      { ingredientsData && !isFailed && constructorData && <Main /> }
      {isFailed && <p className="error">Ошибка соединения с сервером</p>}
    </div>
  );
}

export default App;
