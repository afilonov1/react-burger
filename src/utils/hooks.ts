import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook
} from "react-redux";
import {AppDispatch, AppThunk, RootState} from "./types";
import {useEffect} from "react";
import {wsCloseConnection, wsConnectionStart} from "../services/actions/wsActions";
import {TSocketType} from "../services/reducers/webSocketReducer";

// export const useSelector = createSelectorHook<RootState>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();

export const useWSConnect = (url: string, type: TSocketType) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(wsConnectionStart({url, type}));
    return () => {
      dispatch(wsCloseConnection());
    }
  }, [dispatch, type, url]);

  return useSelector(store => store.ws.messages);
}

export const useGetIngredients = () => {
  return useSelector(store => store.cart.ingredientsData) || null;
}
