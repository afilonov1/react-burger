import React, { useMemo, useState } from "react";
import styles from "./burger-constructor.module.css";
import PropTypes from 'prop-types';
import {Button, ConstructorElement,
    DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import imagePath from '../../images/Subtract.svg';
import {ingredientType} from "../../utils/props";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";



export default function BurgerConstructor({cart}: any) {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const openModal = () => {
        setIsModalVisible(true);
    }
    const closeModal = () => {
        setIsModalVisible(false);
    }
    function modal() {
        return (
            <Modal onClose={closeModal}>
                <OrderDetails />
            </Modal>
        );
    }

    let orderSum = useMemo(() => {
        const reducer = (previousValue: number, currentValue: any) => {
            return previousValue + currentValue.price;
        };
        return cart.reduce(reducer, 0);
    }, [cart]);
    return (
        <section className={styles.section}>
            <div className={styles.wrapper}>
                <ul className={styles.list + " scrollbar"} >
                    {cart.map((ingredient: any, index: any) => {
                        let type: any = undefined;
                        let isLocked = false;
                        const lastIndex = cart.length - 1;
                        let text = ingredient.name;
                        if (index === 0) {
                            type = "top";
                            isLocked = true;
                            text += " (верх)";
                        }
                        if (index === lastIndex) {
                            type = "bottom";
                            isLocked = true;
                            text += " (низ)";
                        }
                        const icon = (
                            <div className={styles.icon}>
                                <DragIcon type="primary" />
                            </div>
                        )
                        return (
                            <li key={ingredient._id + index + Math.random()} className={styles.item}>
                                { (index === 0 || index === lastIndex) || icon}
                                <div className="ml-8">
                                    <ConstructorElement
                                        type={type}
                                        isLocked={isLocked}
                                        text={text}
                                        price={ingredient.price}
                                        thumbnail={ingredient.image}
                                    />
                                </div>
                            </li>

                        )
                    })}
                </ul>
            </div>
            <div className={styles.footer}>

                <p className="white text text_type_digits-medium">{orderSum}</p>

                <img className="mr-10 ml-3" src={imagePath} alt="Цена" />
                <Button type="primary" size="medium" onClick={openModal}>
                    Оформить заказ
                </Button>
            </div>

            {isModalVisible && modal()}
        </section>
    )
}


BurgerConstructor.propTypes = {
    cart: PropTypes.arrayOf(ingredientType).isRequired,
};