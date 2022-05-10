import React from "react";
import {NavLink, Route, Switch, useRouteMatch} from "react-router-dom";
import styles from "./profile-page.module.css";
import EditProfile from "./edit-profile";
import ProfileOrders from "./profile-orders";

function ProfilePage() {
  let match: {path: string} = useRouteMatch();
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

              >
                История заказов
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/logout"
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
      <Switch>
        <Route path={`${match.path}/orders`} component={ProfileOrders}/>
        <Route path={`${match.path}`} component={EditProfile} exact/>
      </Switch>

    </div>
  );
}

export default ProfilePage;
