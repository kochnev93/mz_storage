import React, { useState } from 'react';

// Styles
import styles from './Profile.module.scss';

// Components
import { MainWrapper } from '../../components/MainWrapper.jsx';
import { MyTable } from '../../components/elements/Table/MyTable.jsx';
import MyButton from '../../components/ui/Buttons/ButtonSend.jsx';

// Hooks
import useFetch from '../../hooks/useFetch.js';
import { useAuth } from '../../hooks/use-auth.js';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { removeUser, refreshImgUser } from '../../features/users/userSlice.js';

//import Dropdown from '../../components/ui/Dropdown/MyDropdown-function.jsx';

export const Profile = () => {
  const user = useAuth();
  const dispatch = useDispatch();
  const { fetchNow } = useFetch();

  //const { warehouses, category } = useSelector((state) => state.app_state);

  const titleColumn = [
    'Номер',
    'Действие',
    'Откуда',
    'Куда',
    'Количество',
    'Дата',
    '',
  ];

  const [image, setImage] = useState();
  const [imageURL, setImageURL] = useState();
  const [avatar, setAvatar] = useState(user?.img);

  const logout = () => {
    let answerUser = confirm(`Выйти из приложения?`);

    if (answerUser) {
      localStorage.removeItem('mz_storage_user');
      dispatch(removeUser());
    }
  };

  const sendFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setImage(file);
  };

  const send = async () => {
    const formData = new FormData();
    formData.append('avatar', image);

    let requestOptions = {
      method: 'POST',
      body: formData,
    };

    const result = await fetchNow(
      `${process.env.REACT_APP_API_SERVER}/upload`,
      requestOptions,
      false
    );

    if (result.data) {
      dispatch(refreshImgUser({ filename: result.filename }));
    }

    return;
  };

  return (
    <>
      <MainWrapper header_title="Профиль" title={user.login}>
        <div className={styles.bio}>
          <div className={styles.bio__img}>
            <div className={styles.wrapper_img}>
              {user?.img && (
                <img
                  src={`${process.env.REACT_APP_SERVER}/images/${user?.img}`}
                  alt="Аватар пользователя"
                />
              )}
            </div>
            <span>Сменить фото</span>
          </div>
          <div className={styles.bio__info}>
            <ul>
              <li>
                Должность: <span>{user.position}</span>
              </li>
              <li>
                Логин: <span>{user?.login}</span>
              </li>
              <li>
                Роль: <span>{user?.role}</span>
              </li>
              <li>
                ID пользователя: <span>{user?.id}</span>
              </li>
            </ul>
          </div>

          <div className={styles.bio__actions}>
            <MyButton type="send" action={logout} title="Выйти" />
          </div>
        </div>
        <h2>История</h2>
        <MyTable titleColumn={titleColumn} />

        {/* <input type="file" onChange={sendFile} accept="image/*,.png,.jpg,.jpeg" />
      <button onClick={send}>Отправить</button>

      <br />
      <br />
      <br />
      <br />

      <Dropdown id={'1236'} validation={true} options={warehouses} />

      <br />
      <br />
      <br />
      <br />

      <Dropdown id={'12367'} validation={true} options={category} /> */}
      </MainWrapper>
    </>
  );
};
