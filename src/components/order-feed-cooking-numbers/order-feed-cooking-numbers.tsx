import React, {FC} from 'react';
import styles from "./order-feed-cooking-numbers.module.css";
import classNames from "classnames";
const OrderFeedCookingNumbers: FC<{feedData: any}> = ({feedData}) => {
  const digitClass = classNames("text text_type_digits-large", styles.digit);
  const textClassMarginTop = classNames("text text_type_main-medium", "mt-15", styles.text);
  const textClassMarginBottom = classNames("text text_type_main-medium", "mb-6", styles.text);
  return (
    <div>
      <div className={styles.numsWrapper}>
        <div>
          <p className={textClassMarginBottom}>Готовы:</p>
          <div>

          </div>
        </div>
        <div>
          <p className={textClassMarginBottom}>В работе:</p>
          <div></div>
        </div>
      </div>
      <p className={textClassMarginTop}>Выполнено за все время</p>
      <p className={digitClass}>{feedData.total}</p>
      <p className={textClassMarginTop}>Выполнено за сегодня:</p>
      <p className={digitClass}>{feedData.totalToday}</p>
    </div>
  );
};

export default OrderFeedCookingNumbers;
