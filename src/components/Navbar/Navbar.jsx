import React from 'react';
import cx from 'classnames';

// Styles
import styles from './Navbar.module.scss';

// Component
import Menu from './Menu.jsx';
import MenuBottom from './Menubottom.jsx';

// Icons
import { IoIosArrowBack } from 'react-icons/Io';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setHeader } from '../../features/header/headerSlice';


function Navbar(props) {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.button_menu.ButtonMenuOpen);

  return (
    <div
      className={cx(styles.navbar_container, {[styles.open]: isOpen})}
    >
      <div className={styles.close_menu_btn}>
        <button onClick={() => dispatch(setHeader({open: false}))}>
          <IoIosArrowBack />
        </button>
      </div>

      <div className={styles.menu_container}>
        <nav className={styles.navbar}>
          <Menu />
        </nav>

        <MenuBottom/>

      </div>
    </div>
  );
}

export default Navbar;
