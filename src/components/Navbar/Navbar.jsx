import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setHeader } from '../../features/header/headerSlice';
import styles from './Navbar.module.scss';
import Menu from './Menu.jsx';

import { IoIosArrowBack } from 'react-icons/Io';
import { FaRegUserCircle } from 'react-icons/Fa';
import { useAuth } from '../../hooks/use-auth';

function Navbar(props) {
  const classButton = useSelector((state) => state.button_menu.ButtonMenuOpen);
  const dispatch = useDispatch();
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

        <div className={styles.menu_link}>
          <div className={styles.menu_icon}>
            <FaRegUserCircle />
          </div>
          <div>Привет, {user.login}</div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
