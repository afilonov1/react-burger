import React, {RefObject, useRef, useState} from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-ingredients.module.css";
import IngredientsItem from "../ingredients-item/ingredients-item";
import {useSelector} from "react-redux";
import {
  additionScrollForSaucesAndFillings,
  BUNS,
  FILLINGS, fixTabsPixels,
  heightFromTopPageToRelativeBlock,
  SAUCES
} from "../../utils/constants";
import {IStore} from "../../utils/types";

export default function BurgerIngredients() {
  const [currentTab, setCurrentTab] = useState(BUNS);
  const ingredientsData = useSelector((store: IStore) => store.cart.ingredientsData)!;

  const sectionRef = useRef<HTMLElement>(null);
  const bunRef = useRef<HTMLHeadingElement>(null);
  const sauceRef = useRef<HTMLHeadingElement>(null);
  const mainRef = useRef<HTMLHeadingElement>(null);

  const scrollToRef = (ref: RefObject<HTMLHeadingElement>) => {
    if (sectionRef?.current && ref?.current) {
      sectionRef.current.scrollTo(0, ref.current.offsetTop - heightFromTopPageToRelativeBlock - additionScrollForSaucesAndFillings);
    }
  }

  const handler = (e: React.SyntheticEvent) => {
    if (sauceRef?.current && mainRef?.current) {
      const distanceFromSauceBlockToRelative = sauceRef.current.getBoundingClientRect().top - heightFromTopPageToRelativeBlock - additionScrollForSaucesAndFillings;
      const distanceFromMainBlockToRelative = mainRef.current.getBoundingClientRect().top - heightFromTopPageToRelativeBlock - additionScrollForSaucesAndFillings;
      if (distanceFromMainBlockToRelative <= fixTabsPixels) {
        if (currentTab !== FILLINGS) setCurrentTab(FILLINGS);
      } else if (distanceFromSauceBlockToRelative <= fixTabsPixels) {
        if (currentTab !== SAUCES) setCurrentTab(SAUCES);
      } else if (currentTab !== BUNS) {
        setCurrentTab(BUNS)
      }
    }

  }


  return (
    <section className={styles.section}>
      <h1 className="white text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={styles.tab}>
        <Tab value={BUNS} active={currentTab === BUNS} onClick={ingredientType => {
          setCurrentTab(ingredientType);
          scrollToRef(bunRef)
        }}>
          Булки
        </Tab>
        <Tab value={SAUCES} active={currentTab === SAUCES} onClick={ingredientType => {
          setCurrentTab(ingredientType);
          scrollToRef(sauceRef)
        }}>
          Соусы
        </Tab>
        <Tab value={FILLINGS} active={currentTab === FILLINGS} onClick={ingredientType => {
          setCurrentTab(ingredientType);
          scrollToRef(mainRef)
        }}>
          Начинки
        </Tab>
      </div>
      <section className={styles.menu + " scrollbar"} ref={sectionRef} onScroll={handler}>
        <h2 className="white text text_type_main-medium pt-10" ref={bunRef}>{BUNS}</h2>
        <div className={styles.grid}>
          {
            ingredientsData.map((item) => ((item.type === "bun") ? (
              <IngredientsItem key={item._id} itemData={item}/>) : null))
          }
        </div>
        <h2 className="white text text_type_main-medium" ref={sauceRef}>{SAUCES}</h2>
        <div className={styles.grid}>
          {
            ingredientsData.map((item) => ((item.type === "sauce") ? (
              <IngredientsItem key={item._id} itemData={item}/>) : null))
          }
        </div>
        <h2 className="white text text_type_main-medium" ref={mainRef}>{FILLINGS}</h2>
        <div className={styles.grid}>
          {
            ingredientsData.map((item) => ((item.type === "main") ? (
              <IngredientsItem key={item._id} itemData={item}/>) : null))
          }
        </div>

      </section>
    </section>
  );
}
