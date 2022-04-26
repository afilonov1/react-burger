import React from 'react';
import styles from "./order-feed-page.module.css";
import OrderFeedCommonHistory from "../../components/order-feed-common-history/order-feed-common-history";
import OrderFeedCookingNumbers from "../../components/order-feed-cooking-numbers/order-feed-cooking-numbers";
import {feedData} from "../../utils/templateData";

const OrderFeedPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title + " text text_type_main-large"}>Лента заказов</h1>
      <div className={styles.content}>
        <OrderFeedCommonHistory feedData={feedData}/>
        <OrderFeedCookingNumbers feedData={feedData} />
      </div>
    </div>
  );
};

export default OrderFeedPage;
