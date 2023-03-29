import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MyButton from '../../components/ui/Buttons/ButtonSend.jsx';
import MyInput from '../../components/ui/Input/MyInput.jsx';
import styles from './Auth.module.scss';
import 'regenerator-runtime/runtime';

// Redux
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/users/userSlice.js';
import useFetch from '../../hooks/useFetch';

export const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchNow } = useFetch();
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

    let data = JSON.stringify({ login, password });

    let requestOptions = {
      method: 'POST',
      body: data,
      credentials: 'include',
      mode: 'cors',
      headers: myHeaders,
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_SERVER}/auth`,
      requestOptions
    );

    const result = await response.json();

    if (result.data) {
      dispatch(
        setUser({
          id: result.data.id,
          name: result.data.name,
          surname: result.data.surname,
          phone: result.data.phone,
          email: result.data.email,
          login: result.data.login,
          position: result.data.position,
          role: result.data.role,
          img: result.data.img,
          accessToken: result.data.accessToken,
        })
      );

      navigate(frompage);
    } else {
      setError(true);
      setErrorMessage(result.error);
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
