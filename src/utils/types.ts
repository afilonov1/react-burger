import store from "../services/reducers/store";
import {TModalActions} from "../services/actions/modal";
import {TCartActions} from "../services/actions/cart";
import {Action, ActionCreator, ThunkAction} from "@reduxjs/toolkit";
import {rootReducer} from "../services/reducers";

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
export interface IwsOrder {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
}
export interface IwsMessage {
  orders: IwsOrder[];
  success: boolean;
  total: number;
  totalToday: number;
}


export interface IHashIngredient extends IIngredient {
  hash: string;
}


export type RootState = ReturnType<typeof rootReducer>;

type TApplicationActions = TModalActions | TCartActions;

export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, TApplicationActions>
  >;

export type AppDispatch = typeof store.dispatch;
