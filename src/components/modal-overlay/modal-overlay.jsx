import React from "react";

import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

export default function ModalOverlay({onClose}) {
  return (
    <div onClick={onClose} className={styles.overlay}/>
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired
}
