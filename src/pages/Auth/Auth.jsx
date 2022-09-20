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
      'http://localhost:3001/api/auth',
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
          accessToken: result.accessToken,
        })
      );

      localStorage.setItem(
        'mz_storage_user',
        JSON.stringify({
          id: result.id,
          login: result.login,
          role: result.role,
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
      //loginFetch();
      // fetch('http://localhost:3001/api/auth', requestOptions)
      //   .then((res) => {
      //     if (!res.ok) {
      //       let error = new Error(res.statusText);
      //       error.response = res;
      //       res.json().then(json => error.responseJSON = json);
      //       throw error;
      //     }
      //     return res.json();
      //   })
      //   .then((result) => {
      //     console.log(res);
      //     dispatch(setUser({
      //       id: result.id,
      //       login: result.login,
      //       role: result.role,
      //       accessToken: result.accessToken
      //     }));
      //     localStorage.setItem('mz_storage_user', JSON.stringify({
      //       id: result.id,
      //       login: result.login,
      //       role: result.role,
      //       accessToken: result.accessToken
      //     }));
      //     navigate(frompage);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     setError(true);
      //     setErrorMessage('err');
      //     console.log(err.response);
      //     console.log(err.responseJSON)
      //   });
      /////////////////////////////////
      // let myHeaders = new Headers();
      // myHeaders.append('content-type', 'application/json');
      // let data = JSON.stringify({
      //   login: login,
      //   password: password,
      // });
      // let requestOptions = {
      //   method: 'POST',
      //   headers: myHeaders,
      //   body: data,
      // };
      // fetch('http://localhost:3001/api/auth', requestOptions)
      //   .then((res) => {
      //     if (!res.ok) {
      //       //let error = new Error();
      //       //error.response = res;
      //       return res.text().then(data => throw Error(data))
      //     } else{
      //       return res.json()
      //     }
      //   })
      //   .then((result) => {
      //     //console.log(res);
      //     console.log(result);
      //     if(result.errorMessage){
      //       setErrorMessage(result.errorMessage);
      //     }
      //     dispatch(
      //       setUser({
      //         id: result.id,
      //         login: result.login,
      //         role: result.role,
      //         accessToken: result.accessToken,
      //       })
      //     );
      //     localStorage.setItem(
      //       'mz_storage_user',
      //       JSON.stringify({
      //         id: result.id,
      //         login: result.login,
      //         role: result.role,
      //         accessToken: result.accessToken,
      //       })
      //     );
      //     navigate(frompage);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     setError(true);
      //     setErrorMessage('err');
      //   });
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
          ООО «Вита», 2021—{new Date().getFullYear()}
        </div>
      </form>
    </div>
  );
};
