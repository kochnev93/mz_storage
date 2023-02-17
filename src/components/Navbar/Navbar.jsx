import React from "react";
import { Link } from "react-router-dom";

// Styles
import styles from "./Navbar.module.scss";

// Component
import Menu from "./Menu.jsx";

// Icons
import { IoIosArrowBack } from "react-icons/Io";
import { FaRegUserCircle } from "react-icons/Fa";
import { TiWarningOutline } from "react-icons/Ti";

// Hooks
import { useAuth } from "../../hooks/use-auth";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../../features/app/appSlice.js";
import { setHeader } from "../../features/header/headerSlice";

function Navbar(props) {
  const dispatch = useDispatch();
  const classButton = useSelector((state) => state.button_menu.ButtonMenuOpen);
  const statusApp = useSelector((state) => state.appStatus);
  const user = useAuth();

  return (
    <div
      className={
        classButton
          ? `${styles.navbar_container} ${styles.open}`
          : styles.navbar_container
      }
    >
      <div className={styles.close_menu_btn}>
        <button onClick={() => dispatch(setHeader())}>
          <IoIosArrowBack />
        </button>
      </div>

      <div className={styles.menu_container}>
        <nav className={styles.navbar}>
          <Menu />
        </nav>

        <div>
          {!statusApp.status && (
            <div className={styles.menu_link}>
              <div className={styles.menu_icon}>
                <TiWarningOutline
                  style={{ fill: "#ff8686" }}
                  title={statusApp.error}
                />
              </div>
              <div style={{ color: "#ff8686", fontSize: "10px" }}>
                {statusApp.error}
              </div>
            </div>
          )}

          <Link to={"/profile"}>
            <div className={styles.menu_link}>
              <div className={styles.menu_icon}>
                <FaRegUserCircle />
              </div>
              <div>Привет, {user.login}</div>
            </div>
          </Link>
          
        </div>
      </div>
    </div>
  );
}

export default Navbar;
