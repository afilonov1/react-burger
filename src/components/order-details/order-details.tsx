import React from "react";

import styles from "./order-details.module.css";
import gifPath from  "../../images/done.gif";
import {dataProps} from "../../utils/props";

export default function OrderDetails({data}: any) {
    return (
        <section className={styles.section}>
            <p className={ styles.orderNum + "white text text_type_digits-large mt-4 mb-8"}>034536</p>
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

OrderDetails.propTypes = {
    data: dataProps,
}