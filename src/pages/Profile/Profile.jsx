import React from "react";

// Styles
import styles from "./Profile.module.scss";

// Components
import { MainWrapper } from "../../components/MainWrapper.jsx";
import { MyTable } from "../../components/elements/Table/MyTable.jsx";
import MyButton from "../../components/ui/Buttons/ButtonSend.jsx";

// Hooks
import useFetch from "../../hooks/useFetch.js";
import { useAuth } from "../../hooks/use-auth.js";

// redux
import { useDispatch } from "react-redux";
import { removeUser } from "../../features/users/userSlice.js";

export const Profile = () => {
  const user = useAuth();
  const dispatch = useDispatch();

  const titleColumn = [
    "Номер",
    "Действие",
    "Откуда",
    "Куда",
    "Количество",
    "Дата",
    "",
  ];

  const logout = () => {
    let answerUser = confirm(`Выйти из приложения?`);

    if (answerUser) {
      localStorage.removeItem("mz_storage_user");
      dispatch(removeUser());
    }
  };

  return (
    <MainWrapper header_title="Профиль" title={user.login}>
      <div className={styles.bio}>
        <div className={styles.bio__img}>
          <img
            
            src="https://avatars.mds.yandex.net/i?id=997b5be0925d51c5e716e5e3f6f83b948f9ee3f0-8497242-images-thumbs&n=13"
            alt="Аватар поьзователя"
          />
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
    </MainWrapper>
  );
};
