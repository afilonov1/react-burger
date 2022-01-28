import React, {useContext, useRef, useState} from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-ingredients.module.css";
import IngredientsItem from "../ingredients-item/ingredients-item";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {useSelector} from "react-redux";
const heightFromTopPageToRelativeBlock = 243.59375;
const additionScroll = 40;
const offsetTop = 244;
const fixPixels = 2;

export default function BurgerIngredients() {
    const [current, setCurrent] = useState('Булки');
    const ingredientsData = useSelector(store => store.cart.ingredientsData);
    const isModalVisible = useSelector(store => store.modal.isIngredientModalVisible);
    const sectionRef = useRef();
    const bunRef = useRef();
    const sauceRef = useRef();
    const mainRef = useRef();
    const scrollToRef = (ref) => {

        sectionRef.current.scrollTo(0, ref.current.offsetTop - heightFromTopPageToRelativeBlock - additionScroll)
    }
    //const scrollToRef = (ref) => sectionRef.current.scrollTo(0, 0)

    const handler = e => {
        //console.log(bunRef.current.getBoundingClientRect().bottom - heightFromTopPageToRelativeBlock)
        const distanceFromSauceBlockToRelative = sauceRef.current.getBoundingClientRect().top - heightFromTopPageToRelativeBlock - additionScroll;
        const distanceFromMainBlockToRelative = mainRef.current.getBoundingClientRect().top - heightFromTopPageToRelativeBlock- additionScroll;
        console.log(distanceFromSauceBlockToRelative)
        console.log(distanceFromMainBlockToRelative)
        if (distanceFromMainBlockToRelative <= fixPixels) {
            if (current !== "Начинки") setCurrent("Начинки");
        } else if (distanceFromSauceBlockToRelative <= fixPixels) {
            if (current !== "Соусы") setCurrent("Соусы");
        } else if (current !== "Булки") {
            setCurrent("Булки")
        }
        //scrollToRef(bunRef);
        //console.log(bunRef.current.offsetTop)
        //console.log(sauceRef.current.offsetTop)
    }

    function modal() {
        return (
            <Modal header="Детали ингредиента">
                <IngredientDetails/>
            </Modal>
        );
    }

    return (
        <section className={styles.section} >
            <h1 className="white text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <div className={styles.tab}>
                <Tab value="Булки" active={current === 'Булки'} onClick={ingredientType => {setCurrent(ingredientType); scrollToRef(bunRef)}}>
                    Булки
                </Tab>
                <Tab value="Соусы" active={current === 'Соусы'} onClick={ingredientType => {setCurrent(ingredientType); scrollToRef(sauceRef)}}>
                    Соусы
                </Tab>
                <Tab value="Начинки" active={current === 'Начинки'} onClick={ingredientType => {setCurrent(ingredientType); scrollToRef(mainRef)}}>
                    Начинки
                </Tab>
            </div>
            <section className={styles.menu + " scrollbar"} ref={sectionRef} onScroll={handler}>
                <h2 className="white text text_type_main-medium pt-10" ref={bunRef} >Булки</h2>
                <div className={ styles.grid }>
                    {
                        ingredientsData.map((item) => ((item.type === "bun") ? (<IngredientsItem key={item._id} itemData={item}/>) : null))
                    }
                </div>
                <h2 className="white text text_type_main-medium" ref={sauceRef}>Соусы</h2>
                <div className={ styles.grid }>
                    {
                        ingredientsData.map((item) => ((item.type === "sauce") ? (<IngredientsItem key={item._id} itemData={item}/>) : null))
                    }
                </div>
                <h2 className="white text text_type_main-medium" ref={mainRef}>Начинка</h2>
                <div className={ styles.grid }>
                    {
                        ingredientsData.map((item) => ((item.type === "main") ? (<IngredientsItem key={item._id} itemData={item}/>) : null))
                    }
                </div>

            </section>
            {isModalVisible && modal()}
        </section>
    );
}
