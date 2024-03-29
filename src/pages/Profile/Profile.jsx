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
import Dropdown from '../../components/ui/Dropdown/MyDropdown-function.jsx';

export const Profile = () => {
  const user = useAuth();
  const dispatch = useDispatch();
  const { fetchNow } = useFetch();

  const { warehouses, category } = useSelector((state) => state.app_state);

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

  function translit(str) {
    console.log('translit-0', str);
    var ru =
      'А-а-Б-б-В-в-Ґ-ґ-Г-г-Д-д-Е-е-Ё-ё-Є-є-Ж-ж-З-з-И-и-І-і-Ї-ї-Й-й-К-к-Л-л-М-м-Н-н-О-о-П-п-Р-р-С-с-Т-т-У-у-Ф-ф-Х-х-Ц-ц-Ч-ч-Ш-ш-Щ-щ-Ъ-ъ-Ы-ы-Ь-ь-Э-э-Ю-ю-Я-я'.split(
        '-'
      );
    var en =
      "A-a-B-b-V-v-G-g-G-g-D-d-E-e-E-e-E-e-ZH-zh-Z-z-I-i-I-i-I-i-J-j-K-k-L-l-M-m-N-n-O-o-P-p-R-r-S-s-T-t-U-u-F-f-H-h-TS-ts-CH-ch-SH-sh-SCH-sch-'-'-Y-y-'-'-E-e-YU-yu-YA-ya".split(
        '-'
      );
    var res = '';
    for (var i = 0, l = str.length; i < l; i++) {
      var s = str.charAt(i),
        n = ru.indexOf(s);
      if (n >= 0) {
        res += en[n];
      } else {
        res += s;
      }
    }

    console.log('translit-1', res);
    return res;
  }

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

    if(result.data){
      dispatch(refreshImgUser({filename: result.filename}))
    }

    return;
  };

  return (
    <MainWrapper header_title="Профиль" title={user.login}>
      <div className={styles.bio}>
        <div className={styles.bio__img}>
          <div className={styles.wrapper_img}>
            {user?.img && (
              <img
                src={`${process.env.REACT_APP_SERVER}/images/${user?.img}`}
                alt="Аватар поьзователя"
              />
            )}
          </div>
          <span>Сменить фото</span>
        </div>
        <div className={styles.bio__info}>
          <ul>
            <li>
              Должность: <span>Инженер ИТ</span>
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
  );
};
