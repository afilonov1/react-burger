import React, {useEffect, useState} from "react";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './ingredients-item.module.css';
import {useDrag} from "react-dnd";
import {Link, useLocation} from "react-router-dom";
import {IIngredient} from "../../utils/types";
import {useSelector} from "../../utils/hooks";


export default function IngredientsItem({itemData}: {itemData: IIngredient}) {
  const location = useLocation();
  const [counter, setCounter] = useState(0);
  const cart = useSelector((store) => store.cart.constructorData);
  useEffect(() => {
    let newCount = cart.filter(item => item._id === itemData._id).length;
    setCounter(newCount);
  }, [cart, itemData]);
  const [{isDrag}, dragRef] = useDrag({
    type: "ingredient",
    item: {
      subtype: itemData.type,
      id: itemData._id,
    },
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });
  const border = isDrag ? "1px solid coral" : "1px solid transparent";

  const ingredientId = itemData['_id'];
  return (
    <Link
      key={ingredientId}
      to={{
        pathname: `/ingredients/${ingredientId}`,
        state: { background: location }
      }}
      style={{border}} ref={dragRef} className={styles.link + " mt-6 mb-2"}
    >
      <img src={itemData.image} alt={itemData.name} width="240" height="120"/>
      <div className={styles.priceWrap + " pt-1 pb-2"}>
        <p className={"pr-1 white text text_type_digits-default"}>{itemData.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
      <h3 className={styles.text + " white text text_type_main-default"}>{itemData.name}</h3>
      {counter !== 0 && <Counter count={counter} size="default"/>}
    </Link>

  );
}
