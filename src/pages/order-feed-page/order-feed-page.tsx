import React from 'react';
import styles from "./order-feed-page.module.css";
import OrderFeedCommonHistory from "../../components/order-feed-common-history/order-feed-common-history";
import OrderFeedCookingNumbers from "../../components/order-feed-cooking-numbers/order-feed-cooking-numbers";
import {useWSConnect} from "../../utils/hooks";
import {wsAllOrdersUrl} from "../../utils/constants";

const OrderFeedPage = () => {
  const messages = useWSConnect(wsAllOrdersUrl, "all");

  return (
    <div className={styles.container}>
      <h1 className={styles.title + " text text_type_main-large mb-5"}>Лента заказов</h1>
        {messages.length !== 0 && (
          <div className={styles.content}>
            <OrderFeedCommonHistory lastMessage={messages[messages.length - 1]}/>
            <OrderFeedCookingNumbers lastMessage={messages[messages.length - 1]} />
          </div>
        )}


    </div>
  );
};

export default OrderFeedPage;
