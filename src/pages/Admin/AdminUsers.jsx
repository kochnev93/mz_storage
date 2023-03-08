import React, { useState, useMemo, useEffect } from 'react';

import cx from 'classnames';
import styles from '../style.module.scss';
import { AiOutlineInfoCircle } from 'react-icons/Ai';

import MyButton from '../../components/ui/Buttons/ButtonSend.jsx';
import { MyTable } from '../../components/elements/Table/MyTable.jsx';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {fetchUsers} from '../../features/admin/adminUsersSlice.js';
import { setActiveAddUser } from '../../features/modal/add-userSlice.js';
import { setActiveAboutUser } from '../../features/modal/about-userSlice';



export const AdminUsers = () => {
  const dispatch = useDispatch();

  const { users, errors, message, isLoading } =
    useSelector((state) => state.usersList);

  const [titleColumn] = useState([
    'ID',
    'Имя',
    'Логин',
    'Роль',
    'e-mail',
    'Статус',
    'Действие',
  ]);

  useEffect(() => {
     dispatch(fetchUsers());
  }, []);

  const bodyContent = useMemo(() => {
    if (users.length) {
      return users.map((item) => {
        return (
          <tr key={item?.id}>
            <td>{item?.id}</td>
            <td>{`${item?.name} ${item?.surname}`}</td>
            <td>{item?.login}</td>
            <td>{item?.role}</td>
            <td>{item?.email}</td>
            <td>
              {item?.isBlocked ? (
                <span title="Заблокирован" style={{ color: 'red' }}>
                  &#10060; Заблокирован
                </span>
              ) : (
                <span title="Активен" style={{ color: 'green' }}>
                  &#9989; Активен
                </span>
              )}
            </td>
            <td>
              <AiOutlineInfoCircle
                title="Информация"
                onClick={(e) => {
                  dispatch(
                    setActiveAboutUser({
                      active: true,
                      user: item
                    })
                  );
                }}
              />
            </td>
          </tr>
        );
      });
    }
  }, [users]);

  return (
    <section>
      <div className={styles.header}>
        <span className={cx(styles.info_message, { [styles.error]: errors })}>
          {message}
        </span>

        <MyButton
          type="send"
          title="Добавить пользователя"
          action={() => {
            dispatch(setActiveAddUser({active: true}));
          }}
        />
      </div>

      <MyTable
        titleColumn={titleColumn}
        content={bodyContent}
        resultCount={users.length}
      />
    </section>
  );
};
