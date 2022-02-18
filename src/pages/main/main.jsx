import styles from "./main.module.css";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import React, {useEffect} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/actions/cart";
import {baseUrl, ingredientsEndpoint} from "../../utils/constants";
import Loader from "../../components/loader/loader";


function Main() {
  const dispatch = useDispatch();
  const {ingredientsData, isFailed} = useSelector(store => ({
    ingredientsData: store.cart.ingredientsData,
    isFailed: store.cart.getIngredients.isError || store.cart.postOrder.isError
  }))
  useEffect(() => {
    if (!ingredientsData) {
      dispatch(getIngredients(baseUrl + ingredientsEndpoint));
    }
  }, [dispatch, ingredientsData]);

  return (
    <>
      {(ingredientsData && !isFailed && (
        <DndProvider backend={HTML5Backend}>
          <main className={styles.main}>
            <BurgerIngredients/>
            <BurgerConstructor/>
          </main>
        </DndProvider>
      )) || <Loader type="secondary"/>}
      {isFailed && <p className="error">Ошибка соединения с сервером</p>}

    </>
  )
}

export default Main;
