import React, {useState} from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

import styles from "./burger-ingredients.module.css";
import IngredientsItem from "../ingredients-item/ingredients-item";
import {dataProps} from "../../utils/props";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";


export default function BurgerIngredients({data}: any) {
    const [current, setCurrent] = useState('Булки');
    const [modalVisibility, setModalVisibility] = useState(false);
    const [nest, setNest] = useState(null);
    const openModal = (data: any) => {
        const value: any = (
            <IngredientDetails data={data}/>
        )
        setNest(value);
        setModalVisibility(true);
    }
    const closeModal = () => {
        setModalVisibility(false);
    }
    function modal(child: any) {
        return (
            <Modal header="Детали ингредиента" onClose={closeModal}>
                {child}
            </Modal>
        );
    }
    return (
        <section className={styles.section}>
            <h1 className="white text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <div className={styles.tab}>
                <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <section className={styles.wrapper}>
                <div className={styles.menu}>
                    <h2 className="white text text_type_main-medium pt-10">Булки</h2>
                    <div className={ styles.grid }>
                        {
                            data.map((item: any) => ((item.type === "bun") ? (<IngredientsItem openModal={openModal} key={item._id} data={item}/>) : null))
                        }
                    </div>
                    <h2 className="white text text_type_main-medium">Соусы</h2>
                    <div className={ styles.grid }>
                        {
                            data.map((item: any) => ((item.type === "sauce") ? (<IngredientsItem openModal={openModal} key={item._id} data={item}/>) : null))
                        }
                    </div>
                    <h2 className="white text text_type_main-medium">Начинка</h2>
                    <div className={ styles.grid }>
                        {
                            data.map((item: any) => ((item.type === "main") ? (<IngredientsItem openModal={openModal} key={item._id} data={item}/>) : null))
                        }
                    </div>
                </div>
                <div className="scroll"></div>
            </section>
            {modalVisibility && modal(nest)}
        </section>
    );
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(dataProps)
}