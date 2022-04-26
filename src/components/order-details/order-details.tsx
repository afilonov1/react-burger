import React, {useEffect, useMemo} from "react";

import styles from "./order-details.module.css";
import gifPath from "../../images/done.gif";
import {postOrder} from "../../services/actions/cart";
import {baseUrl} from "../../utils/constants";
import {useDispatch, useSelector} from "../../utils/hooks";

const calcOrderNum = (num: number) => {
  const numLength = num.toString().length;
  if (num.toString().length < 6) {
    return "0".repeat(6 - numLength) + num;
  }
  return num.toString();
}

export default function OrderDetails() {
  const orderNum = useSelector((store) => store.cart.order.number);
  const cart = useSelector((store) => store.cart.constructorData);
  const isOrderRequesting = useSelector(store => store.cart.postOrder.isRequest);
  const dispatch = useDispatch();

  const cartIDs = useMemo(() => cart.map(item => item._id), [cart]);


  const formattedOrderNum = calcOrderNum(orderNum);
  useEffect(() => {
      console.log("ABOBA")
      const fetchData = {
        ingredients: cartIDs,
      };
      dispatch(postOrder(baseUrl + "orders", fetchData, cartIDs));
  }, [dispatch, cartIDs]);

  return (
        <section className={styles.section}>
          <p style={{height: 120}} className={"white text text_type_digits-large mt-4 mb-8"}>{
            !isOrderRequesting && formattedOrderNum !== "000000" ? formattedOrderNum : ""
          }</p>
          <p className="white text text_type_main-medium">
          идентификатор заказа
          </p>
          <img className="mt-15 mb-15" src={gifPath} alt="done"/>
          <p className="white text text_type_main-default">
          Ваш заказ начали готовить
          </p>
          <p className="dark-gray text text_type_main-default mt-2 mb-20">
          Дождитесь готовности на орбитальной станции
          </p>
        </section>
  );
}
