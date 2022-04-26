import styles from "./main.module.css";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import React from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import Loader from "../../components/loader/loader";
import {useSelector} from "../../utils/hooks";


function Main() {
  const {ingredientsData, isFailed} = useSelector((store) => ({
    ingredientsData: store.cart.ingredientsData,
    isFailed: store.cart.getIngredients.isError || store.cart.postOrder.isError
  }))


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
