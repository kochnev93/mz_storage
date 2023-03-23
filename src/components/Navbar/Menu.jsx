import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import cx from 'classnames';

import styles from './Navbar.module.scss';
import { menu } from './menu.js';

//Icons
import { MdOutlineSpaceDashboard } from 'react-icons/Md';
import { MdOutlineAdminPanelSettings } from 'react-icons/Md';
import { AiOutlineInfoCircle } from 'react-icons/Ai';
import { BsClipboardCheck } from 'react-icons/Bs';
import { MdReceipt } from 'react-icons/Md';
import { FaWarehouse } from 'react-icons/Fa';
import { BiTransfer } from 'react-icons/Bi';
import { useAuth } from '../../hooks/use-auth';
import { setHeader } from '../../features/header/headerSlice';
import { useDispatch } from 'react-redux';

function Menu() {
  const user = useAuth();
  const dispatch = useDispatch();

  const getIcon = (icon) => {
    switch (icon) {
      case 'MdOutlineSpaceDashboard':
        return <MdOutlineSpaceDashboard />;
      case 'MdOutlineAdminPanelSettings':
        return <MdOutlineAdminPanelSettings />;
      case 'BsClipboardCheck':
        return <BsClipboardCheck />;
      case 'MdReceipt':
        return <MdReceipt />;
      case 'FaWarehouse':
        return <FaWarehouse />;
      case 'BiTransfer':
        return <BiTransfer />;
      default:
        return <AiOutlineInfoCircle />;
    }
  };


  const menuItems = menu.map((item, index) => {
    let access = item.allowAccess.includes(user.role);

    if(!access) return null;

    return(
      <li
      className={styles.menu_link}
      key={item.icon}
      title={item.desc}
      onClick={() => {dispatch(setHeader({open: false}))}}
    >
      <NavLink
        to={item.url}
        className={({ isActive }) => (isActive ? styles.navlink_active : styles.navlink)}
      >
        <div className={styles.menu_icon}>{getIcon(item.icon)}</div>
        <div className={styles.menu_title}>{item.title}</div>
      </NavLink>
    </li>
    )

    });

  return <ul>{menuItems}</ul>;
}

export default Menu;
