import React, {FC} from 'react';
import styles from './order-feed-common-history-item.module.css';
import OrderFeedIcons from "../order-feed-icons/order-feed-icons";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const OrderFeedCommonHistoryItem: FC<{cart: any}> = ({cart}) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.numOrder + " text text_type_digits-default"}>{cart.number}</p>
      <p className={styles.time + " text text_type_main-default text_color_inactive"}>{cart.createdAt}</p>
      <h3 className={styles.title + " text text_type_main-medium"}>{cart.status}</h3>
      <div className={styles.imgWrapper}>
      <OrderFeedIcons iconsId={cart.ingredients}/>
      </div>
      <p className={styles.price + " text text_type_digits-default"}>price   <CurrencyIcon type="primary" />
      </p>
    </div>
  );
};

export default OrderFeedCommonHistoryItem;
