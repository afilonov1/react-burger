import React from "react";

import styles from "./ingredient-details.module.css";
import {useSelector} from "react-redux";
import {IStore, IIngredient} from "../../utils/types";

export default function IngredientDetails({itemPage = null}: {itemPage: IIngredient | null}) {


  const modalItem = useSelector((store: IStore) => store.modal.currentDetailsItem);
  const itemData: IIngredient | null = itemPage || modalItem;
  return itemData && (
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
  );
}