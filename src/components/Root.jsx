import React from "react";
import { Link } from "react-router-dom";
import styles from "../assets/css/modules/Root.module.css"

function Root() {
    return (
        <nav className={styles.navigation}>
            <Link className={styles.link} to={'/'}>Home</Link>
            <Link className={styles.link} to={'/favorites'}>Favorites</Link>
        </nav>
    )
}

export default Root