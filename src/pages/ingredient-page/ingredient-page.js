import React, {useCallback, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/actions/cart";
import {baseUrl, ingredientModalHeader, ingredientsEndpoint} from "../../utils/constants";
import Loader from "../../components/loader/loader";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import Main from "../main/main";
import Modal from "../../components/modal/modal";
import styles from "./ingredient-page.module.css";

function IngredientPage() {
  const params = useParams();
  const history = useHistory();
  let render;

  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const {ingredientsData, isFailed} = useSelector(store => ({
    ingredientsData: store.cart.ingredientsData,
    isFailed: store.cart.getIngredients.isError || store.cart.postOrder.isError
  }))
  const onload = useCallback(async function () {
    if (!ingredientsData) {
      await dispatch(getIngredients(baseUrl + ingredientsEndpoint));
    }
    setIsLoaded(true);
  }, [dispatch, ingredientsData])
  useEffect(() => {
    onload();
  }, [dispatch, onload]);
  const itemPage = ingredientsData?.find(item => item._id === params.ingredientId);
  if (history.location?.state?.modal) {
    render = (
      <>
        <Main/>
        <Modal goBack={true} header={ingredientModalHeader}>
          <IngredientDetails itemPage={itemPage}/>
        </Modal>
      </>
    )
  } else {
    render = (
      <div>
        <h1 className={styles.noModalTitle + " white text text_type_main-large mt-30"}>{ingredientModalHeader}</h1>
        <IngredientDetails itemPage={itemPage}/>
      </div>
    )
  }
  if (!isLoaded) {
    return null;
  }
  return (
    <>
      {(ingredientsData && !isFailed && (
        <div>
          {render}
        </div>
      )) || <Loader type="secondary"/>}
      {isFailed && <p className="error">Ошибка соединения с сервером</p>}
    </>
  )
}

export default IngredientPage;
