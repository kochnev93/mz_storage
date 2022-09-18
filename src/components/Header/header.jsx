import React from 'react';
import styles from './header.module.scss';
import cx from 'classnames';

// Redux
import { useDispatch } from 'react-redux';
import { setHeader } from '../../features/header/headerSlice';
import { removeUser } from '../../features/users/userSlice'; 
import { useSelector } from 'react-redux';

import { MdOutlineMenu } from 'react-icons/Md';
import { FaUser } from 'react-icons/Fa';
import { IoMdExit } from 'react-icons/Io';


function Header({ title }) {
  const dispatch = useDispatch();
  const menuIsOpen = useSelector((state) => state.button_menu.ButtonMenuOpen);

  const logout = () => {
    localStorage.removeItem('mz_storage_user');
    dispatch( removeUser() );
  }

  return (
    <header className={cx(styles.header, { [styles.open]: menuIsOpen })}>
      <div className={styles.wrapperHeader}>
        <div className={styles.logo}>
          <MdOutlineMenu onClick={() => dispatch(setHeader())} />
          <h3>{title ? title : 'Склад'}</h3>
        </div>
        <IoMdExit
          className={styles.logout_icon}
          onClick={logout}
          title = "Выйти"
        />
      </div>
    </header>
  );
}

export default Header;
