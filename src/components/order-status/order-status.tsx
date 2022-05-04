import React, {FC} from 'react';
import styles from "./order-status.module.css";
import classNames from "classnames";

const OrderStatus: FC<{status: string, propClassName?: string}> = ({status, propClassName}) => {
  let text;
  let className;
  switch (status) {
    case "done": {
      text = "Выполнен";
      className = styles.done;
      break;
    }
    case "pending": {
      text = "Готовится";
      break;
    }
    case "created": {
      text = "Отменён";
    }
  }
  return (
    <p className={classNames(className, propClassName, styles.common, "text text_type_main-default")}>Выполнен</p>
  );
};

export default OrderStatus;
