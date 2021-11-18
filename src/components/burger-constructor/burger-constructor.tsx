import React, {useEffect, useState} from "react";
import styles from "./burger-constructor.module.css";
import PropTypes from 'prop-types';
import {Button, ConstructorElement,
    DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import imagePath from '../../images/Subtract.svg';
import {dataProps} from "../../utils/props";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";

type myType = "top" | "bottom" | undefined;
export default function BurgerConstructor({data, cart}: any) {
    const [orderSum, setOrderSum] = useState(0);

    const [modalVisibility, setModalVisibility] = useState(false);
    const [nest, setNest] = useState(null);
    const openModal = (data: any) => {
        const value: any = (
            <OrderDetails data={data}/>
        )
        setNest(value);
        setModalVisibility(true);
    }
    const closeModal = () => {
        setModalVisibility(false);
    }
    function modal(child: any) {
        return (
            <Modal header="" onClose={closeModal}>
                {child}
            </Modal>
        );
    }
    useEffect(() => {
        const reducer = (previousValue: number, currentValue: number) => {
            return previousValue + data[currentValue].price;
        }
        setOrderSum(cart.reduce(reducer, 0));
    }, [cart])
    return (
        <section className={styles.section}>
            <div className={styles.wrapper}>
                <ul className={styles.list} >
                    {cart.map((item: any, index: any) => {
                        const ingredient = data[item];
                        let type: myType = undefined;
                        let isLocked = false;
                        const lastIndex = cart.length - 1;
                        if (index === 0) {
                            type = "top";
                            isLocked = true;
                        }
                        if (index === lastIndex) {
                            type = "bottom";
                            isLocked = true;
                        }
                        const icon = (
                            <div className={styles.icon}>
                                <DragIcon type="primary" />
                            </div>
                        )
                        return (
                            <li key={Math.random()}className={styles.item}>
                                { (index === 0 || index === lastIndex) || icon}
                                <div className="ml-8">
                                    <ConstructorElement
                                        type={type}
                                        isLocked={isLocked}
                                        text={ingredient.name}
                                        price={ingredient.price}
                                        thumbnail={ingredient.image}
                                    />
                                </div>
                            </li>

                        )
                    })}
                </ul>
                <div className="scroll"></div>
            </div>
            <div className={styles.footer}>

                <p className="white text text_type_digits-medium">{orderSum}</p>

                <img className="mr-10 ml-3" src={imagePath} alt="Цена" />
                <Button type="primary" size="medium" onClick={openModal}>
                    Оформить заказ
                </Button>
            </div>


            {modalVisibility && modal(nest)}
        </section>
    )
}


BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(dataProps),
    cart: PropTypes.arrayOf(PropTypes.number),
};