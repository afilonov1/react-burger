import React, {FC} from 'react';
import styles from "./order-feed-icon-image.module.css";

const OrderFeedIconImage: FC<{src: string, index: number, howMuchAfterLast?: number}> = ({src, index, howMuchAfterLast}) => {
  return (
    <div style={{zIndex: -index}} className={styles.imageWrapper}>
      <div className={styles.imageBackground}>
        <img style={{opacity: howMuchAfterLast ? 0.6 : 1}} className={styles.img} src={src} alt="" />
        {!!howMuchAfterLast && (
          <p className={styles.overflowNumber + " text text_type_main-default"}>+{howMuchAfterLast}</p>
        )}
      </div>
    </div>
  );
};

export default OrderFeedIconImage;
