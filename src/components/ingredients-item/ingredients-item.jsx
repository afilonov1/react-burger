import React, {useEffect, useState} from "react";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './ingredients-item.module.css';
import {ingredientType} from "../../utils/props";
import {useDispatch, useSelector} from "react-redux";
import {openIngredientModal} from "../../services/actions/modal";
import {useDrag} from "react-dnd";


export default function IngredientsItem({itemData}) {
    const [counter, setCounter] = useState(0);
    const dispatch = useDispatch();
    const cart = useSelector(store => store.cart.constructorData);
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


    return (
        <a style={{border}} ref={dragRef} className={ styles.link + " mt-6 mb-2"} href="/#" onClick={() => { dispatch(openIngredientModal(itemData)); }}>
            <img src={itemData.image} alt={itemData.name}/>
            <div className={ styles.priceWrap + " pt-1 pb-2"}>
                <p className={"pr-1 white text text_type_digits-default"}>{itemData.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <h3 className={styles.text + " white text text_type_main-default"}>{itemData.name}</h3>
            {counter !== 0 && <Counter count={counter} size="default" />}
        </a>
    );
}

IngredientsItem.propTypes = {
    itemData: ingredientType.isRequired,
}