import { useSelector } from 'react-redux';

export function useAuth() {
  const {
    id,
    login,
    name,
    surname,
    phone,
    email,
    role,
    position,
    img,
    accessToken,
  } = useSelector((state) => state.user);

  return {
    isAuth: !!login,
    id,
    login,
    name,
    surname,
    phone,
    email,
    role,
    position,
    img,
    accessToken,
  };
}
