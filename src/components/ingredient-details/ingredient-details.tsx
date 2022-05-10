import React from "react";

import styles from "./ingredient-details.module.css";
import {IIngredient} from "../../utils/types";
import {useSelector} from "../../utils/hooks";
import {useLocation, useParams} from "react-router-dom";
import {ingredientModalHeader} from "../../utils/constants";
import NotFound404 from "../../pages/not-found-404/not-found-404";
import Loader from "../loader/loader";

export default function IngredientDetails() {
  const params: { ingredientId: string } = useParams();
  const location = useLocation();
  const {ingredientId} = params;

  const ingredientsData = useSelector((store) => store.cart.ingredientsData);
  const itemData: IIngredient = ingredientsData?.find(item => item._id === ingredientId)!;
  if (ingredientsData && !itemData) {
    return <NotFound404 />
  }
  return itemData ? (
    <div className={!location.state ? "mt-30": undefined}>
      <h1 className={styles.title + " white text text_type_main-large"}>{ingredientModalHeader}</h1>
      <div className={styles.wrapper}>
        <img className={styles.image} src={itemData.image_large} alt=""/>
        <p className={styles.name + " white text text_type_main-medium mt-4 mb-8"}>{itemData.name}</p>

        <div className={styles.list}>
          <div className={styles.item}>
            <p className={styles.text + " dark-gray text text_type_main-default"}>Калории,ккал</p>
            <p className={styles.text + " dark-gray text text_type_main-default mt-2"}>{itemData.calories}</p>
          </div>
          <div>
            <p className={styles.text + " dark-gray text text_type_main-default"}>Белки, г</p>
            <p className={styles.text + " dark-gray text text_type_main-default mt-2"}>{itemData.proteins}</p>
          </div>
          <div>
            <p className={styles.text + " dark-gray text text_type_main-default"}>Жиры, г</p>
            <p className={styles.text + " dark-gray text text_type_main-default mt-2"}>{itemData.fat}</p>
          </div>
          <div>
            <p className={styles.text + " dark-gray text text_type_main-default"}>Углеводы, г</p>
            <p className={styles.text + " dark-gray text text_type_main-default mt-2"}>{itemData.carbohydrates}</p>
          </div>
        </div>

      </div>
    </div>
  ) : (
    <Loader type={"primary"} />
  );
}
