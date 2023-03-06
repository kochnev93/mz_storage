import React, { useState, useMemo, useEffect } from 'react';

import cx from 'classnames';
import styles from '../style.module.scss';
import { AiOutlineInfoCircle } from 'react-icons/Ai';

import MyButton from '../../components/ui/Buttons/ButtonSend.jsx';
import { MyTable } from '../../components/elements/Table/MyTable.jsx';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsers,
  setActiveAboutUser,
} from '../../features/admin/adminUsersSlice.js';
import { setActiveAddUser } from '../../features/modal/add-userSlice.js';


export const AdminUsers = () => {
  const dispatch = useDispatch();

  const { active, id_user, users, errors, message, reset, isLoading } =
    useSelector((state) => state.modal_about_user);

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
            <td>{`${item?.mz_user_name} ${item?.mz_user_surname}`}</td>
            <td>{item?.mz_user_login}</td>
            <td>{item?.mz_user_role}</td>
            <td>{item?.mz_user_email}</td>
            <td>
              {item?.mz_user_isBlocked ? (
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
                      id_user: item?.id,
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
