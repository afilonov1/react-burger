import React from "react";
import PropTypes from "prop-types";

import styles from "./nav-item.module.css";

export default function NavItem(props: any) {
    const primaryClass = props.isPrimary ? "white" : "dark-gray";

    return (
        <a href="/#" className={ styles.item + " pl-5 pr-5 pt-4 pb-4 mt-4 mb-4"}>
            {props.children}
            <p className={ primaryClass + " text text_type_main-default pl-2"}>
                {props.text}
            </p>
        </a>
    );
}

NavItem.propTypes = {
    isPrimary: PropTypes.bool,
    text: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
}