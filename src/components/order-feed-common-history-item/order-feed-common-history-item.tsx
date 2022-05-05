import React, {FC, useEffect, useMemo, useState} from 'react';
import styles from './order-feed-common-history-item.module.css';
import OrderFeedIcons from "../order-feed-icons/order-feed-icons";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IwsOrder} from "../../utils/types";
import {useSelector} from "../../utils/hooks";
import {createStringOfDate} from "../../utils/utils";
import {Link, useLocation} from "react-router-dom";
import classNames from "classnames";
import OrderStatus from "../order-status/order-status";


const OrderFeedCommonHistoryItem: FC<{ cart: IwsOrder, isPrivateHistory?: boolean }> = ({cart, isPrivateHistory}) => {
  const location = useLocation();
  const [price, setPrice] = useState(0);
  const ingredientsData = useSelector(store => store.cart.ingredientsData);
  const date = useMemo(() => createStringOfDate(cart.createdAt), [cart.createdAt]);
  useEffect(() => {
    let price = 0;
    cart.ingredients.forEach((orderItemId) => {
      const cartItem = ingredientsData?.find(cartItem => cartItem._id === orderItemId);
      price += cartItem ? cartItem.price : 0;
    })
    setPrice(price);
  }, [ingredientsData, cart]);
  return (
    <Link
      to={{
        pathname: `/${isPrivateHistory ? "profile/orders" : "feed"}/${cart._id}`,
        state: {background: location}
      }}
    >
      <div className={classNames(styles.wrapper, isPrivateHistory ? styles.fullSize : null)}>
        <p className={styles.numOrder + " text text_type_digits-default"}>{cart.number}</p>
        <p className={styles.time + " text text_type_main-default text_color_inactive"}>{date}</p>
        <h3 className={styles.title + " text text_type_main-medium"}>{cart.name}</h3>
        {isPrivateHistory && (
          <OrderStatus status={cart.status} propClassName={styles.status}/>
        )}
        <div className={styles.imgWrapper}>
          <OrderFeedIcons iconsId={cart.ingredients}/>
        </div>
        <div className={styles.priceWrapper}>
          <p className={styles.price + " text text_type_digits-default"}>{price}</p>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </Link>
  );
};

export default OrderFeedCommonHistoryItem;
