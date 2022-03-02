import {checkAccessToken, getNewAccessToken} from "./api";
import {baseUrl, checkAccessEndpoint, refreshTokenEndpoint} from "../utils/constants";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "./reducers/auth";
import {useCallback, useState} from "react";
import {IStore} from "../utils/types";

function useInit() {
  const dispatch = useDispatch();
  const isAuth = useSelector((store: IStore) => store.auth.isAuth);
  const {setAuthFalse, setAuthTrue} = actions;
  const [isInitLoaded, setIsInitLoaded] = useState(false);
  const [canEnter, setCanEnter] = useState(false);
  const init = useCallback(async (type?: string) => {
    let enter: boolean | undefined;
    if (type === "vsNotAuth") {
      enter = await checkAccessToken(baseUrl + checkAccessEndpoint);
      if (!isAuth && enter) {
        await dispatch(setAuthTrue());
      }
      if (!enter) {
        await getNewAccessToken(baseUrl + refreshTokenEndpoint);
        enter = await checkAccessToken(baseUrl + checkAccessEndpoint);
        if (isAuth && !enter) {
          await dispatch(setAuthFalse());
        }
      }
      await setCanEnter(enter);
    }
    setIsInitLoaded(true);
    return enter;
  }, [isAuth, dispatch, setAuthTrue, setAuthFalse]);
  return {init, isInitLoaded, canEnter};
}
export default useInit;
