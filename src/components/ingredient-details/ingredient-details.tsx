import React from "react";

import styles from "./ingredient-details.module.css";
import {dataProps} from "../../utils/props";

export default function IngredientDetails({data} : any ){
    console.log(data)
    console.log(styles)
    return (
        <div className={styles.wrapper}>
            <img src={data.image_large} alt=""/>
            <p className="white text text_type_main-medium mt-4 mb-8">{data.name}</p>

                <div className={styles.list}>
                    <div className={styles.item}>
                        <p className={ styles.text + " dark-gray text text_type_main-default"}>Калории,ккал</p>
                        <p className={ styles.text + " dark-gray text text_type_main-default mt-2"}>{data.calories}</p>
                    </div>
                    <div>
                        <p className={ styles.text + " dark-gray text text_type_main-default"}>Белки, г</p>
                        <p className={ styles.text + " dark-gray text text_type_main-default mt-2"}>{data.proteins}</p>
                    </div>
                    <div>
                        <p className={ styles.text + " dark-gray text text_type_main-default"}>Жиры, г</p>
                        <p className={ styles.text + " dark-gray text text_type_main-default mt-2"}>{data.fat}</p>
                    </div>
                    <div>
                        <p className={ styles.text + " dark-gray text text_type_main-default"}>Углеводы, г</p>
                        <p className={ styles.text + " dark-gray text text_type_main-default mt-2"}>{data.carbohydrates}</p>
                    </div>
                </div>

        </div>
    );
}

IngredientDetails.propTypes = {
    data: dataProps,
}