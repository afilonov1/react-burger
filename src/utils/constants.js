export const ingredientsUrl = "https://norma.nomoreparties.space/api/ingredients";
export const orderUrl = "https://norma.nomoreparties.space/api/orders";

export const FILLINGS = "Начинки";
export const SAUCES = "Соусы";
export const BUNS = "Булки";
export const ingredientModalHeader = "Детали ингредиента";
export const heightFromTopPageToRelativeBlock = 243.59375;
export const additionScrollForSaucesAndFillings = 40;
export const fixTabsPixels = 2;



export const compareArrays = (array1, array2) => {
    return array1.length === array2.length && array1.every((value, index) => value === array2[index]);
};
