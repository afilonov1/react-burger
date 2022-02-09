import React, {useRef, useState} from "react";
import {NavLink, Route, Switch} from "react-router-dom";
import styles from "./profile-page.module.css";
import {EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import EditProfile from "./edit-profile";

function ProfilePage() {


  return (
    <div className={styles.container}>
      <aside className={styles.aside}>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/profile"
                className={styles.navItem + " text text_type_main-medium"}
                activeClassName={styles.activeNavItem}
                exact
              >
                Профиль
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile/orders"
                className={styles.navItem + " text text_type_main-medium"}
                activeClassName={styles.activeNavItem}
                exact
              >
                История заказов
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile/orders/:id"
                className={styles.navItem + " text text_type_main-medium"}
                activeClassName={styles.activeNavItem}
                exact
              >
                Выход
              </NavLink>
            </li>
          </ul>
        </nav>
        <p className={styles.text + " text text_type_main-default"}>В этом разделе вы можете
          изменить свои персональные данные</p>
      </aside>

      <Route to="/profile/orders" component={EditProfile} />
    </div>
  );
}

export default ProfilePage;
