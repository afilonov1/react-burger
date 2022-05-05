import React, {useEffect} from 'react';

import AppHeader from "../app-header/app-header";
import {getIngredients} from "../../services/actions/cart";
import {useDispatch} from "../../utils/hooks";
import {baseUrl, ingredientsEndpoint} from "../../utils/constants";
import Routes from "../routes/routes";


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients(baseUrl + ingredientsEndpoint));
  }, [dispatch]);
  return (
    <div>
      <AppHeader/>
      <Routes />
    </div>
  );
}

export default App;
