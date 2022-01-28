import React from "react";
import PropTypes from "prop-types";

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

// ModalOverlay.propTypes = {
//     onClose: PropTypes.func.isRequired,
// }