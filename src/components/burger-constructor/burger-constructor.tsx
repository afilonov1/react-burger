import React, {useEffect, useMemo, useState} from "react";
import styles from "./burger-constructor.module.css";
import {Button, ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";

import imagePath from '../../images/Subtract.svg';
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import {useDispatch, useSelector} from "react-redux";
import {openOrderModal} from "../../services/actions/modal";
import {useDrop} from "react-dnd";
import {addContainerItem, setContainerBun} from "../../services/actions/cart";
import ConstructorItem from "../constructor-item/constructor-item";
import {Redirect} from "react-router-dom";
import useInit from "../../services/useInit";
import {IHashIngredient, IStore} from "../../utils/types";


export default function BurgerConstructor() {
  const cart = useSelector((store: IStore) => store.cart.constructorData);
  const isBun = cart[0]?.type === "bun";
  const {init, isInitLoaded, canEnter} = useInit();


  const isModalVisible = useSelector((store: IStore) => store.modal.isOrderModalVisible);
  const [isOrderClicked, setOrderClicked] = useState(false);
  const dispatch = useDispatch();
  const [{isHover}, dropRef] = useDrop({
    accept: "ingredient",
    drop(item: {subtype: string, id: number}) {
      const {subtype, id} = item;
      if (subtype === "main" || subtype === "sauce") {
        dispatch(addContainerItem(id));
      } else if (subtype === "bun") {
        dispatch(setContainerBun(id))
      }
    },
    collect: monitor => ({
      isHover: monitor.isOver()
    })
  })

  async function setOrder() {
    const canEnter = await init("vsNotAuth");
    // console.log("setOrder, canEnter = ", canEnter)
    setOrderClicked(true);
    const isFormValid = cart.length >= 3 && cart[0].type === "bun";
    if (canEnter && isFormValid) {
      dispatch(openOrderModal());
    }
  }

  const orderSum = useMemo(() => {
    const reducer = (previousValue: number, currentValue: IHashIngredient) => {
      return previousValue + currentValue.price;
    };
    return cart.reduce(reducer, 0);
  }, [cart]);

  const borderColor = isHover ? "lightskyblue" : "transparent";
  console.log(isInitLoaded, canEnter, isOrderClicked)
  if (isInitLoaded && !canEnter && isOrderClicked) {
    return (
      <Redirect to="/login"/>
    );
  }
  return (
    <section className={styles.section}>
      <div className={styles.cart} style={{borderColor}} ref={dropRef}>
        {cart.length === 0 && (
          <span className={styles.placeholderWrapper}>
                        <p className={styles.placeholder}>Для создания заказа перетащите булку и ингредиенты</p>
                    </span>
        )}
        {isBun && (
          <div className="ml-8">
            <ConstructorElement
              type={"top"}
              isLocked={true}
              text={cart[0].name + " (верх)"}
              price={cart[0].price}
              thumbnail={cart[0].image}
            />
          </div>
        )}
        <div className={styles.wrapper + " scrollbar mt-4 mb-4"}>
          <ul className={styles.list}>
            {cart.map((ingredient: IHashIngredient, index: number) => {
              const lastIndex = cart.length - 1;
              if ((index === 0 || index === lastIndex) && cart[index].type === "bun") {
                return null;
              }
              return (
                <ConstructorItem key={ingredient.hash} index={index}/>
              )
            })}
          </ul>
        </div>
        {cart[cart.length - 1]?.type === "bun" && (
          <div className="ml-8">
            <ConstructorElement
              type={"bottom"}
              isLocked={true}
              text={cart[cart.length - 1].name + " (низ)"}
              price={cart[cart.length - 1].price}
              thumbnail={cart[cart.length - 1].image}
            />
          </div>
        )}
      </div>
      <div className={styles.footer}>

        <p className="white text text_type_digits-medium">{orderSum}</p>

        <img className="mr-10 ml-3" src={imagePath} alt="Цена"/>
        <Button type="primary" size="medium" onClick={setOrder}>
          Оформить заказ
        </Button>
      </div>

      {isModalVisible && (
        <Modal isOrderModal>
          <OrderDetails/>
        </Modal>
      )}
    </section>
  )
}
