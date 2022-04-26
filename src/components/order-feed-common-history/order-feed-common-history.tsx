import React, {FC} from 'react';
import styles from "./order-feed-common-history.module.css";
import OrderFeedCommonHistoryItem from "../order-feed-common-history-item/order-feed-common-history-item";

const OrderFeedCommonHistory: FC<{feedData: any}> = ({feedData}) => {
  return (
    <div className={styles.wrapper + " mr-2"}>
      {feedData.orders.map((item: any) => {
        return <OrderFeedCommonHistoryItem
          key={item._id}
          cart={item}
        />
      })}
    </div>
  );
};

export default OrderFeedCommonHistory;
