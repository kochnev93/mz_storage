import React from 'react';

// Router
import { Outlet, Link } from 'react-router-dom';

// Styles
import styles from '../style.module.scss';

// Component
import { MainWrapper } from '../../components/MainWrapper.jsx';
import ModalAboutUser from '../../components/ui/Modal/Modal-aboutUser/MyModal-aboutUser.jsx';

// Redux
import { useDispatch } from 'react-redux';

export const Admin = () => {
  const dispatch = useDispatch();

  return (
    <>
      <ModalAboutUser />
      <MainWrapper header_title="Администратор" title="Панель управления">
        <nav>
          <ul>
            <li>
              <Link to="users">Пользователи</Link>
            </li>
          </ul>
        </nav>

        <Outlet />
      </MainWrapper>
    </>
  );
};
