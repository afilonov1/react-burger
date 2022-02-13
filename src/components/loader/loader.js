import React from "react";
import styles from "./loader.module.css";
import PropTypes from "prop-types";

function Loader({type}) {
  return (
    <div className={styles.loaderWrapper}>
      <div className={type === "primary" ? styles.loaderPrimary : styles.loaderSecondary}/>
    </div>
  );
}

export default Loader;

Loader.propTypes = {
  type: PropTypes.string.isRequired
}
