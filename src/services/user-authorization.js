import 'regenerator-runtime/runtime';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/users/userSlice';

async function userAuthorization(login, password) {
  const dispatch = useDispatch();

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

  // Статус ответа
  const status = response.status;
  const statusOK = response.ok;

  // Тело ответа
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

    return { isAuth: true };

  } catch (error) {
    console.log(error);
    return { isAuth: false, status: status, error: result.errorMessage };
  }
}

export default userAuthorization;
