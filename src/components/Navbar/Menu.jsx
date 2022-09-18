import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Navbar.module.scss';
import { menu } from './menu.js';

//Icons
import { MdOutlineSpaceDashboard } from 'react-icons/Md';
import { MdOutlineAdminPanelSettings } from 'react-icons/Md';
import { AiOutlineInfoCircle } from 'react-icons/Ai';

function Menu() {
  const getIcon = (icon) => {
    switch(icon){
      case 'MdOutlineSpaceDashboard': return <MdOutlineSpaceDashboard />
      case 'MdOutlineAdminPanelSettings': return <MdOutlineAdminPanelSettings />
      default: return <AiOutlineInfoCircle />
    }
  }

  const menuItems = menu.map((item, index) => (
    <li className={styles.menu_link} key={item.icon} title={item.desc}>
      <Link to={item.url}>
        <div className={styles.menu_icon}>
          {getIcon(item.icon)}
        </div>
        <div className={styles.menu_title}>{item.title}</div>
      </Link>
    </li>
  ));

  return <ul>{menuItems}</ul>;
}

export default Menu;
