import React from "react";

import styles from "./modal-overlay.module.css";

const ModalOverlay: React.FC<{onClose: () => void}> = ({onClose}) => {
  return (
    <div onClick={onClose} className={styles.overlay}/>
  );
}
export default ModalOverlay;
