import React, {useState} from "react";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

import styles from './ingredients-item.module.css';
import {ingredientType} from "../../utils/props";


export default function IngredientsItem({data, openModal}: any) {
    const [counter, setCounter] = useState(0);
    const increaseCount = () => {
        if (counter <= 4)
            setCounter((prevCount) => prevCount + 1);
    }
    return (
        <a className={ styles.link + " mt-6 mb-2"} href="/#" onClick={() => { increaseCount(); openModal(data); }}>
            <img src={data.image} alt={data.name}/>
            <div className={ styles.priceWrap + " pt-1 pb-2"}>
                <p className={"pr-1 white text text_type_digits-default"}>{data.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <h3 className={styles.text + " white text text_type_main-default"}>{data.name}</h3>
            {counter !== 0 && <Counter count={counter} size="default" />}
        </a>
    );
}

IngredientsItem.propTypes = {
    data: ingredientType.isRequired,
    openModal: PropTypes.func.isRequired,
}