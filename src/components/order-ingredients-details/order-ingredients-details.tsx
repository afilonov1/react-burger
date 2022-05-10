import React, {useEffect} from 'react';
import {useLocation, useParams} from "react-router-dom";
import {useDispatch, useGetIngredients, useSelector} from "../../utils/hooks";
import styles from "./order-ingredients-details.module.css";
import classNames from "classnames";
import OrderStatus from "../order-status/order-status";
import {calcOrderNum, createStringOfDate, getWsUserUrl} from "../../utils/utils";
import OrderIngredientsDetailsItem from "../order-ingredients-details-item/order-ingredients-details-item";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {wsAllOrdersUrl} from "../../utils/constants";
import NotFound404 from "../../pages/not-found-404/not-found-404";
import {wsConnectionStart} from "../../services/actions/wsActions";

const OrderIngredientsDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isPrivate = location.pathname.startsWith("/profile/orders/");
  const messages =  useSelector(store => store.ws.messages);
  useEffect(() => {
    if (!location.state) {
      if (isPrivate) {
        dispatch(wsConnectionStart({url: getWsUserUrl(), type: "user"}));
      } else {
        dispatch(wsConnectionStart({url: wsAllOrdersUrl, type: "all"}));
      }
    }
  }, [dispatch, isPrivate, location]);

  const params: {id: string} = useParams();
  const order = messages[0]?.orders?.find(item => item._id === params.id);
  const ingredients = useGetIngredients();
  const uniqueIngredients: {hash: string, quantity: number}[] = [];
  order?.ingredients.forEach(ingredientHash => {
    const indexOfIngredientInUnique = uniqueIngredients.findIndex(item => item.hash === ingredientHash);
    if (indexOfIngredientInUnique !== -1) {
      uniqueIngredients[indexOfIngredientInUnique].quantity += 1;
    } else {
      uniqueIngredients.push({
        hash: ingredientHash,
        quantity: 1
      })
    }
  })
  const price = order?.ingredients.reduce((acc: number, currHash: string) => {
      const cartItem = ingredients?.find(cartItem => cartItem._id === currHash);
      return cartItem ? acc + cartItem.price : acc;
  }, 0)
  if (!ingredients?.length || (!order && !messages.length)) {
    return null;
  }
  if (!order) {
    return <NotFound404 />;
  }
  return (
    <div className={classNames(styles.wrapper, !location.state ? "mt-30" : null)}>
      <p className={classNames(styles.number, "text text_type_digits-default", location.state ? styles.tac : null)}>{calcOrderNum(order.number, true)}</p>
      <p className={classNames(styles.title, "text text_type_main-medium mt-10 mb-3")}>{order.name}</p>
      <OrderStatus status={order.status} propClassName={styles.status}/>
      <p className={classNames(styles.consist, "text text_type_main-medium mt-15 mb-6")}>Состав:</p>
      <div className={classNames(styles.data, "scrollbar pr-6 mb-10")}>
        {uniqueIngredients.map((item, index) => <OrderIngredientsDetailsItem key={index} hash={item.hash} quantity={item.quantity}/>)}
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
