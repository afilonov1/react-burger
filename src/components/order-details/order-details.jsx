import React, {useEffect, useMemo} from "react";

import styles from "./order-details.module.css";
import gifPath from "../../images/done.gif";
import {useDispatch, useSelector} from "react-redux";
import {postOrder} from "../../services/actions/cart";
import {baseUrl} from "../../utils/constants";
import {compareArrays} from "../../utils/utils";


export default function OrderDetails() {
  const orderNum = useSelector(store => store.cart.order.number);
  const cartIDsFromStore = useSelector(store => store.cart.order.cartIDs);
  const cart = useSelector(store => store.cart.constructorData);


  const dispatch = useDispatch();

  const cartIDs = useMemo(() => cart.map(item => item._id), [cart]);

  const calcOrderNum = (num) => {
    const numLength = num.toString().length;
    if (num.toString().length < 6) {
      return "0".repeat(6 - numLength) + num;
    }
    return num.toString();
  }
  const formattedOrderNum = calcOrderNum(orderNum);
  useEffect(() => {
    if (!orderNum || !compareArrays(cartIDsFromStore, cartIDs)) {
      const fetchData = {
        ingredients: cartIDs,
      };

      dispatch(postOrder(baseUrl + "orders", fetchData, cartIDs));
    }

  }, [cartIDs, cartIDsFromStore, dispatch, orderNum]);

  return (
    <section className={styles.section}>
      <p className={"white text text_type_digits-large mt-4 mb-8"}>{formattedOrderNum}</p>
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
