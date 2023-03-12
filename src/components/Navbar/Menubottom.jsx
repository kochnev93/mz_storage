import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../../hooks/use-auth';

import styles from './Navbar.module.scss';

//Icons
import { FaRegUserCircle } from 'react-icons/Fa';
import { TiWarningOutline } from 'react-icons/Ti';

function MenuBottom() {
  const statusApp = useSelector((state) => state.app_state);
  const user = useAuth();

  return (
    <ul>
      {!statusApp.status && (
        <li className={styles.menu_link} key={'app_status'}>
          <a>
            <div className={styles.menu_icon}>
              <TiWarningOutline
                style={{ fill: 'var(--error-color)' }}
                title={statusApp.error}
              />
            </div>
            <div className={styles.menu_title} style={{ color: 'var(--error-color)', fontSize: '10px' }}>
              {statusApp.error}
            </div>
          </a>
        </li>
      )}

      <li className={styles.menu_link} key={'profile'} title={'Профиль'}>
        <NavLink
          to={'/profile'}
          className={({ isActive }) =>
            isActive ? `${styles.navlink_active}` : `${styles.navlink}`
          }
        >
          <div className={styles.menu_icon}>
            <FaRegUserCircle />
          </div>
          <div className={styles.menu_title}>Привет, {user.login}</div>
        </NavLink>
      </li>
    </ul>
  );
}

export default MenuBottom;
