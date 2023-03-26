import { useDispatch } from 'react-redux';
import { removeUser, refreshToken } from '../features/users/userSlice';
import authHeader from '../services/auth-header';

let refreshTokenReaquest = null;
const LIFE_TIME_TO_UPDATE_TOKEN = 0.5;

const getUnixTime = () => Math.round(+new Date() / 1000);

const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const tokenBody = token.split('.')[1];
    const tokenBodyDecoded = window.atob(tokenBody);
    const {exp, iat} = JSON.parse(tokenBodyDecoded);

    const tokenLeftTime = exp - getUnixTime();
    const minLifeTimeForUpdate = (exp - iat) * LIFE_TIME_TO_UPDATE_TOKEN;

    return tokenLeftTime < minLifeTimeForUpdate;
  } catch (e) {
    console.error(e);
    return true;
  }
};

const getAccessToken = async () => {
  const dispatch = useDispatch();
  console.info('Сработал refresh');

  try {
    if (refreshTokenReaquest === null) {
      refreshTokenReaquest = `${process.env.REACT_APP_API_SERVER}/refresh`;
    }

    const result = await fetch(refreshTokenReaquest);
    refreshTokenReaquest = null;
    dispatch(refreshToken({ accessToken: result.data }));

    return result.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const useFetch = (url, options) => {
  const dispatch = useDispatch();

  async function fetchNow(url, options, contentType = true) {
    let myHeaders = new Headers();

    if (contentType) {
      myHeaders.append('content-type', 'application/json');
      myHeaders.append('Authorization', `${authHeader()}`);
      options.headers = myHeaders;
    } else {
      myHeaders.append('Authorization', `${authHeader()}`);
      options.headers = myHeaders;
    }

    try {
      let response = await fetch(url, options);

      if (response.status === 401) dispatch(removeUser());

      let result = await response.json();

      console.log(response , result)

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
