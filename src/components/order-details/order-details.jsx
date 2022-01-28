import React, {useEffect} from "react";

import styles from "./order-details.module.css";
import gifPath from  "../../images/done.gif";
import {postData} from "../../utils/postData";
import {useDispatch, useSelector} from "react-redux";
import {setOrder} from "../../services/actions/cart";


const url = "https://norma.nomoreparties.space/api/orders";
const compareArrays = (array1, array2) => {
    return array1.length === array2.length && array1.every((value, index) => value === array2[index]);
};

export default function OrderDetails() {
    const orderNum = useSelector(store => store.cart.order.number);
    const cartIDsFromStore = useSelector(store => store.cart.order.cartIDs);
    const cart = useSelector(store => store.cart.constructorData);

    const dispatch = useDispatch();

    const cartIDs = cart.map(item => item._id);
    const fetchData = {
        ingredients: cartIDs,
    };
    const calcOrderNum = (num) => {
        const numLength = num.toString().length;
        if (num.toString().length < 6) {
            return "0".repeat( 6 - numLength ) + num;
        }
        return num.toString();
    }
    useEffect(() => {
        if (!orderNum || !compareArrays(cartIDsFromStore, cartIDs)) {
            postData(url, fetchData)
                .then(result => {
                    const name = result.name;
                    const number = result.order.number;
                    const price = cart.reduce((acc, next) => next.price + acc, 0);
                    dispatch(setOrder(name, number, price, cartIDs));
                })
        }

    }, []);

    return (
        <section className={styles.section}>
            <p className={"white text text_type_digits-large mt-4 mb-8"}>{ calcOrderNum(orderNum) }</p>
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
