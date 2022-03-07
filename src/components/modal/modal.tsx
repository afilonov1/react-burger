import React, {ReactNode, useCallback, useEffect} from "react";
import ReactDOM from "react-dom";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import {useDispatch} from "react-redux";
import {closeModal} from "../../services/actions/modal";
import {useHistory} from "react-router-dom";
import {clearCart} from "../../services/actions/cart";

const modalRoot = document.getElementById("react-modals") as HTMLElement;

export default function Modal(props: {
  children: ReactNode;
  header?: string;
  goBack?: boolean;
  isOrderModal?: boolean;
}) {
  const {children, header, goBack, isOrderModal} = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const onClose = useCallback(() => {
    dispatch(closeModal());
    if (goBack) {
      history.goBack();
    }
    if (isOrderModal) {
      dispatch(clearCart());
    }
  }, [dispatch, goBack, history, isOrderModal]);
  useEffect(() => {
    const escapeHandler = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", escapeHandler);
    return () => document.removeEventListener("keydown", escapeHandler);
  }, [dispatch, onClose]);
  return ReactDOM.createPortal(
    (
      <div className={styles.wrapper}>
        <section className={styles.modal}>
          <div className={styles.header}>
            <h2 className={styles.text + " white text text_type_main-large"}>{header}</h2>
            <div className={styles.close}>
              <CloseIcon onClick={onClose} type="primary"/>
            </div>
          </div>
          {children}
        </section>
        <ModalOverlay onClose={onClose}/>
      </div>
    )
    ,
    modalRoot
  );
}
