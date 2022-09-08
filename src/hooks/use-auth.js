import { useSelector } from 'react-redux';

export function useAuth(){
    const {id, login, role, accessToken} = useSelector(state => state.user);

    return{
        isAuth: !!login,
        id,
        login,
        role,
        accessToken
    };
}