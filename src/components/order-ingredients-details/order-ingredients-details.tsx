import React from 'react';
import {useParams} from "react-router-dom";
import {useGetIngredients, useWSConnect} from "../../utils/hooks";
import styles from "./order-ingredients-details.module.css";
import classNames from "classnames";
import OrderStatus from "../order-status/order-status";
import {calcOrderNum, createStringOfDate} from "../../utils/utils";
import OrderIngredientsDetailsItem from "../order-ingredients-details-item/order-ingredients-details-item";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const OrderIngredientsDetails = () => {
  const messages = useWSConnect();
  const params: {id: string} = useParams();
  const order = messages[0]?.orders?.find(item => item._id === params.id);
  const ingredients = useGetIngredients();
  const price = order?.ingredients.reduce((acc: number, currHash: string) => {
      const cartItem = ingredients?.find(cartItem => cartItem._id === currHash);
      return cartItem ? acc + cartItem.price : acc;
  }, 0)
  if (!order) {
    return null;
  }
  return (
    <div className={classNames(styles.wrapper, "mt-30")}>
      <p className={classNames(styles.number, "text text_type_digits-default")}>{calcOrderNum(order.number, true)}</p>
      <p className={classNames(styles.title, "text text_type_main-medium mt-10 mb-3")}>{order.name}</p>
      <OrderStatus status={order.status} propClassName={styles.status}/>
      <p className={classNames(styles.consist, "text text_type_digits-default mt-15 mb-6")}>Состав:</p>
      <div className={classNames(styles.data, "scrollbar pr-6 mb-10")}>
        {order.ingredients.map((item, index) => <OrderIngredientsDetailsItem key={index} hash={item} />)}
      </div>
      <p className={styles.time + " text text_type_main-default text_color_inactive"}>{createStringOfDate(order.createdAt)}</p>
      <div className={styles.priceWrapper}>
        <p className={styles.price + " text text_type_digits-default"}>{price}</p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

export default OrderIngredientsDetails;
