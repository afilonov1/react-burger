import React, {FC} from 'react';
import styles from "./order-feed-common-history.module.css";
import OrderFeedCommonHistoryItem from "../order-feed-common-history-item/order-feed-common-history-item";
import {IwsMessage, IwsOrder} from "../../utils/types";
import classNames from "classnames";

const OrderFeedCommonHistory: FC<{lastMessage: IwsMessage}> = ({lastMessage}) => {
  return (
    <div className={classNames(styles.wrapper, "scrollbar pr-2")}>
      {lastMessage.orders.map((item: IwsOrder) => {
        return <OrderFeedCommonHistoryItem
          key={item._id}
          cart={item}
        />
      })}
    </div>
  );
};

export default OrderFeedCommonHistory;
