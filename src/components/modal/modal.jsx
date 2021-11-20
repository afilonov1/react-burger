import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals");
//const modalRoot = document.getElementById("react-modals")!;


export default function Modal(props) {
    const { children, header, onClose } = props;

    useEffect(() => {
        const escapeHandler = (e) => {
            if (e.code === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", escapeHandler);
        return () => document.removeEventListener("keydown", escapeHandler);
    }, [onClose]);
    return ReactDOM.createPortal(
        (
            <div className={styles.wrapper}>
                <section className={ styles.modal }>
                    <header className={ styles.header }>
                        <p className={ styles.text + " white text text_type_main-large"}>{header}</p>
                        <div className={styles.close}>
                            <CloseIcon onClick={onClose} type="primary" />
                        </div>
                    </header>
                    {children}
                </section>
                <ModalOverlay onClose={onClose} />
            </div>
        )
        ,
        modalRoot
    );
}

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    header: PropTypes.string,
    onClose: PropTypes.func.isRequired,
}