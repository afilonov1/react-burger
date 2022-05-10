import React, {FC} from 'react';
import styles from "./order-feed-cooking-numbers.module.css";
import classNames from "classnames";
import {IwsMessage} from "../../utils/types";
const OrderFeedCookingNumbers: FC<{lastMessage: IwsMessage}> = ({lastMessage}) => {
  const digitClass = classNames("text text_type_digits-large", styles.digit);
  const textClassMarginTop = classNames("text text_type_main-medium", "mt-15", styles.text);
  const textClassMarginBottom = classNames("text text_type_main-medium", "mb-6", styles.text);
  return (
    <div>
      <div className={styles.numsWrapper}>
        <div>
          <p className={textClassMarginBottom}>Готовы:</p>
          <div className={classNames(styles.ordersWrapper, "scrollbar")}>
            {lastMessage.orders.filter(order => order.status === "done").map(order => (
              <p className={classNames("text text_type_digits-default mb-2", styles.orderDone)} key={order._id}>{order.number}</p>
            ))}
          </div>
        </div>
        <div>
          <p className={textClassMarginBottom}>В работе:</p>
          {/*<p>{lastMessage.}</p>*/}
          <div className={classNames(styles.ordersWrapper, "scrollbar")}>
            {lastMessage.orders.filter((order, index) => order.status !== "done").map(order => (
              <p className={classNames("text text_type_digits-default mb-2", styles.orderCooking)} key={order._id}>{order.number}</p>
            ))}
          </div>
        </div>
      </div>
      <p className={textClassMarginTop}>Выполнено за все время</p>
      <p className={digitClass}>{lastMessage.total}</p>
      <p className={textClassMarginTop}>Выполнено за сегодня:</p>
      <p className={digitClass}>{lastMessage.totalToday}</p>
    </div>
  );
};

export default OrderFeedCookingNumbers;
