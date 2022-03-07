import React from "react";

import styles from "./modal-overlay.module.css";

export default function ModalOverlay({onClose}: {onClose: () => void}) {
  return (
    <div onClick={onClose} className={styles.overlay}/>
  );
}
