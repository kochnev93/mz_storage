import React, { useState, useMemo, useEffect } from 'react';
import { MyTable } from '../../components/elements/Table/MyTable.jsx';
import {
  fetchUsers,
  setActiveAboutUser,
} from '../../features/admin/adminUsersSlice.js';
import cx from 'classnames';

import styles from '../style.module.scss';
import { AiOutlineInfoCircle } from 'react-icons/Ai';

// Redux
import { useDispatch, useSelector } from 'react-redux';

export const AdminUsers = () => {
  const dispatch = useDispatch();

  const { active, id_user, users, errors, message, reset, isLoading } =
    useSelector((state) => state.modal_about_user);

  const [titleColumn] = useState(['ID', 'Имя', 'Логин', 'e-mail', 'Действие']);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const bodyContent = useMemo(() => {
    if (users.length) {
      return users.map((item) => {
        return (
          <tr key={item?.id}>
            <td>{item?.id}</td>
            <td>{item?.mz_user_login}</td>
            <td>{item?.mz_user_role}</td>
            <td>{'item?.contract'}</td>
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
      <h2>Пользователи</h2>
      <span className={cx(styles.info_message, { [styles.error]: errors })}>
        {message}
      </span>
      <MyTable titleColumn={titleColumn} content={bodyContent} />
    </section>
  );
};
