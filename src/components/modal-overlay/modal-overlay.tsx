import React from "react";
import PropTypes from "prop-types";

import styles from "./modal-overlay.module.css";

export default function ModalOverlay({onClose}: any) {
    return (
        <div onClick={onClose} className={ styles.overlay }></div>
    );
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func,
}