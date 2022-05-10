import React from "react";
import styles from "./loader.module.css";

function Loader({type}: {type: "primary" | "secondary"}) {
  return (
    <div className={styles.loaderWrapper}>
      <div className={type === "primary" ? styles.loaderPrimary : styles.loaderSecondary}/>
    </div>
  );
}

export default Loader;
