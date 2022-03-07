import React, {ReactNode} from "react";

import styles from "./nav-item.module.css";
import {NavLink} from "react-router-dom";

export default function NavItem(props: {path: string; isExact: boolean; text: string; children: ReactNode}) {
  return (
    <NavLink
      to={props.path}
      exact={props.isExact}
      className={styles.item + " pl-5 pr-5 pt-4 pb-4 mt-4 mb-4"}
      activeClassName={styles.activeNav}
    >
      <div className={styles.icon}>
        {props.children}
      </div>
      <p className="text text_type_main-default pl-2">
        {props.text}
      </p>
    </NavLink>
  );
}
