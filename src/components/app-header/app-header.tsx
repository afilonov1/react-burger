import React from "react";
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import NavItem from "../nav-item/nav-item";
import styles from './app-header.module.css';


export default function AppHeader() {
    console.log('AppHeader');
    return (
        <div className={styles.wrapper}>
            <header className={ styles.header }>
                <nav className={ styles.nav }>
                    <ul className={ styles.list }>
                        <li>
                            <NavItem text="Конструктор" isPrimary={true}>
                                <BurgerIcon type="primary" />
                            </NavItem>
                        </li>
                        <li className="ml-2">
                            <NavItem text="Лента заказов">
                                <ListIcon type="secondary" />
                            </NavItem>
                        </li>

                    </ul>
                    <NavItem text="Личный кабинет">
                        <ProfileIcon type="secondary" />
                    </NavItem>
                    <div className={ styles.logo }><Logo /></div>

                </nav>
            </header>
        </div>
    )
}
