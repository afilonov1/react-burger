import React, {FC, useEffect, useState} from 'react';
import {useSelector} from "../../utils/hooks";
import {IIngredient} from "../../utils/types";
import OrderFeedIconImage from "../order-feed-icon-image/order-feed-icon-image";

import styles from "./order-feed-icons.module.css";

const OrderFeedIcons: FC<{iconsId: string[]}> = ({iconsId}) => {
  const ingredients = useSelector(store => store.cart.ingredientsData);
  const [iconIngredients, setIconsIngredients] = useState<IIngredient[]>([]);
  useEffect(() => {
    if (!iconIngredients.length) {
      iconsId.forEach(id => {
        const ingredient = ingredients?.find(item => item._id === id);
        if (ingredient) {
          setIconsIngredients(prevState => [...prevState, ingredient]);
        }
      })
    }
  }, [ingredients, iconsId, iconIngredients]);
  return (
    <div className={styles.iconsWrapper}>
      {iconIngredients.map((item, index) => {
        if (index > 5) {
          return null;
        }
        if (index === 5) {
          return <OrderFeedIconImage
            key={item._id + index}
            index={index}
            src={item.image_mobile}
            howMuchAfterLast={iconIngredients.length - 6}
          />
        }
        return <OrderFeedIconImage key={item._id + index} index={index} src={item.image_mobile} />
      })}
    </div>
  );
};

export default OrderFeedIcons;
