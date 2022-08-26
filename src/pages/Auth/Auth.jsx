import React, { useState } from 'react';
import MyButton from '../../components/ui/Buttons/ButtonSend.jsx';
import MyInput from '../../components/ui/Input/MyInput.jsx';

import styles from './Auth.module.scss';

export const Auth = () => {
  const [login, setLogin] = useState('');
  const [validationLogin, setValidationLogin] = useState(true);
  const [password, setPassword] = useState('');
  const [validationPassword, setvalidationPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const resetValidation = () => {
    setValidationLogin(true);
    setvalidationPassword(true);
  }

  const validateForm = () => {
    let countError = 0;
    resetValidation();

    if (login.length === 0) {
      setValidationLogin(false);
      countError++;
    }

    if (password.length === 0) {
      setvalidationPassword(false);
      countError++;
    }

    return countError == 0 ? true : false;
  };

  const signIn = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(login, password);

      let myHeaders = new Headers();
      myHeaders.append('content-type', 'application/json');

      let data = JSON.stringify({
        login: login,
        password: password
      });

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
      };

      fetch('http://localhost:3001/api/register', requestOptions)
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            return res.json();
          } else {
            let error = new Error(res.statusText);
            error.response = res;
            throw error;
          }
        })
        .then((result) => {
          console.log(result)
        })
        .catch((err) => {
          console.log(err)
        });
    }
  };

  return (
    <div className={styles.overlay}>
      <form className={styles.form}>
        <div className={styles.header}>Авторизация</div>

        <div className={styles.body}>
          <div className={styles.body_item}>
            <MyInput
              type="text"
              title="Логин"
              changeValue={setLogin}
              validation={validationLogin}
              value={login}
            />
          </div>
          <div className={styles.body_item}>
            <MyInput
              type="password"
              title="Пароль"
              changeValue={setPassword}
              validation={validationPassword}
              value={password}
            />
          </div>
        </div>

        <div className={styles.buttons}>
          <MyButton
            type="send"
            action={signIn}
            title="Войти"
            loadingTitle="Загрузка"
            loading={isLoading}
          />
        </div>

        <div className={styles.footer}>
          ООО «Вита», 2021—{new Date().getFullYear()}
        </div>
      </form>
    </div>
  );
};
