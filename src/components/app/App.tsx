import React, {useEffect, useState} from 'react';

import AppHeader from "../app-header/app-header";
import styles from "./app.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { Fetch } from '../../utils/utils';
import { link } from '../../utils/constants';



function App() {
    const [data, setData] = useState();
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        Fetch(link, setData, setIsError);
    }, []);

    const cart = [0, 8, 3, 11, 10, 10, 0];
  return (
    <div className={ styles.app }>
      <AppHeader />
        {data && !isError &&
          <main className={styles.main}>
              <BurgerIngredients data={data}/>
              <BurgerConstructor data={data} cart={cart}/>
          </main>
        }
        {isError && <p className="error">Ошибка соединения с сервером</p>}
    </div>
  );
}

export default App;
