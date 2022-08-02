import React from 'react';
import styles from './header.module.scss';

// Redux
import { useDispatch } from 'react-redux';
import { setHeader } from '../../features/header/headerSlice';
import { useSelector } from 'react-redux';

import { MdOutlineMenu } from 'react-icons/Md';

function Header(props) {
  const dispatch = useDispatch();
  const classButton = useSelector((state) => state.button_menu.ButtonMenuOpen);

  return (
    <header
      className={
        classButton ? `${styles.header} ${styles.open}` : styles.header
      }
    >
      <div className={styles.wrapperHeader}>
        <div className={styles.logo}>
          <MdOutlineMenu onClick={() => dispatch(setHeader())} />
          <h3>Склад</h3>
        </div>
      </div>
    </header>
  );
}

export default Header;
