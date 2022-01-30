import React from "react";

import styles from "./modal-overlay.module.css";
import {useDispatch} from "react-redux";
import {closeModal} from "../../services/actions/modal";

export default function ModalOverlay() {
    const dispatch = useDispatch();
    return (
        <div onClick={() => dispatch(closeModal())} className={ styles.overlay }>

        </div>
    );
}