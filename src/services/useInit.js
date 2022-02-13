import {checkAccessToken, getNewAccessToken} from "./api";
import {baseUrl, checkAccessEndpoint, refreshTokenEndpoint} from "../utils/constants";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "./reducers/auth";
import {useCallback, useState} from "react";

function useInit() {
  const dispatch = useDispatch();
  const isAuth = useSelector(store => store.auth.isAuth);
  const {setAuthFalse, setAuthTrue} = actions;
  const [isInitLoaded, setIsInitLoaded] = useState(false);
  const [canEnter, setCanEnter] = useState(false);
  const init = useCallback(async (type) => {
    if (type === "vsNotAuth") {
      let enter = await checkAccessToken(baseUrl + checkAccessEndpoint);
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
      setCanEnter(enter);
    }
    setIsInitLoaded(true);
  }, [isAuth, dispatch, setAuthTrue, setAuthFalse]);
  return {init, isInitLoaded, canEnter};
}
export default useInit;
