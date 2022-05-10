import React from "react";
import styles from "./profile-orders.module.css";
import {useWSConnect} from "../../utils/hooks";
import {getWsUserUrl} from "../../utils/utils";
import OrderFeedCommonHistory from "../../components/order-feed-common-history/order-feed-common-history";

function ProfileOrders() {
  const messages = useWSConnect(getWsUserUrl(), "user");

  return (
    <div className={styles.wrapper}>
      {messages.length !== 0 && (
        <OrderFeedCommonHistory lastMessage={messages[messages.length - 1]} isPrivateHistory/>
      )}
    </div>
  );
}


export default ProfileOrders;
