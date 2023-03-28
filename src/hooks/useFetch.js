import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeUser, refreshToken } from '../features/users/userSlice';
import authHeader from '../services/auth-header';
import { useAuth } from './use-auth';

let refreshTokenReaquest = null;
const LIFE_TIME_TO_UPDATE_TOKEN = 0.5;

const getUnixTime = () => Math.round(+new Date() / 1000);



const useFetch = (url, options) => {
  //console.warn ('REnder useFetch');
  //console.warn('refreshTokenReaquest', refreshTokenReaquest);
  
  //const [refreshTokenReaquest, setRefreshTokenReaquest] = useState(null)
  const dispatch = useDispatch();
  const { accessToken } = useAuth();

  const isTokenExpired = (token) => {
    if (!token) return true;
  
    try {
      const tokenBody = token.split('.')[1];
      const tokenBodyDecoded = window.atob(tokenBody);
      const { exp, iat } = JSON.parse(tokenBodyDecoded);
  
      const tokenLeftTime = exp - getUnixTime();
      const minLifeTimeForUpdate = (exp - iat) * LIFE_TIME_TO_UPDATE_TOKEN;
  
      return tokenLeftTime < minLifeTimeForUpdate;
    } catch (e) {
      console.error(e);
      return true;
    }
  };
  
  const getAccessToken = async () => {
    console.warn('Сработал refresh');
  
    try {
      if (refreshTokenReaquest !== null) return null;

      refreshTokenReaquest = `${process.env.REACT_APP_API_SERVER}/refresh`;
  
      let myHeaders = new Headers();
      myHeaders.append('content-type', 'application/json');
      myHeaders.append('Authorization', `${authHeader()}`);
  
      let requestOptions = {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: myHeaders,
      };
  
      const response = await fetch(refreshTokenReaquest, requestOptions);
      refreshTokenReaquest = null;
      let result = await response.json();
  
      return result.data;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  async function fetchNow(url, options, contentType = true) {
    let myHeaders = new Headers();

    //Проверка состояния токена
    if (isTokenExpired(accessToken)) {
      console.warn('token expired');
      let temp = await getAccessToken();
      console.log('Новый токен ', temp);

      if(!temp) return

      if (temp) {
        dispatch(refreshToken({ accessToken: temp }));
        myHeaders.append('Authorization', `Bearer ${temp}`);
        console.log('Autn temp ', `Bearer ${temp}`);
      }

      console.log(temp);
    } else {
      myHeaders.append('Authorization', `Bearer ${accessToken}`);
      console.log('Autn old ', `Bearer ${accessToken}`);
    }

    if (contentType) {
      myHeaders.append('content-type', 'application/json');
      //myHeaders.append('Authorization', `${authHeader()}`);
      options.headers = myHeaders;
    } else {
      //myHeaders.append('Authorization', `${authHeader()}`);
      options.headers = myHeaders;
    }

    try {
      console.log('Запрос на ', url);

      let response = await fetch(url, options);

      if (response.status === 401) dispatch(removeUser());

      let result = await response.json();

      if (!response.ok) throw new Error(result.errorMessage, result.errors);

      if (result.data) {
        return { ...result, error: null };
      } else {
        return { data: null, ...result };
      }
    } catch (e) {
      return { data: null, error: e.message };
    }
  }

  return { fetchNow };
};

export default useFetch;
