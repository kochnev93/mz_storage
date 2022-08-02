import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Navbar.module.scss';
import { menu } from './menu.js';

//Icons
import { MdDashboard } from 'react-icons/Md';

function Menu() {
  const menuItems = menu.map((item, index) => (
    <li className={styles.menu_link} key={item.icon} title={item.desc}>
      <Link to={item.url}>
        <div className={styles.menu_icon}>
          <MdDashboard />
        </div>
        <div>{item.title}</div>
      </Link>
    </li>
  ));

  return <ul>{menuItems}</ul>;
}

export default Menu;
