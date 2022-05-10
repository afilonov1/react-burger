import React, {FC} from 'react';
import {useGetIngredients} from "../../utils/hooks";
import OrderFeedIconImage from "../order-feed-icon-image/order-feed-icon-image";
import styles from "./order-ingredients-details-item.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const OrderIngredientsDetailsItem: FC<{hash: string, quantity: number}> = ({hash, quantity}) => {
  const ingredients = useGetIngredients();

  const ingredient = ingredients?.find(item => item._id === hash);
  if (!ingredient) {
    return null;
  }
  return (
    <div className={styles.wrapper + " pb-4"}>
      <OrderFeedIconImage src={ingredient.image_mobile} />
      <p className={"text text_type_main-default"}>{ingredient.name}</p>
      <div className={styles.priceWrapper}>
        <p className={styles.price + " text text_type_digits-default"}>{quantity} x {ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

export default OrderIngredientsDetailsItem;
