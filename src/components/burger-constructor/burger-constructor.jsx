import React, { useMemo, useState } from "react";
import styles from "./burger-constructor.module.css";
import PropTypes from 'prop-types';
import {Button, ConstructorElement,
    DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import imagePath from '../../images/Subtract.svg';
import {ingredientType} from "../../utils/props";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";



export default function BurgerConstructor({cart}) {

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
        const reducer = (previousValue, currentValue) => {
            return previousValue + currentValue.price;
        };
        return cart.reduce(reducer, 0);
    }, [cart]);
    return (
        <section className={styles.section}>
                <div className={styles.cart} >
                    <div className="ml-8">
                        <ConstructorElement
                            type={"top"}
                            isLocked={true}
                            text={cart[0].name + " (верх)"}
                            price={cart[0].price}
                            thumbnail={cart[0].image}
                        />
                    </div>
                    <div className={styles.wrapper + " scrollbar mt-4 mb-4"}>
                    <ul className={styles.list}>
                    {cart.map((ingredient, index) => {
                        const lastIndex = cart.length - 1;
                        if (index === 0 || index === lastIndex) {
                            return null;
                        }
                        let text = ingredient.name;
                        const icon = (
                            <div className={styles.icon}>
                                <DragIcon type="primary" />
                            </div>
                        );
                        return (
                                    <li key={ingredient._id + index + Math.random()} className={styles.item}>
                                        { icon }
                                        <div className="ml-8">
                                            <ConstructorElement
                                                type={undefined}
                                                isLocked={false}
                                                text={text}
                                                price={ingredient.price}
                                                thumbnail={ingredient.image}
                                            />
                                        </div>
                                    </li>
                                )
                            }

                        )
                    }
                    </ul>
                    </div>
                    <div className="ml-8">
                        <ConstructorElement
                            type={"bottom"}
                            isLocked={true}
                            text={cart[cart.length - 1].name + " ( низ)"}
                            price={cart[cart.length - 1].price}
                            thumbnail={cart[cart.length - 1].image}
                        />
                    </div>
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