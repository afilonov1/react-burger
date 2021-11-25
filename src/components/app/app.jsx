import React, {useEffect, useState} from 'react';

import AppHeader from "../app-header/app-header";
import styles from "./app.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {getData} from '../../utils/utils';
import { link } from '../../utils/constants';

const initialCart = [0, 8, 3, 11, 10, 10, 11, 12, 4, 7, 0];

function App() {
    const [data, setData] = useState();
    const [cart, setCart] = useState();
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        getData(link, setData, setIsError);
    }, []);
    useEffect(() => {
        if (data) {
            const dataCart = initialCart.map((item, index) => data[item]);
            setCart(dataCart);
        }
    }, [data])

  return (
    <div>
      <AppHeader />
      {data && !isError && cart &&
          <main className={styles.main}>
              <BurgerIngredients data={data}/>
              <BurgerConstructor cart={cart}/>
          </main>
      }
      {isError && <p className="error">Ошибка соединения с сервером</p>}
    </div>
  );
}

export default App;
