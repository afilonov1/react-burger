import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import AppHeader from "../app-header/app-header";
import {ingredientsUrl} from '../../utils/constants';
import {getIngredients} from "../../services/actions/cart";
import Main from "../main/main";


function App() {
    const {ingredientsData, constructorData, isFailed} = useSelector(store => ({
        ingredientsData: store.cart.ingredientsData,
        constructorData: store.cart.constructorData,
        isFailed: store.cart.getIngredients.isError || store.cart.postOrder.isError
    }))

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients(ingredientsUrl));
    }, [dispatch]);

  return (
    <div>
      <AppHeader />
      { ingredientsData && !isFailed && constructorData && <Main /> }
      {isFailed && <p className="error">Ошибка соединения с сервером</p>}
    </div>
  );
}

export default App;
