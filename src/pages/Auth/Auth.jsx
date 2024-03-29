import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MyButton from '../../components/ui/Buttons/ButtonSend.jsx';
import MyInput from '../../components/ui/Input/MyInput.jsx';
//import userAuthorization from '../../services/user-authorization.js';

import styles from './Auth.module.scss';
import 'regenerator-runtime/runtime';

// Redux
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/users/userSlice.js';

export const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const frompage = location.state?.from?.pathname || '/';

  const [login, setLogin] = useState('');
  const [validationLogin, setValidationLogin] = useState(true);
  const [password, setPassword] = useState('');
  const [validationPassword, setvalidationPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const resetValidation = () => {
    setValidationLogin(true);
    setvalidationPassword(true);
    setError(false);
    setErrorMessage('');
  };

  const validateForm = () => {
    let countError = 0;
    resetValidation();

    if (login.length === 0) {
      setValidationLogin(false);
      setError(true);
      setErrorMessage('Введите логин и пароль');
      countError++;
    }

    if (password.length === 0) {
      setvalidationPassword(false);
      setError(true);
      setErrorMessage('Введите логин и пароль');
      countError++;
    }

    return countError == 0 ? true : false;
  };

  async function load() {
    let myHeaders = new Headers();
    myHeaders.append('content-type', 'application/json');

    let data = JSON.stringify({
      login: login,
      password: password,
    });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: data,
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_SERVER}/auth`,
      requestOptions
    );

    const status = response.status;
    const statusOK = response.ok;
    const result = await response.json();

    try {
      if (!statusOK) {
        throw new Error(result.errorMessage);
      }

      dispatch(
        setUser({
          id: result.id,
          login: result.login,
          role: result.role,
          img: result.img,
          accessToken: result.accessToken,
        })
      );

      localStorage.setItem(
        'mz_storage_user',
        JSON.stringify({
          id: result.id,
          login: result.login,
          role: result.role,
          img: result.img,
          accessToken: result.accessToken,
        })
      );

      navigate(frompage);
    } catch (error) {
      if (status == 401) {
        //refresh
        console.log('refresh');
      }
      console.log(error);
      setError(true);
      setErrorMessage(result.errorMessage);
    }
  }

  async function signIn(e) {
    e.preventDefault();

    const isValidate = validateForm();

    if (isValidate) {
      load();
    }
  }

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
          <div className={styles.error}>{error ? errorMessage : ''}</div>
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
          Склад, 2021—{new Date().getFullYear()}
        </div>
      </form>
    </div>
  );
};
