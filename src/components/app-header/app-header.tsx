import React from "react";
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import NavItem from "../nav-item/nav-item";
import styles from './app-header.module.css';
import {Link} from "react-router-dom";


export default function AppHeader() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li>
              <NavItem
                text="Конструктор"
                path="/"
                isExact={true}
              >
                <BurgerIcon type="secondary"/>
              </NavItem>
            </li>
            <li className="ml-2">
              <NavItem
                text="Лента заказов"
                path="/feed"
                isExact={true}
              >
                <ListIcon type="secondary"/>
              </NavItem>
            </li>
            <li className={styles.item}>
              <NavItem
                text="Личный кабинет"
                path="/profile"
                isExact={false}
              >
                <ProfileIcon type="secondary"/>
              </NavItem>
            </li>
          </ul>

          <Link className={styles.logo} to="/"><Logo/></Link>

        </nav>
      </header>
    </div>
  )
}
