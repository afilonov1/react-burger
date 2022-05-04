import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook
} from "react-redux";
import {AppDispatch, AppThunk, RootState} from "./types";
import {useEffect} from "react";
import {wsConnectionStart} from "../services/actions/wsActions";

// export const useSelector = createSelectorHook<RootState>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();

export const useWSConnect = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(wsConnectionStart());
  }, [dispatch]);

  return useSelector(store => store.ws.messages);
}

export const useGetIngredients = () => {
  return useSelector(store => store.cart.ingredientsData) || null;
}
