
export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: 0
}
export type TCart = {
  ingredientsData: null | IIngredient[];
  constructorData: IHashIngredient[];
  getIngredients: {
    isRequest: boolean;
    isSuccess: boolean;
    isError: boolean;
  };
  postOrder: {
    isRequest: boolean;
    isSuccess: boolean;
    isError: boolean;
  };
  order: {
    name: string;
    number: number;
    cartSum: number;
    cartIDs: string[];
  };
}

export interface IHashIngredient extends IIngredient {
  hash: string;
}

export type TModal = {
  isOrderModalVisible: boolean;
  isIngredientModalVisible: boolean;
  currentDetailsItem: null | IIngredient;
}
export type TAuth = {
  isAuth: boolean;
  user: {
    name: string;
    email: string;
  };
  register: {
    request: boolean;
    success: boolean;
    error: boolean;
  };
  login: {
    request: boolean;
    success: boolean;
    error: boolean;
  };
};


export interface IStore {
  cart: TCart;
  modal: TModal;
  auth: TAuth;
}
